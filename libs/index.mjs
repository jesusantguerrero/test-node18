const endpoint = 'https://dev.to/api/'

export const getArticles = async (username) => {
    const res = await fetch(`${endpoint}/articles?username=${username}`)
    return await res.json()
}