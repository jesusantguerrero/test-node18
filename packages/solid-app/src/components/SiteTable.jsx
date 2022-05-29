import { SiteItem } from "./SiteItem";
import style from "./SiteTable.module.css";

export default function SiteTable({ sites }) {
    const handleUpdate = (site) => {
        console.log(site)
    }

    return <div class={style.siteTable}>
        <div class={style.header}>
            <h4>Sites</h4>
            <div>
                <button>Add</button>
                <button>Check</button>
            </div>

        </div>
        <For each={sites()}>
            { site => <SiteItem site={site} key={site.id} onEdit={handleUpdate} onDelete={handleUpdate} /> }
        </For>
    </div>
}