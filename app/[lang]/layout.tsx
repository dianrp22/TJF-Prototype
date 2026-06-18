import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider, type Lang } from "@/contexts/LanguageContext";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (params.lang !== "en" && params.lang !== "id") notFound();

  return (
    <LanguageProvider lang={params.lang as Lang}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
