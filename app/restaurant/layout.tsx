import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { RestaurantCartProvider } from "@/context/RestaurantCartContext";
import RNavbar from "@/components/restaurant/RNavbar";
import RFooter from "@/components/restaurant/RFooter";
import CartButton from "@/components/restaurant/CartButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Dar Al Yasmine — Authentic Moroccan Restaurant",
    template: "%s | Dar Al Yasmine",
  },
  description:
    "Experience authentic Moroccan cuisine at Dar Al Yasmine in Casablanca. Reserve a table or order online via WhatsApp.",
  openGraph: {
    title:       "Dar Al Yasmine — Authentic Moroccan Restaurant",
    description: "Experience authentic Moroccan cuisine in Casablanca. Reserve or order online.",
    images: [
      {
        url:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        width:  1200,
        height: 630,
        alt:    "Dar Al Yasmine — Fine Moroccan Dining",
      },
    ],
  },
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} bg-r-charcoal text-r-cream min-h-screen flex flex-col`}
      style={{ fontFamily: "var(--font-dm-sans), ui-sans-serif, sans-serif" }}
    >
      <RestaurantCartProvider>
        <RNavbar />
        <main className="flex-1">{children}</main>
        <RFooter />
        <CartButton />
      </RestaurantCartProvider>
    </div>
  );
}
