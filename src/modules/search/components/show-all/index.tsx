import { Container, Text } from "@medusajs/ui"
import { useHits, useSearchBox } from "react-instantsearch"

import InteractiveLink from "@modules/common/components/interactive-link"
import { useTranslation } from "@i18n/client"

const ShowAll = () => {
  const { t } = useTranslation("common")

  const { hits } = useHits()
  const { query } = useSearchBox()
  const width = typeof window !== "undefined" ? window.innerWidth : 0

  if (query === "") return null
  if (hits.length > 0 && hits.length <= 6) return null

  if (hits.length === 0) {
    return (
      <Container className="flex gap-2 justify-center h-fit py-2">
        <Text>{t("no-results-found")}</Text>
      </Container>
    )
  }

  return (
    <Container className="flex sm:flex-col small:flex-row gap-2 justify-center items-center h-fit py-4 small:py-2">
      <Text>{t("showing-first-results", { number: width > 640 ? 6 : 3 })}</Text>
      <InteractiveLink href={`/results/${query}`}>{t("view-all")}</InteractiveLink>
    </Container>
  )
}

export default ShowAll
