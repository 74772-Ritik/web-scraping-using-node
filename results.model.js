const { DataTypes } = require('sequelize')
const sequelize= require('../db/db_conn')
const Web_Config=require('../models/web_scraping_config.model')

const Results=sequelize.define('Web_Scraping_results',
    {
        webscraping_result_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        customer_name:{
            type:DataTypes.STRING,
            allowNull:false,
            
        },
        review_rating:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        parsing_error:{
            type:DataTypes.STRING,
            allowNull:true
        },
        review_comment:{
          type:DataTypes.STRING(1000),
          allowNull:true
      },
        scraping_config_id: {
            type: DataTypes.INTEGER,
            references: {
              model: Web_Config,
              key: 'scraping_config_id'
            }
          }
       
           
    },
    {
      timestamps:true
    }
)

Web_Config.hasMany(Results, {
  foreignKey: 'scraping_config_id'
});

Results.belongsTo(Web_Config, {
    foreignKey: 'scraping_config_id'
  });
  

  module.exports=Results