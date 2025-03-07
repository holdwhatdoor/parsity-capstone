const axios = require('axios');
const router = require("express").Router();
const user = require("../models/user");
const meal = require("../models/meal");
const foodItem = require("../models/foodItem");

const searchResults = [];
const measureTypes = [];

// API keys/account for fdcUSDA api - https://fdc.nal.usda.gov/api-guide.html#bkmk-6
const fdcUsdaApiKey = process.env.FDC_USDA_API_KEY;
const fdcUSDAaccountID = process.env.FDC_USDA_ACCOUNT_ID;
const fdcUsdaApiQuery = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${fdcUsdaApiKey}&query=`;
const fdcUsdaApiQueryWOKey = `https://api.nal.usda.gov/fdc/v1/foods/search?query=`;

// empty array variable to populate with data returned from api axios.get call
const returnedMatchingFoodSearchArray = []
// conversions for different measurements based on 100g/100mL base measure from API data
const ouncesPerGram = 0.0353;
const dryGramsPerOunce = 28.35;
const fluidGramsPerOunce = 29.57;
const ouncePerTBSP = 0.5;
const poundsPerGram = .0022;

/**
 * 
 * @param {Array} nutrientArray 
 * @param {String} name 
 * @returns {Array} - filtered array from input array and input String text
 */
function filterFoodByName(nutrientArray, name){
  return nutrientArray.filter(food => food.foodCategory?.indexOf(name) > -1)
}

/**
 * 
 * @param {String} searchInput 
 *   asyncronous function for axios query for fdcUSDA api with user input search
 */
async function getSearchResults(searchInput) {
  try{
    let response = undefined;
    response = await axios.get(`${fdcUsdaApiQuery}${searchInput}`)
    return response;
  } catch (err){

  }
}

router.param("user", function(req, res, next){
  req.user;
  next();
})

router.get('/search', async (req, res, next) => {
  // clears array of data returned of previous search matching user input query
  returnedMatchingFoodSearchArray.splice(0, returnedMatchingFoodSearchArray.length);
  try{
    // needs component to call reducer function that queries the server with url/port# i.e. http://localhost:8000/search and pass the search bar input as a param to build the query - i.e. baseUrl = http://localhost:8000/search + ?query=searchinput

    await axios.get(`${fdcUsdaApiQueryWOKey}${req.query.query}&dataType=Foundation`, 
      {
        headers: {'X-Api-Key' : fdcUsdaApiKey }
      }, 
    ).then((item) => {
      // array to filter all foods from API with description that match user input query
      const matchingSearchDescription = item.data.foods.filter(food => 
        (food.description.toLowerCase().indexOf((req.query.query).toLowerCase()) > -1));
      // reduces and filters returned array from user input query that matches any string in the API database food description
      const foodItemFilteredArray = matchingSearchDescription.reduce((acc, foodItem) => [...acc, { food: foodItem.description, calories: foodItem.foodNutrients.filter(nutrient => nutrient.nutrientNumber.indexOf("208") > -1 || nutrient.nutrientNumber.indexOf("957") > -1 || nutrient.nutrientNumber.indexOf("958") > -1)[0]?.value, carbs: foodItem.foodNutrients.filter(nutrient => nutrient.nutrientName.indexOf("Carbohydrate") > -1)[0]?.value, protein: foodItem.foodNutrients.filter(nutrient => nutrient.nutrientName.indexOf("Protein") > -1)[0]?.value, fat: foodItem.foodNutrients.filter(nutrient => nutrient.nutrientName.indexOf("Total lipid") > -1)[0]?.value, amt: "100 grams or mL" }], [])
      // filters out all foods without valaues for all macronutrients
      const foodsWithAllValidMacros = foodItemFilteredArray.filter(item => item.calories != undefined && item.carbs != undefined && item.protein != undefined && item.fat != undefined)
      
      res.send(foodsWithAllValidMacros)
    })

  } catch(err){

  }

})

module.exports = router;