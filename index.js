import { getArticles } from "./libs/index.mjs"
import { siteController } from "./controllers/sites.mjs"
import db from "./libs/db.mjs";

const main = async () => {
    const articles = await getArticles('jesusantguerrero')
    const { getSites, saveSite } = siteController(db)
    
    saveSite()
    const sites = await getSites(db)
}


main()
.catch((e) => {
  throw e
})
.finally(async () => {
  await db.$disconnect()
})