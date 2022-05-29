import axios from "axios";
import  { siteController } from "./../controllers/sites.mjs";
import db from "../libs/db.mjs"
const { getSites, update } = siteController(db);
import Cheerio from 'cheerio';

export const runBackground = async (sync = false, socket) => {
    try {
        const sites = await getSites();
        if (sync) {
            for (const site of sites) {
                await updateCall(site);
            }
            socket && socket.emit('check-completed', sites);
        } else {
            sites.forEach(updateCall);
        }
    } catch (error) {
        console.log(error);
    }
}

const updateCall = async (site) => {
    let results = []
    await axios.get(site.url).then(({ data }) => {
        results = site.actions ? processData(data, site.selector, site.actions) : [];
    }).catch(error => {
        results = [`Error: ${error.message}` ]
    });

    
    if (results.length > 0 && site.results !== results) {
        await update(site.id, { results: results });
    }
}

export const processData = (data, selector, actions) => {
    const $ = Cheerio.load(data);
    const $selector = $(selector);
    let { index } = actions[0]
    index = index <= 0 ? 1 : index;
    return $selector ? Array.from($selector).slice(0, index).map((selector, index) => {
        const currentAction = actions[index] || actions[0]
        const {action = 'text' , value } = currentAction;
        return $(selector)[action](value)
    }) : [];
}
