
"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Top-left logo */}
  <Link href="/" aria-label="Home" className="inline-flex items-center mb-8">
          <Image
            src="/logo_inverted.svg"
            alt="Becoming You"
            width={180}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </Link>
   

        <div className="grid gap-8 md:grid-cols-3 py-4 border-t border-background/20">
      
          <div>
                    <a href="http://www.emilhewitt.com" target="_blank" rel="noreferrer" aria-label="my site" className="inline-flex items-center mb-8">
          <Image
            src="/emilhewitt.webp"
            alt="my site"
            width={180}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </a>
            <p className="mt-2 text-secondary">Fullstack Developer · UI/UX Specialist</p>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-editorial text-lg">Contact</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Brooklyn, NY</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:ehewi@protonmail.com" className="underline-offset-2 hover:underline">
                  ehewi@protonmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+16176860067" className="underline-offset-2 hover:underline">
                  (617) 686-0067
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-editorial text-lg">Links</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href="https://emilhewitt.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  emilhewitt.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://linkedin.com/in/emilhewitt"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-background/20 pt-6 text-xs/6 opacity-80">
          Not for public use: includes proprietary fonts & logos of Becoming You Media, LLC.
        </div>
      </div>
    </footer>
  );
}
