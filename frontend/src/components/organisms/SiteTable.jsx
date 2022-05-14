import { useReducer } from "react"
import { Fragment, useState } from "react"
import config from "../../config"
import { SiteItem } from "../molecules/SiteItem"
import { SiteForm } from "./SiteForm"

export const SiteTable = ({ sites, className, onSaved, onCheck, onDeleteItem }) => {
    const [siteData, setSiteData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isAdding, dispatch] = useReducer((state, action) => {
        switch (action) {
            case "toggle":
                return !state
            case "activate":
                return true
            case "deactivate":
                return false
            default:
                return state
            
        }
    }, false)

    const toggleAdding = (e) => {
        e.preventDefault()
        dispatch("toggle")
    }

    const handleEdit = (site) => {
        setSiteData(site)
        dispatch("activate")
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setSiteData({ ...siteData, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = {
            ...siteData,
            actions: [{
                action: siteData.action,
                value: siteData.value,
                index: siteData.index || 0
            }]
        }
        let endpoint = `${config.apiV1}/sites`
        let method = "POST"
        if (siteData.id) {
            endpoint = `${config.apiV1}/sites/${siteData.id}`
            method = "PUT"
        }
        const response = await fetch(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        setIsLoading(false)
        dispatch("deactivate")
        setSiteData({})
        onSaved(data)
    }

    return (<Fragment>
        <header className="flex justify-between">
            <section>
                <h4 className="font-bold text-2x"> Sites</h4>
            </section>
            <section className="flex space-x-2">
                <button className="px-5 py-1 bg-gray-600 rounded-md text-md" onClick={(e) => toggleAdding(e)}>Add</button>
                <button className="px-5 bg-gray-600 rounded-md text-md" onClick={onCheck}>Check sites</button>
            </section>
        </header>
        <div className={`${className} mt-2`}>
            { isAdding && <SiteForm 
                    site={siteData} 
                    isLoading={isLoading}
                    onSubmit={onSubmit} 
                    onChange={onChange} 
                    onCancel={toggleAdding} 
                /> 
            }
            { sites.map(site => <SiteItem key={site.id} site={site} onEdit={handleEdit} onDelete={onDeleteItem} />)}
        </div>
    </Fragment>
    )
}