const { DataTypes } = require('sequelize')
const sequelize=require('../db/db_conn')

const Web_config=sequelize.define('Web_Config',
    {
        scraping_config_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement:true,
            primaryKey:true

            
        },
        scraping_url:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
            
        },
        screen_location_elements:{
            type:DataTypes.STRING,
            allowNull: false
            
        },
        parsing_field1:{
            type:DataTypes.STRING,
           
            
        },
        parsing_field2:{
            type:DataTypes.STRING,
            
        },
       

     },
     {
    timestamps:true
     })
      
    



     module.exports=Web_config

