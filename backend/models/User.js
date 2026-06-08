const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,

  role:{
    type:String,
    enum:["candidate","employer"]
  },

  resume:String
});

module.exports = mongoose.model("User",userSchema);