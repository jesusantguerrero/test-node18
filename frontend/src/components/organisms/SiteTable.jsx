import { SiteItem } from "../molecules/SiteItem"

export const SiteTable = ({ sites, className }) => {
    return (
        <div className={className}>
            { sites.map(site => <SiteItem key={site.id} site={site} />)}
        </div>
    )
}