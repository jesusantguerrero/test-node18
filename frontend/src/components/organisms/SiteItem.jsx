export const SiteItem = ({ site }) => {
    return <div>
        <div>{site.title}</div>
        <div>{site.url}</div>
        { site.results.map && 
            <div> 
                {site.results.map(version => <span> {version} </span>)}
            </div>
        }
    </div>
}