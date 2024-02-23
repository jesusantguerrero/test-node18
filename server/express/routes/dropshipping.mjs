import express from 'express';
import getVendorProduct from '../libs/vendors.mjs';

const DropshippingRouter = express.Router();

DropshippingRouter.get('/', async (req, res) => {
  const search = req.query.search
  console.log(search)
  const list = await getVendorProduct(search)
  return res.json({list});
});

export default DropshippingRouter;