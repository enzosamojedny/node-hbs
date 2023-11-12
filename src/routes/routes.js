import { Router } from "express";
const router = Router()
import {Products,ProductId,AddProduct,UpdateProduct,DeleteProduct,PostCart,GetCartId,PostCartProduct} from '../../index';

router.get('/', (req, res) => {
    res.render('home.hbs',{titulo:'inicio'})
  });
  router.post('/api/:cartid/product/:productid',PostCartProduct)
  router.get('/products',Products)
  router.get('/products/:id',ProductId)
  router.post('/products',AddProduct)
  router.put('/products/:id',UpdateProduct)
  router.delete('/products/:id',DeleteProduct)
  router.post('/api/carts',PostCart)
  router.get('/api/carts/:id',GetCartId)

  
export default router