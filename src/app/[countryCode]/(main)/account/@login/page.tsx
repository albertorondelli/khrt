import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"
import { createTranslation } from "@i18n/server"

// TODO: This metadata should be dynamic, if customer had already log in the message should be different, check components inside LoginTemplate to understand which messages create.
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation("metadata")
  return {
    title: t("signin-title"),
    description: t("signin-description"),
  }
}

export default function Login() {
  return <LoginTemplate />
}
