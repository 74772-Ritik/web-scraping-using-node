const cheerio = require('cheerio');
const axios = require('axios');
const Web_Config= require('../models/web_scraping_config.model')



const scrape=async function start(url,screen_location_elements,parsing_field1,parsing_field2,parsing_field3=null) {
    let html = await axios.get(url,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8',
            'Connection': 'keep-alive',
            'Referer': 'https://repairpal.com/',
            'Upgrade-Insecure-Requests': '1',
            'DNT': '1', // Do Not Track request header
            'Cache-Control': 'no-cache'
        }
    })

    
    let $ = cheerio.load(html.data)
    let result = []
    const user=await Web_Config.findOne( {where: { scraping_url: url }})
    const user_id=user.dataValues.scraping_config_id
    console.log(user_id)
    $(screen_location_elements).each((i, ele) => {
        
        
        if(parsing_field3){
            let name = $(ele).find(parsing_field1).text().trim()
            let rating = $(ele).find(parsing_field2).text().trim()
            let review_comment = $(ele).find(parsing_field3).text().trim()
            
            result.push({customer_name: name, review_rating: rating , scraping_config_id: user_id,review_comment:review_comment})
        }
        else{
            let name = $(ele).find(parsing_field1).text().trim()
            let rating = $(ele).find(parsing_field2).attr("content")
        // let review= $(ele).find(review1).text().trim()
        result.push({customer_name: name, review_rating: rating , scraping_config_id: user_id})
        }
    })
    return result;
  }

  module.exports=scrape