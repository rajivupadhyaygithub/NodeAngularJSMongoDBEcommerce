var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var productSchema = mongoose.Schema({});

var Products = module.exports = mongoose.model('Products', productSchema);

/* simple product collection containg all products in single response */
module.exports.getProducts = function(defaultCallback) {
    Products.find(defaultCallback);
};

/* get filtred products by given category */
module.exports.getProductsByCategory = function(categoryId, defaultCallback) {
    Products.find({
        categoryId: ObjectID(categoryId)
    }, defaultCallback);
};

/* get filtred products by given category with product id */
module.exports.getSelectedProductBycategoryId = function(categoryId, productId, defaultCallback) {
    Products.find({
        categoryId: ObjectID(categoryId),
        _id: productId
    }, defaultCallback);
};

/* model to count products available in database based on category id 
    if 'all-products' was passed a category, it means need to go throug all products
    available in database, to count and return available product length
*/
module.exports.getProductCount = function(query, defaultCallback) {
    query = query.categoryId === 'all-products' ? {} : {
        categoryId: ObjectID(query.categoryId)
    };
    Products.find(query, defaultCallback);
};

/* model to filed name range, (Example: price, oldprice, newprice) products available in database based on category id 
    if 'all-products' was passed a category, it means need to go throug all products
    available in database, to count and return available product's range length
*/
module.exports.getProductRange = function(query, defaultCallback) {
    query = query.categoryId === 'all-products' ? {} : {
        categoryId: ObjectID(query.categoryId)
    };
    Products.find(query, defaultCallback);
};

module.exports.productFilter = function(query, defaultCallback) {
    var finalQuery = {};
    if (query.categoryId !== 'all-products') {
        finalQuery.categoryId = ObjectID(query.categoryId);
        finalQuery[query.filterKeyName] = query.filterKeyValue;
    } else {
        finalQuery[query.filterKeyName] = query.filterKeyValue;
    }
    Products.find(finalQuery, defaultCallback);
};

module.exports.productFilterOptions = function(query, defaultCallback) {
    var finalQuery = {};
    if (query.categoryId !== 'all-products') {
        finalQuery.categoryId = ObjectID(query.categoryId);
        finalQuery[query.filterKeyName] = query.filterKeyValue;
    } else {
        finalQuery[query.filterKeyName] = query.filterKeyValue;
    }

    Products.find(finalQuery, defaultCallback);
};

module.exports.subFilters = function(query, additional, defaultCallback) {
    if (additional.categoryId !== 'all-products') {
        query.categoryId = ObjectID(additional.categoryId);
        query[additional.filterKeyName] = additional.filterKeyValue;
    } else {
        query[additional.filterKeyName] = additional.filterKeyValue;
    }

    Products.find(query, defaultCallback);
};

module.exports.addToCart = function(query, additional, defaultCallback) {
    Products.find(query, defaultCallback);
};