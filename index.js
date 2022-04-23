import { getArticles } from "./libs/index.mjs"
import { siteController } from "./controllers/sites.mjs"
import db from "./libs/db.mjs";

const main = async () => {
    const articles = await getArticles('jesusantguerrero')
    const { getSites, saveSite } = siteController(db)
    
    await saveSite({
        title: 'test',
        url: 'https://nodejs.org/en/',
        selector: '.home-downloadbutton[data-version]'
    })
    const sites = await getSites(db)
    console.log(sites)
}


main()
.catch((e) => {
  throw e
})
.finally(async () => {
  await db.$disconnect()
})