var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },

    description: {
        type: String
    }
});

var Categories = module.exports = mongoose.model('Categories', categorySchema);

module.exports.getCategories = function(defaultCallback) {
    Categories.find(defaultCallback);
};

module.exports.getCategoryById = function(articleId, defaultCallback) {
    Categories.findById(articleId, defaultCallback);
};

module.exports.getCategoryByCategory = function(categoryId, defaultCallback) {
    Categories.find({
        category: categoryId
    }, defaultCallback);
};

module.exports.createCategory = function(defaultCallback) {
    (new Categories()).save(defaultCallback);
};