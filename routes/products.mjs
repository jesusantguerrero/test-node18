import express from 'express';
import getProducts from '../libs/getProducts.mjs';

const ProductRouter = express.Router();

ProductRouter.get('/', async (req, res) => {
  const search = req.query.search
  const list = await getProducts(search)
  return res.json(list);
});

export default ProductRouter;