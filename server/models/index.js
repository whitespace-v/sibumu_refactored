const database = require('./db')
const products = require('./products')
const restaurant = require('./restaurant')
const category = require('./category')
const restaurantApi = require('./restaurantApi')
const delivery = require('./delivery')
const items = require('./items')
const itemsSpecials = require('./itemsSpecials')
const deliveryResponse = require('./deliveryResponse')
const user = require('./users')
const mails = require('./mails')
const specialProducts = require('./specialProducts')
const specialCategory = require('./specialCategory')


// Связь O:M между рестораном и товарами
// restaurant.hasMany(products, {
//     foreignKey: 'restaurantId'
// });
// products.belongsTo(restaurant);
category.hasMany(products);
products.belongsTo(category);

specialCategory.hasMany(specialProducts);
specialProducts.belongsTo(specialCategory);

restaurant.hasMany(category);
category.belongsTo(restaurant);

restaurant.hasMany(specialCategory);
specialCategory.belongsTo(restaurant);

restaurantApi.hasMany(restaurant);
restaurant.belongsTo(restaurantApi);

delivery.hasMany(items)
items.belongsTo(delivery)

delivery.hasMany(itemsSpecials)
itemsSpecials.belongsTo(delivery)

itemsSpecials.belongsTo(restaurant)
restaurant.hasMany(itemsSpecials)

items.belongsTo(restaurant)
restaurant.hasMany(items)

deliveryResponse.belongsTo(delivery)
delivery.hasMany(deliveryResponse)

deliveryResponse.belongsTo(restaurantApi)
restaurantApi.hasMany(deliveryResponse)

user.hasMany(delivery)
delivery.belongsTo(user)

module.exports = {
	database,
	products,
	restaurant,
	category,
	restaurantApi,
	delivery,
	items,
	deliveryResponse,
	user,
	mails,
	specialCategory,
	specialProducts,
	itemsSpecials
}

