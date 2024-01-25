import React from "react"
import { useInstantSearch } from "react-instantsearch"
import { ClearFilters } from "../clear-filters"

export function NoResults() {
  const { results } = useInstantSearch()

  const hasRefinements = results.getRefinements().length > 0
  const description = hasRefinements
    ? "Try to reset your applied filters."
    : "Please try another query."

  return (
    <div className="hits-empty-state">
      <div className="h-40">
        <p className="hits-empty-state-title">
          Sorry, we can&apos;t find any matches to your query!
        </p>
        <p className="hits-empty-state-description">{description}</p>
        <ClearFilters />
      </div>
    </div>
  )
}
