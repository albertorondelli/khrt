import { Table } from "@medusajs/ui"
import { Tag } from "@medusajs/icons"
import { createTranslation } from "@i18n/server"

export async function Recycling() {
  
  const { t } = await createTranslation("recycling-and-sustainability")

  return (
    <div className="content-container w-full space-y-8 h-[80dvh] mb-4 px-3 py-6">
      <h1 className="text-2xl-semi uppercase">{t("recycling")}</h1>
      <div className="space-y-2">
        <p>{t("instructions")}</p>
        <p>{t("qr-code")}</p>

        <p>{t("guide")}</p>
        <p>{t("check-disposal")}</p>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{t("reference-image")}</Table.HeaderCell>
            <Table.HeaderCell>{t("material-description")}</Table.HeaderCell>
            <Table.HeaderCell>{t("material-type")}</Table.HeaderCell>
            <Table.HeaderCell>{t("how-to-recycle")}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Tag />
            </Table.Cell>
            <Table.Cell>{t("paper-tag")}</Table.Cell>
            <Table.Cell>{t("paper")}</Table.Cell>
            <Table.Cell>{t("pap21")}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}


export default Recycling;