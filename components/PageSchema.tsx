import { BASE, requestLang } from "@/lib/seo";

type Names = { name: string; description?: string };
type Props = {
  /** Hebrew path of the page, e.g. "/privacy" ("/" for the home page). */
  path: string;
  he: Names;
  en: Names;
  /** Schema.org page type. */
  type?: "WebPage" | "ContactPage" | "CollectionPage" | "AboutPage";
  /** Visible "last updated" date (YYYY-MM-DD, or YYYY-MM when the page only shows a month). */
  dateModified?: string;
  /** Adds a Service node (serviceType is the visible service name). */
  service?: { he: string; en: string };
  /** Extra graph nodes built only from facts visible on the page. */
  extra?: object[];
};

const HOME = { he: "דף הבית", en: "Home" };

/** Server-rendered page-level JSON-LD: WebPage (+ BreadcrumbList on inner pages, + Service where the page is a service). */
export default function PageSchema({ path, he, en, type = "WebPage", dateModified, service, extra = [] }: Props) {
  const lang = requestLang();
  const n = lang === "en" ? en : he;
  const prefix = lang === "en" ? "/en" : "";
  const url = path === "/" ? (lang === "en" ? `${BASE}/en` : BASE) : `${BASE}${prefix}${path}`;
  const isHome = path === "/";
  const graph: object[] = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name: n.name,
      ...(n.description ? { description: n.description } : {}),
      inLanguage: lang === "en" ? "en" : "he-IL",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#business` },
      ...(dateModified ? { dateModified } : {}),
      ...(isHome ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    },
  ];
  if (!isHome) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "en" ? HOME.en : HOME.he, item: lang === "en" ? `${BASE}/en` : BASE },
        { "@type": "ListItem", position: 2, name: n.name, item: url },
      ],
    });
  }
  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      serviceType: lang === "en" ? service.en : service.he,
      name: n.name,
      provider: { "@id": `${BASE}/#business` },
      url,
      inLanguage: lang === "en" ? "en" : "he-IL",
    });
  }
  graph.push(...extra);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
