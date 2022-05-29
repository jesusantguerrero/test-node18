export const SiteForm = ({ onSubmit, onChange, onCancel, site }) => {

 return (
    <form onSubmit={onSubmit} className="justify-between px-5 py-5 space-x-2 bg-gray-800">
        <div className="flex w-full space-x-2 text-left">
            <div className="flex flex-col">
                <label htmlFor="title" className="px-5 text-xl">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
                    value={site.title}
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="url" className="px-5 text-xl">URL</label>
                <input
                    type="text"
                    name="url"
                    id="url"    
                    className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
                    value={site.url}
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="selector" className="px-5 text-xl">Selector</label>
                <div className="flex">
                    <input
                        type="text"
                        name="selector"
                        id="selector"
                        className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
                        value={site.selector}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="version" className="px-5 text-xl">Action</label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        name="action"
                        id="action"
                        placeholder="Name"
                        className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
                        value={site.action}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="value"
                        id="value"
                        placeholder="value"
                        className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
                        value={site.value}
                        onChange={onChange}
                    />
                    <input
                        type="number"
                        name="index"
                        id="index"
                        placeholder="index"
                        className="w-16 px-1 py-2 text-white bg-gray-700 rounded-md"
                        value={site.index}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
        <div className="flex justify-end mt-5 space-x-3">
            <button 
                type="button" 
                className="px-5 py-2 bg-red-400 rounded-md text-md"
                onClick={onCancel}
            >
                Cancel
            </button>
            <button className="px-5 py-2 bg-green-400 rounded-md text-md">Save</button>
        </div>
    </form>
    )
}