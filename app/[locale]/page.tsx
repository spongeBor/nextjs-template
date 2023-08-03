import TranslationsProvider from "@/common/TranslationsProvider";

import initTranslations from "@/i18n";
export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, options } = await initTranslations(locale);
  return (
    <TranslationsProvider namespaces={options.ns as string[]} locale={locale}>
      <main className='relative box-border flex h-screen max-h-screen min-h-screen flex-none flex-col'>
        <div className='relative flex h-full w-full justify-normal'>
          我是模板
        </div>
      </main>
    </TranslationsProvider>
  );
}
