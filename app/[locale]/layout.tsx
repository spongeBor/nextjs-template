import { dir } from "i18next";
import type { Metadata } from "next";
import "../globals.css";
import i18nConfig from "../i18n/i18nConfig";
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "spongeb-next-template",
  description: "A template with next",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)} data-theme='light'>
      <body>{children}</body>
    </html>
  );
}
