"use client";

import { Linkedin, Instagram } from "lucide-react";
import XIcon from '@mui/icons-material/X';

export default function SocialIcons() {
  return (
    <div className="flex gap-6 text-white/60">
      <a
        href="#"
        className="hover:text-white transition hover:scale-110"
      >
        <Linkedin size={26} />
      </a>

      <a
        href="#"
        className="hover:text-white transition hover:scale-110"
      >
        <Instagram size={26} />
      </a>

      <a
        href="#"
        className="hover:text-white transition hover:scale-110"
      >
        <XIcon size={26} />
      </a>
    </div>
  );
}
