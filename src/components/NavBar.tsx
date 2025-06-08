"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/audio-jobs", label: "Audio Jobs" },
  { href: "/voices", label: "Voices" },
  { href: "/settings", label: "Settings" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-4 p-4 border-b border-gray-200 bg-white mb-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-1 rounded hover:bg-gray-100 transition-colors ${
            pathname === item.href ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
} 