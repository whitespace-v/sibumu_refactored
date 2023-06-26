const Router = require('express')
const getProductsController = require('../controllers/getProductsController')
const ProductCardController = require('../controllers/productCardController')
const getSpecialProductsController = require('../controllers/getSpecialProductsController')
const getSpecialHeaderController = require('../controllers/getSpecialHeaderController');
const SpecialProductCardController = require('../controllers/specialProductCardController')
const router = new Router()

// Импорт роутов
const main = require('./main')
const delivery = require('./delivery')
const booking = require('./booking');

// Описания роутов
router.use('/main', main)
router.use('/test/special/:id', getSpecialProductsController.loadProducts)
router.use('/test/:id', getProductsController.loadProducts)
router.use('/product/:id', ProductCardController.loadProduct)
router.use('/specialProduct/:id', SpecialProductCardController.loadProduct)
router.use('/delivery', delivery)
router.use('/booking', booking)
router.use('/special-header', getSpecialHeaderController.loadSpecialCategory)

module.exports = router
