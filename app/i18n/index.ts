import { getOptions } from "@/i18n/i18nConfig";
import { InitOptions, createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { ITran } from "./type";

export default async function initTranslations(
  locale: string,
  namespaces?: string[],
) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(locale, namespaces));

  return i18nInstance as { t: ITran; options: InitOptions };
}
