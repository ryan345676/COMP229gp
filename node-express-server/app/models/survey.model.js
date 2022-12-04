module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    id: Number,
    owner: String,
    title: String,
    type: String,
    startdate: String,
    enddate: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
  });

  const Survey = mongoose.model("survey", schema);
  return Survey;
};
