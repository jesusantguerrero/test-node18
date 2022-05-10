export const SiteItem = ({ site, key, onEdit }) => {
    return <div className="flex justify-between w-full px-5 py-2 bg-gray-700" key={key}>
        <h4 className="w-full text-xl text-left uppercase">{site.title}</h4>
        <div className="w-full"> <a href={site.url} className="underline">{site.url}</a></div>
        <div className="flex items-center justify-end w-full text-right">
            { site.results.map && 
                <div className="space-x-2"> 
                    {site.results.map(version => <span className="px-2 py-1 bg-green-600 rounded-md"> {version} </span>)}
                </div>
            }
        </div>
        <div className="flex items-center px-5">
            <button onClick={() => onEdit(site)} className="px-2 py-1 bg-gray-600 rounded-md">Edit</button>
        </div>
    </div>
}
