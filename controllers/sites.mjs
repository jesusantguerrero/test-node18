export const siteController = (prisma) => {

  const getSites =  async () => {
      return await prisma.site.findMany()
  }
  
  const saveSite = async (site) => {
    return await prisma.site.create({
      data: {
        title: site.title,
        url: site.url,
        selector: site.selector,
        actions: site.actions
      }
    })
  }

  const update = async (site, result) => {
    const { id } = site
    return await prisma.site.update({
      where: { id },
      data: {
        results: result
      }
    })
  }

  return {
    getSites,
    saveSite,
    update
  }
}


