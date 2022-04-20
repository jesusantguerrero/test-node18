const endpoint = 'https://dev.to/api/'

const getArticles = (username) => {
    return fetch(`${endpoint}/articles?username=${username}`).then(res => res.json())
}

const main = async () => {
    const articles = await getArticles('jesusantguerrero')
    console.log(articles)
}


main()