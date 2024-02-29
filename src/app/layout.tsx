import { Metadata } from "next"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <script async id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="90575a33-b118-451b-8d07-a0c08a6010be" data-blockingmode="auto" type="text/javascript"></script>
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
