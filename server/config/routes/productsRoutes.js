import express from 'express';
import { body, param, validationResult } from 'express-validator';

// auth middlewares
import { auth } from "../../middlewares/auth.js";

// controller
import { productsController } from '../../src/api/v1/controllers/productsController.js';

const router = express.Router();

// validations
// // for product creation
const productCreationValidation = [
    body('name').not().isEmpty().withMessage('The name is required'),
    body('price').isNumeric().withMessage('The price must be a number').isFloat({ min: 0.01 }).withMessage('The price must be greater than 0'),
    body('description').optional().isLength({ min: 0 }),
    body('image_url').isURL().withMessage('The image URL is not valid'),
    body('category').isIn(['Plantas', 'Manualidades', 'Música', 'Bienestar']).withMessage('The category is not valid'),
  ];
  
  // for product id in URL
  const productIdValidation = [
    param('id_product').isInt().withMessage('The product ID must be an integer')
  ];
  
  // middleware to handle validation errors
  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

// routes

// getting products - public
router.get('/products', productsController.getProducts);

// getting product detail by id_product - public
router.get('/products/:id_product', productIdValidation, handleValidationErrors, productsController.getProduct);

// product creation - private
router.post('/products', auth.checkAuthentication, productCreationValidation, handleValidationErrors, productsController.createProduct);

// deleting product by id_product - private
router.delete('/products/:id_product', auth.checkAuthentication, productIdValidation, handleValidationErrors, productsController.deleteProduct);

export default router;