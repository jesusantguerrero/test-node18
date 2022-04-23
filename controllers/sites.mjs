export const siteController = (prisma) => {

  const getSites =  async (prisma) => {
      return await prisma.site.findMany()
  }
  
  const saveSite = async (site) => {
    return await prisma.site.create({
      data: {
        title: site.title,
        url: site.url,
        selector: site.selector
      }
    })
  }

  return {
    getSites,
    saveSite
  }
}


