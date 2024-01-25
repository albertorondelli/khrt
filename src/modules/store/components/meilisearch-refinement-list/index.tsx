"use client"

import { DesktopFilters, MobileFilters, VirtualFilters } from "../filters"
import { Container } from "@medusajs/ui"

const MeilisearchRefinementList = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopFilters />
      </div>
      <div>
        <Container>
          <MobileFilters />
        </Container>
      </div>
      <VirtualFilters />
    </>
  )
}

export default MeilisearchRefinementList
