module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define('Contacts', {
        name: DataTypes.STRING,
        favourite: { 
            type: DataTypes.BOOLEAN, //use boolean datatypes, 1=true (mark as fav), 0=false(not fav)
            allowNull: true,    // allow records to be null value (true=1)//if remove this, true will be '0' also.
            defaultValue: false //default the value to false = 0 (not fav)
        }
    });

    Contacts.associate = function(models) {
        Contacts.hasMany(models.Phone), //Contacts - Phone , 1- to Many
        Contacts.hasMany(models.Address), //Contacts - Address , 1- to Many
        Contacts.belongsTo(models.Category)    //Contacts - Category , Many to 1
       
    }

    return Contacts;
};