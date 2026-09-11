import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/eb-garamond";
import "./globals.css";

export const metadata: Metadata = {
  title: "КРАЙ — Цифровий атлас українських Карпат",
  description:
    "Місця, голоси та історії українських Карпат. Інтерактивна подорож за межі знайомих маршрутів.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
