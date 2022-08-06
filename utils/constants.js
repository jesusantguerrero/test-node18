export const selectorTemplate = {
    github: {
        replaceable: 'https://github.com',
        getSelector(url) {
            return url.replace(this.replaceable, '') + '/releases'
        },
        getAction() {
            return ['text']
        }
    }
}


export const getSelectors = (site) => {
    const page = Object.values(value).find(() => {
        return site.url.includes(value.replaceable)
    })

    return {
        selector: site.selector || page.getSelector(),
        actions: site.action || page.getAction()
    }
} 