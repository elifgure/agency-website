import { Linkedin, Instagram } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex gap-5 text-white/60">
      <span className="text-xl hover:opacity-100 hover:scale-110 transition cursor-pointer">
        X
      </span>
      <Linkedin className="w-5 h-5 hover:opacity-100 hover:scale-110 transition cursor-pointer" />
      <Instagram className="w-5 h-5 hover:opacity-100 hover:scale-110 transition cursor-pointer" />
    </div>
  );
}
