import { getArticles } from "./libs/index.mjs"

const main = async () => {
    const articles = await getArticles('jesusantguerrero')
    console.log(articles)
}


main()