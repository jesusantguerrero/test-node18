export const selectorTemplate = {
    github: {
        replaceable: 'https://github.com',
        getSelector(url) {
            return `a[href*="${url.replace(this.replaceable, '')}/releases/tag"]`
        },
        getAction() {
            return ['text']
        }
    }
}


export const getSelectors = (site) => {
    const page = Object.values(selectorTemplate).find((template) => {
        return site.url.includes(template.replaceable)
    })

    return {
        selector: site.selector || page.getSelector(site.url),
        actions: site.action || page.getAction()
    }
} 