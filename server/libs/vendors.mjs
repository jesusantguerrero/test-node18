import puppeteer from 'puppeteer';


const $ = (selector, document) => {
  try {
    return document.querySelector(selector);
  } catch (err) {
    return {}
  }
}
const getProduct = async (productName) => {
  const startedAt = new Date();
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
 
    await page.goto(productName.toLowerCase());
    const result = await page.evaluate(() => {
      const mainImage = document.querySelector(".lcp-gallery__hook")
      const name = document.querySelector(".product-intro__head-name")
      const id = document.querySelector(".product-intro__head-sku")
      const price = document.querySelector(".discount .from")

      return {
        mainImage: mainImage.src,
        productName: name.textContent,
        id: id.textContent.replace?.('SKU: ', ''),
        price:price.textContent,
        startedAt,
        endedAt: new Date()
      }
    });
    await browser.close();
    return result;
  
};

export default getProduct;