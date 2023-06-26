const Router = require('express')
const router = new Router()
const deliveryController = require('./../controllers/deliveryController')

router.post('/', deliveryController.create)
router.get('/getOrder/:id', deliveryController.get)

module.exports = router
