import puppeteer from 'puppeteer';
const endpoint = 'https://sirena.do';

const getProducts = async (productName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(endpoint + '/products/search/' + productName.toLowerCase());
  const result = await page.evaluate(() => {
    let resultNodes = Array.from(document.querySelectorAll('[class*="item-product "]'));
    return resultNodes.map(node => ({
        name: node.querySelector('.item-product-title').innerText,
        price: node.querySelector('.item-product-price').innerText,
        image: node.querySelector('.item-product-image').src,
    }));
  });

  await browser.close();
  return result;
};

export default getProducts;