const Fs = require("fs");
const Path = require("path");
const Sequelize = require("sequelize");


//db config
const sequelize = new Sequelize(
    'contact address',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const db = {};

Fs.readdirSync(__dirname)
	.filter(file => file.indexOf(".") !== 0 && file !== "index.js")
	.forEach(file => {
		const model = require('./' + file)(sequelize, Sequelize.DataTypes)
		db[model.name] = model;
	});
        
db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

module.exports = db



