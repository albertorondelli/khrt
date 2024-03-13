import { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://localhost:8000"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/private/",
          "/checkout/",
          "/account/",
          "/cart/",
          "/*?step=address",
          "/*?step=delivery",
          "/*?step=review",
          "/*?sortBy=price_asc",
          "/*?sortBy=price_desc",
          "/*?sortBy=created_at",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
