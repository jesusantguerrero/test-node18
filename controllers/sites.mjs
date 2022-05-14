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

  const update = async (id, site) => {
    return await prisma.site.update({
      where: { id: Number(id) },
      data: {
        ...site
      }
    })
  }

  const remove = async (id) => {
    return await prisma.site.delete({
      where: { id: Number(id) }
    })
  }

  return {
    getSites,
    saveSite,
    update,
    remove
  }
}


