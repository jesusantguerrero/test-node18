import axios from "axios";
import Cheerio from 'cheerio';
import  { siteController } from "../app/controllers/sites.mjs";
import db from "../libs/db.mjs"
const { getSites, update } = siteController(db);
import { getSelectors } from "./constants.js";

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
        results = site.actions ? processData(data, getSelectors(site)) : [];
    }).catch(error => {
        results = [`Error: ${error.message}` ]
    });

    if (results.length > 0 && site.results !== results) {
        await update(site.id, { results: results });
    }
}

export const processData = (data, selectorInstance) => {
    const $ = Cheerio.load(data, { 
        decodeEntities: false
    });
    const { selector, actions } = selectorInstance
    const $selector = $(selector);
    let { index } = actions[0]
    index = index <= 0 ? 1 : index;
    return $selector ? Array.from($selector).slice(0, index).map((selector, index) => {
        const currentAction = actions[index] || actions[0]
        const {action = 'text' , value = undefined } = currentAction;
        
        return value ? $(selector)[action](value) : $(selector)[action]()
    }) : [];
}
