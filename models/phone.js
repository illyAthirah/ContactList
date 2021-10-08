module.exports = (sequelize, DataTypes) => {
    const Phone = sequelize.define('Phone', {
        number: DataTypes.INTEGER,


    });

    Phone.associate = function(models) {
        Phone.belongsTo(models.Contacts)
    }

    return Phone;
};