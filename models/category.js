module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryName: DataTypes.STRING
    });

    Category.associate = function(models) {
        Category.hasMany(models.Contacts) // Category - Contacts , 1 to Many
    }

    return Category;
};