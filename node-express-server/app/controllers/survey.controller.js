const db = require("../models");
const Survey = db.survey;

// Retrieve all survey from the database.
exports.findAll = (req, res) => {
  Survey.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

// Find a single survey with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Survey.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found survey with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving survey with id=" + id });
    });
};

// Update a survey by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Survey.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update survey with id=${id}. Maybe survey was not found!`,
        });
      } else res.send({ message: "survey was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating survey with id=" + id,
      });
    });
};

// Delete a survey with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Survey.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete survey with id=${id}. Maybe survey was not found!`,
        });
      } else {
        res.send({
          message: "Survey was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete survey with id=" + id,
      });
    });
};
