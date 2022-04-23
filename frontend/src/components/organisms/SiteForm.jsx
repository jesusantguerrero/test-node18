export const SiteForm = ({ onSubmit, onChange, site }) => {

 return (
    <form onSubmit={onSubmit} className="flex justify-between bg-gray-800 py-5 px-5 space-x-2">
        <div className="flex text-left space-x-2 w-full">
            <div className="flex flex-col">
                <label htmlFor="title" className="text-xl px-5">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="w-full px-5 py-2 rounded-md bg-gray-700 text-white"
                    value={site.title}
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="url" className="text-xl px-5">URL</label>
                <input
                    type="text"
                    name="url"
                    id="url"    
                    className="w-full px-5 py-2 rounded-md bg-gray-700 text-white"
                    value={site.url}
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="selector" className="text-xl px-5">Selector</label>
                <div className="flex">
                    <input
                        type="text"
                        name="selector"
                        id="selector"
                        className="w-full px-5 py-2 rounded-md bg-gray-700 text-white"
                        value={site.selector}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="version" className="text-xl px-5">Action</label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        name="action"
                        id="action"
                        placeholder="Name"
                        className="w-full px-5 py-2 rounded-md bg-gray-700 text-white"
                        value={site.action}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="value"
                        id="value"
                        placeholder="value"
                        className="w-full px-5 py-2 rounded-md bg-gray-700 text-white"
                        value={site.value}
                        onChange={onChange}
                    />
                    <input
                        type="number"
                        name="index"
                        id="index"
                        placeholder="index"
                        className="w-16 px-1 py-2 rounded-md bg-gray-700 text-white"
                        value={site.index}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
        <div className="flex justify-end">
            <button className="rounded-md bg-gray-600 text-md px-5 py-1">Add</button>
        </div>
    </form>
    )
}