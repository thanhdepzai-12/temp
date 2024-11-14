const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  experience: String,
});
const educationSchema = new mongoose.Schema({
  education: String,
});
const skillSchema = new mongoose.Schema({
  skill: String,
});
const cvFormSchema = new mongoose.Schema(
  {
    pId: String,
    photo: String,
    name: String,
    Position: String,
    Birth: String,
    Gender: String,
    PhoneNumber: Number,
    Email: String,
    Address: String,
    colorSide:String,
    colorText:String,
    isPublic: Boolean,
    experience: [experienceSchema],
    education: [educationSchema],
    skill: [skillSchema],
  },
  { timestamps: true }
);

const Profile = mongoose.model("profiles", cvFormSchema);
module.exports = Profile;
