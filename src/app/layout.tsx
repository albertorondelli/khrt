import { Metadata } from "next"
import "styles/globals.css"
import { Nunito_Sans } from "next/font/google"

export const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html className={`${nunito.variable} font-sans`} lang="en" data-mode="light">
      <head>
        <script
          async
          type="text/javascript"
          src="//cdn.cookie-script.com/s/4616f9ced57c5c7377c5f25c13f8180b.js"
        ></script>
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
