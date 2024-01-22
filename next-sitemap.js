const excludedPaths = [
  "/unicredit-payment",
  "/checkout",
  "/account*",
  "/server-sitemap-index.xml",
]

/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8000"

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  exclude: excludedPaths  + ["/[sitemap]"],
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
