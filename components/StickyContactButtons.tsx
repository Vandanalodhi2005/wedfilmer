import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export function StickyContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 sm:bottom-6 sm:right-6 max-w-[calc(100vw-2rem)]">
      <Link
        href={`tel:${CONTACT_INFO.phone}`}
        className="flex items-center justify-center rounded-full bg-black p-3 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
        aria-label={`Call ${CONTACT_INFO.phone}`}
      >
        <Phone size={20} />
      </Link>

      <Link
        href={CONTACT_INFO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-emerald-600 p-3 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(16,185,129,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </Link>
    </div>
  );
}
