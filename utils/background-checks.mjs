import axios from "axios";
import  { siteController } from "./../controllers/sites.mjs";
import db from "../libs/db.mjs"
const { getSites, update } = siteController(db);
import Cheerio from 'cheerio';

export const runBackground = () => {
    getSites().then(sites => {
        sites.forEach(updateCall);
    }).catch(error => {
        console.log(error)
    });
}

const updateCall = async (site) => {
    let results = []
    await axios.get(site.url).then(({ data }) => {
        results = site.actions ? processData(data, site.selector, site.actions) : [];
    }).catch(error => {
        console.log(error)
        // process error
    });
    
    if (results.length > 0) {
        await update(site, results);
        console.log('saved', site.title, results)
    }
}

export const processData = (data, selector, actions) => {
    const $ = Cheerio.load(data);
    const $selector = $(selector);
    return actions.map(({action , value, index}) => {
        return $($selector[index])[action](value)
    })
}
