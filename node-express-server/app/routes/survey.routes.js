module.exports = app => {
  const survey= require("../controllers/survey.controller.js");

  var router = require("express").Router();

  // Retrieve all survey
  router.get("/", survey.findAll);

  // Retrieve a single survey with id
  router.get("/:id", survey.findOne);

  // Update a survey with id
  router.put("/:id", survey.update);

  // Delete a survey with id
  router.delete("/:id", survey.delete);

  app.use("/easySurvey", router);
};
