const axios = require('axios')
const Router = require('express')
const router = new Router()
const path = require('path');
const dbPath = path.join(__dirname, '../models/');
const db = require(dbPath);

var body = {
    "organizationId": "de1c3d08-53ea-4f1d-a196-c13c5513ddf5",  
}

router.get('/', (req, res) => {
    // try {
    //     axios.post('https://api-ru.iiko.services/api/1/nomenclature', body, {
    //         headers: {
    //             "Authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcGlMb2dpbklkIjoiMTEwMmI1ZDItZGNkMy00MDc2LTg1YmItMzBiYzkyNTkyYWEzIiwibmJmIjoxNjY3NTc1NjU1LCJleHAiOjE2Njc1NzkyNTUsImlhdCI6MTY2NzU3NTY1NSwiaXNzIjoiaWlrbyIsImF1ZCI6ImNsaWVudHMifQ.LNqcaS2ihHWEWePG_zPsRIyxrN9XexvaQNIXS94QaF8"
    //         },
    //     }).then(data => {
    //         console.log(data.data.products[0]);

    //         putProductsToDatabase(data)
            var data = testSelect().then(data => res.send(data))
            // console.log(data)
            //res.send(data);
            

    //     }).catch(err => {
    //         console.log(err);
    //     })
    //     res.status(200);
    // } catch (err) {
    //     console.log(err);
    // }
})
    

router.post('/')

async function putProductsToDatabase(data) {
    data.data.products.forEach(async function (element) {
        return await db.products.create({
            product_json: element
        }).then(console.log("Cool!")).catch(err => console.log(err))
    })
}

async function testSelect() {
    data = await db.products.findAll({
        attributes: ['id', 'product_json'],
    }).then(console.log("Product found!")).catch(err => console.log(err))
    
    //console.log("------------------------------------------------------")

    var dataToSend = [];

    //console.log('data: ');
    //console.log(data)

    data.forEach(product => {
       // console.log(product.product_json.name)
       // console.log(product.product_json.sizePrices[0].price.currentPrice)
       var dataObj = {name: product.product_json.name, price:product.product_json.sizePrices[0].price.currentPrice};
       dataToSend.push(dataObj);
    })
    //console.log(dataToSend);
    return await JSON.stringify(dataToSend)
    //console.log(data.dataValues.product_json);

    //console.log(data.dataValues.product_json.name);
    //console.log(data.dataValues.product_json.sizePrices[0].price.currentPrice);
    
}
module.exports = router
