import config from "../config";

class SiteService {
    runCheck() {
        const url = `${config.apiV1}/sites/check`
        console.log("Here in fetch", url)
        return fetch(url,
        {
            method: 'POST'
        }).then(res => res.json())
    }   
}

export const siteService = new SiteService()