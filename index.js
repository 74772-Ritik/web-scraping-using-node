const express = require('express');
const sequelize = require('./db/db_conn');
const Results = require('./models/results.model');
const Web_Config = require('./models/web_scraping_config.model');
const bodyParser = require('body-parser');
const scrape=require('./scraping/scrape')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync();
    console.log("Tables created");
  } catch (error) {
    console.log(error);
  }
})();



app.post('/scraping/api/v1/scrape', async (req, res) => {
  try {
    await Web_Config.create({
      scraping_url: req.body.scraping_url,
      screen_location_elements: req.body.screen_location_elements,
      parsing_field1: req.body.parsing_field1,
      parsing_field2: req.body.parsing_field2,
    });

    if(req.body.parsing_field3){
      const result = await scrape(
        req.body.scraping_url,
        req.body.screen_location_elements,
        req.body.parsing_field1, 
        req.body.parsing_field2,
        req.body.parsing_field3
      );
      console.log(result)
      await Results.bulkCreate(result);
    }
     else{
      const result = await scrape(
        req.body.scraping_url,
        req.body.screen_location_elements,
        req.body.parsing_field1, 
        req.body.parsing_field2 
      );
      console.log(result)
      await Results.bulkCreate(result);
     }


    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


// pass the url in form of query parameter
app.get('/scraping/api/v1/scrape/web_config', async (req, res) => {
  try {
    const { scraping_url } = req.query; 
    const data = await Web_Config.findOne({
      where: { scraping_url: scraping_url },
      include: Results
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
