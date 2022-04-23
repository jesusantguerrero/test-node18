export const SiteItem = ({ site, key }) => {
    return <div className="flex justify-between w-full bg-gray-700 px-5 py-2" key={key}>
        <h4 className="text-xl w-full text-left uppercase">{site.title}</h4>
        <div className="w-full"> <a href={site.url} className="underline">{site.url}</a></div>
        <div className="w-full text-right">
            { site.results.map && 
                <div className="space-x-2"> 
                    {site.results.map(version => <span className="bg-green-600 rounded-md px-2 py-1"> {version} </span>)}
                </div>
            }
        </div>
    </div>
}
