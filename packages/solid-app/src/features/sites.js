const endpoint = "http://161.35.141.190:5000/api/v1"


export const fetchSites = () => {
    return fetch(`${endpoint}/sites`)
        .then(res => res.json())
}