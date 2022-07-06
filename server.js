const { animal } = require("./data/animal.json");
const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();
function filterByQuery(query, animalArray) {
  let personalityTraitsArray = [];
  //Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalArray;
  if (query.personalityTraits) {
    //save personalityTraits is a dedicated array
    //if personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    ffgrrrsgffbbrdg;
    //loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach((trait) => {
      //check the trait against each animal in the fliteredResults array.
      //remember, it is initially a copy of the animalArray,
      //but here were updating it for each trait in the .forEach() loop
      //for each trait being targeted by the filter, the filteredResults
      //array will then contain only the entries that contain the trait,
      //so at the end we will have an array of animals that have every one
      //of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}
//get method requires two arguments. the first is a string describes the route the client
//will have to fetch from. the second is a callback function that will execute when route is accesserd with a get request.
//using the send() method from the res parameter to send string hello to the client
app.get("/api/animal", (req, res) => {
  let results = animal;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
app.get("/api/animals/:id", (req, res) => {
  const results = findById(req.params.id, animals);
  if (result) {
    res.json(results);
  } else {
    res.send(404);
  }
});
//listen to the port
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
