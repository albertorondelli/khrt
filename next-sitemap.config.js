const excludedPaths = [
  "/unicredit-payment",
  "/checkout",
  "/account*",
  "/server-sitemap-index.xml",
]

/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8000"

module.exports = {
  i18n: {
    locales: ['default', 'it', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  exclude: excludedPaths,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
}
