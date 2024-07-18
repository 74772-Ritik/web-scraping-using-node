const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('web_scraping_apis', 'root', 'Ritikc@2000', {
  host: 'localhost',
  dialect:'mysql'
});



module.exports=sequelize;