module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING
    });

    Address.associate = function(models) {
        Address.belongsTo(models.Contacts)
    }

    return Address;
};