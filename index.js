import { getArticles } from "./libs/index.mjs"
import { siteController } from "./controllers/sites.mjs"
import db from "./libs/db.mjs";

const main = async () => {
    const { getSites, saveSite } = siteController(db)
    
    // await saveSite({
    //     title: 'test',
    //     url: 'https://nodejs.org/en/',
    //     selector: '.home-downloadbutton[data-version]',
    //     actions: [
    //         {action: 'attr', value: 'data-version', index: 0},
    //         {action: 'attr', value: 'data-version', index: 1}
    //     ]
    // })
    const sites = await getSites()
    console.log(sites)
}


main()
.catch((e) => {
  throw e
})
.finally(async () => {
  await db.$disconnect()
})