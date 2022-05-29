import { Suspense } from "solid-js";
import { SiteItem } from "./SiteItem";

export default function SiteTable({ sites, onCheck }) {
    const handleUpdate = (site) => {
        console.log(site)
    }

    const toggleAdding = (e) => {
    }

    return <div class="max-w-7xl mx-auto">
        <header class="flex justify-between mb-5">
            <section>
                <h4 class="font-bold text-2x"> Sites</h4>
            </section>
            <section class="flex space-x-2">
                <button class="px-5 py-1 bg-gray-600 rounded-md text-md" onClick={toggleAdding}>Add</button>
                <button class="px-5 bg-gray-600 rounded-md text-md" onClick={onCheck}>Check sites</button>
            </section>
        </header>
        <section class="rounded-md overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
                <>
                    <For each={sites()}>
                        { site => <SiteItem site={site} key={site.id} onEdit={handleUpdate} onDelete={handleUpdate} /> }
                    </For>
                </>
            </Suspense>
        </section>
    </div>
}