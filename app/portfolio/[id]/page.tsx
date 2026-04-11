import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import ProjectDetailClient from "./ProjectDetailClient";

/* Pre-render every project page at build time */
export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ id: p.id }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   PER-PAGE SEO METADATA
   • Dynamic title & description
   • Page-specific keywords from the enhanced data schema
   • OpenGraph image pulled from the project's hero image
   • Twitter large card
   • Canonical URL
───────────────────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === params.id);
  if (!project) return { title: "Project Not Found" };

  const title       = `${project.title} — ${project.category}`;
  const description = project.description.slice(0, 160);
  const url         = `https://youli.dev/portfolio/${project.id}`;

  return {
    title,
    description,
    keywords: project.seoKeywords,
    authors:  [{ name: "Mohamed Youli", url: "https://youli.dev" }],
    alternates: { canonical: url },
    openGraph: {
      type:        "website",
      url,
      title,
      description,
      siteName:    "Mohamed Youli — Web Solutions",
      images: [
        {
          url:    project.heroImg,
          width:  1600,
          height: 900,
          alt:    `${project.title} — ${project.category} web project by Mohamed Youli`,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [project.heroImg],
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE  (server component — injects JSON-LD + renders client view)
───────────────────────────────────────────────────────────────────────────── */
export default function ProjectPage({ params }: { params: { id: string } }) {
  const project      = PORTFOLIO_PROJECTS.find((p) => p.id === params.id);
  if (!project) notFound();

  /* Related projects resolved server-side */
  const related = project.relatedIds
    .map((rid) => PORTFOLIO_PROJECTS.find((p) => p.id === rid))
    .filter(Boolean) as typeof PORTFOLIO_PROJECTS;

  /* Per-project JSON-LD  —  CreativeWork / SoftwareApplication schema */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "CreativeWork",
    "@id":      `https://youli.dev/portfolio/${project.id}`,
    "name":         project.title,
    "description":  project.description,
    "url":          `https://youli.dev/portfolio/${project.id}`,
    "image":        project.heroImg,
    "datePublished": `${project.year}-01-01`,
    "creator": {
      "@type": "Person",
      "@id":   "https://youli.dev/#person",
      "name":  "Mohamed Youli",
    },
    "client": {
      "@type": "Organization",
      "name":  project.client,
    },
    "keywords":   project.seoKeywords.join(", "),
    "about": {
      "@type": "Service",
      "name":  project.category,
    },
    "result": project.results.map((r) => ({
      "@type": "QuantitativeValue",
      "name":  r.label,
      "value": `${r.value}${r.suffix}`,
    })),
    ...(project.testimonial && {
      "review": {
        "@type":        "Review",
        "reviewBody":   project.testimonial.quote,
        "author": {
          "@type": "Person",
          "name":  project.testimonial.author,
          "jobTitle": project.testimonial.role,
        },
        "reviewRating": {
          "@type":       "Rating",
          "ratingValue": "5",
          "bestRating":  "5",
        },
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} related={related} />
    </>
  );
}
