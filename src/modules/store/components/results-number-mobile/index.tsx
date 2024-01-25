import React from "react"
import { useInstantSearch } from "react-instantsearch"

export function formatNumber(number: string | number): string {
  return Number(number).toLocaleString()
}

export function cx(
  ...classNames: Array<string | number | boolean | undefined | null>
) {
  return classNames.filter(Boolean).join(" ")
}

export function ResultsNumberMobile() {
  const {
    results: { nbHits },
  } = useInstantSearch()

  return (
    <div>
      <strong>{formatNumber(nbHits)}</strong> results
    </div>
  )
}
