import config from "../config";

class SiteService {
    async runCheck() {
        const url = `${config.apiV1}/sites/check`
        const res = await fetch(url,
            {
                method: 'POST'
            });
        return await res.json();
    }   
}

export const siteService = new SiteService()