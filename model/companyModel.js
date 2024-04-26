const mongoose = require("mongoose");

const Company = new mongoose.Schema({
  name: {
    type: String,
  },
  website: {
    type: String,
    unique: true,
  },
  founded: {
    type: String,
  },
  hq: {
    type: String,
  },
  emp: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  category: {
    type: String,
  },
  specs: {
    type: [String],
  },
  phone:{
    type:String
  }
});

module.exports = mongoose.model("Company", Company);
