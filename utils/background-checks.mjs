import axios from "axios";
import  { siteController } from "./../controllers/sites.mjs";
import db from "../libs/db.mjs"
const { getSites, update } = siteController(db);
import Cheerio from 'cheerio';

export const runBackground = (sync = false) => {
    return getSites().then(sites => {
        if (sync) {
            for (const site of sites) {
                updateCall(site);
            }
        } else {
            sites.forEach(updateCall);
        }
    }).catch(error => {
        console.log(error)
    });
}

const updateCall = async (site) => {
    let results = []
    await axios.get(site.url).then(({ data }) => {
        results = site.actions ? processData(data, site.selector, site.actions) : [];
    }).catch(error => {
        results = [`Error: ${error.message}` ]
    });
    
    if (results.length > 0) {
        await update(site, results);
        console.log('saved', site.title, results)
    }
}

export const processData = (data, selector, actions) => {
    const $ = Cheerio.load(data);
    const $selector = $(selector);
    return actions.map ? actions.map(({action = 'text' , value, index = 0}) => {
        return $($selector[index])[action](value)
    }) : [];
}
