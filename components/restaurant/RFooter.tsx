import Link from "next/link";

export default function RFooter() {
  return (
    <footer className="border-t border-white/5 bg-r-charcoal mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row
                      items-center justify-between gap-4 text-center md:text-start">

        {/* Brand */}
        <div>
          <p className="font-playfair text-r-gold text-base font-semibold">
            Dar Al Yasmine · دار الياسمين
          </p>
          <p className="text-r-cream/40 text-xs mt-1">
            Boulevard Mohammed V, Casablanca, Morocco
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-r-cream/40">
          <Link href="/restaurant/menu"    className="hover:text-r-gold transition-colors">Menu</Link>
          <Link href="/restaurant/reserve" className="hover:text-r-gold transition-colors">Reserve</Link>
          <Link href="/restaurant/contact" className="hover:text-r-gold transition-colors">Contact</Link>
          <a
            href="https://wa.me/212669586001"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-r-gold transition-colors"
          >
            WhatsApp
          </a>
        </nav>

        {/* Credit */}
        <p className="text-r-cream/25 text-xs">
          Built by{" "}
          <a
            href="/"
            className="text-r-gold/60 hover:text-r-gold transition-colors"
          >
            MDigitalDev
          </a>
        </p>
      </div>
    </footer>
  );
}
