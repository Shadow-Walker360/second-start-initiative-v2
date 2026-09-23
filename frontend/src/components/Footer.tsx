import Link from "next/link";
import { NAV_LINKS, ORG } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer
      className="bg-ink text-paper/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-paper">{ORG.name}</p>
            <p className="mt-2 text-sm">— {ORG.location}</p>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-medium text-paper">Contact</p>
            <a
              href={ORG.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-marigold"
            >
              WhatsApp: {ORG.whatsapp}
            </a>
            <a href={`mailto:${ORG.email}`} className="mt-1 block hover:text-marigold">
              {ORG.email}
            </a>
            <div className="mt-3 flex gap-4">
              <a href={ORG.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-marigold">
                Instagram
              </a>
              <a href={ORG.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-marigold">
                X (Twitter)
              </a>
              <a href={ORG.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-marigold">
                Facebook
              </a>
            </div>
            <p className="mt-1 text-paper/50">{ORG.handle}</p>
          </div>

          <nav className="text-sm">
            <p className="mb-3 font-medium text-paper">Explore</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-marigold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-paper/10 pt-6 text-xs text-paper/50">
          © {new Date().getFullYear()} {ORG.name} • Built with purpose
        </p>
      </div>
    </footer>
  );
}
