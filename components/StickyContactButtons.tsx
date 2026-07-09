import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export function StickyContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <Link
        href={`tel:${CONTACT_INFO.phone}`}
        className="flex items-center gap-3 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
        aria-label={`Call ${CONTACT_INFO.phone}`}
      >
        <Phone size={18} />
      </Link>

      <Link
        href={CONTACT_INFO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(16,185,129,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} />
      </Link>
    </div>
  );
}
