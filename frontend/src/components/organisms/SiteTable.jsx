import { Fragment, useState } from "react"
import config from "../../config"
import { SiteItem } from "../molecules/SiteItem"
import { SiteForm } from "./SiteForm"

export const SiteTable = ({ sites, className, onSaved, onCheck }) => {
    const [siteData, setSiteData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const toggleAdding = (e) => {
        e.preventDefault()
        setIsAdding(!isAdding)
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setSiteData({ ...siteData, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(siteData)
        const formData = {
            ...siteData,
            actions: [{
                action: siteData.action,
                value: siteData.value,
                index: siteData.index || 0
            }]
        }
        const endpoint = `${config.apiV1}/sites`
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        setIsLoading(false)
        setIsAdding(false)
        setSiteData({})
        onSaved(data)
    }

    return (<Fragment>
        <header className="flex justify-between">
            <section>
                <h4 className="text-2x font-bold"> Sites</h4>
            </section>
            <section className="flex space-x-2">
                <button className="rounded-md bg-gray-600 text-md px-5 py-1" onClick={(e) => toggleAdding(e)}>Add</button>
                <button className="rounded-md bg-gray-600 text-md px-5" onClick={onCheck}>Check sites</button>
            </section>
        </header>
        <div className={`${className} mt-2`}>
            { isAdding && <SiteForm onSubmit={onSubmit} onChange={onChange} site={siteData} /> }
            { sites.map(site => <SiteItem key={site.id} site={site} />)}
        </div>
    </Fragment>
    )
}