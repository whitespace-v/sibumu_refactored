//Booking route
const Router = require('express')
const bookingController = require('./../controllers/bookingController')
const router = new Router()

router.post('/', bookingController.create)

module.exports = router
