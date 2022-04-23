export const siteController = (db) => {

  const getSites =  async (prisma) => {
      return await prisma.site.findMany()
  }
  
  const saveSite = async (site) => {
    // 
  }

  return {
    getSites,
    saveSite
  }
}


