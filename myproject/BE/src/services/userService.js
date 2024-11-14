require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profileCv");
const saltRounds = 10;
const createUserService = async (name, email, password) => {
  try {
    const userSameEmail = await User.findOne({ email });
    if (userSameEmail) {
      return {
        EC: 1,
        EM: "Email is Available, Please Rename your Email !",
      };
    } else {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      let result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        role: "hoidanit",
      });
      return {
        result,
        EC: 0,
        EM: "Create User Success",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const createAccountService = async (email1, password) => {
  try {
    const user = await User.findOne({ email: email1 });
    if (user) {
      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching) {
        return {
          EC: 2,
          EM: "Email or Password was wrong",
        };
      } else {
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          EM: "Login success",
          access_token,
          data: {
            email: user.email,
            name: user.name,
            id:user.id,
          },
        };
        //access_token
      }
    } else {
      return {
        EC: 1,
        EM: "Email or Password invalid",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};


const createPostProfile = async (
  accountId,
  photo,
  name,
  Position,
  Birth,
  Gender,
  PhoneNumber,
  Email,
  Address,
  colorSide,
  colorText,
  isPublic,
  experience=[],
  education=[],
  skill=[],
) => {
  try {
    let resultes = await Profile.create({
      pId: accountId,
      photo: photo,
      name: name,
      Position: Position,
      Birth: Birth,
      Gender: Gender,
      PhoneNumber: PhoneNumber,
      Email: Email,
      Address: Address,
      colorSide:colorSide,
      colorText:colorText,
      isPublic: isPublic,
      experience: experience,
      education: education,
      skill: skill,
    });
    return {
      profilecv: resultes,
      EC: 0,
      EM: "Create profile success",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      EM: "Some details were left",
    };
  }
};

const getUser = async () => {
  try {
    const user = await User.find({}).select("-password");
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getAllProfile = async (id) => {
  try {
    const profile = await Profile.find({pId:id});
    return {
      profile,
      EC:0,
      EM:"Get All user Success"
     };
  }
  catch (error) {
    return null
  }
}
const deleteProfile = async(id)=> {
  try {
const deleteProfiles = await Profile.findByIdAndDelete(id);
if(deleteProfiles){
  return {
    EC:0,
    EM:"Delete User Success"
  };
}
  }catch (error) {
    return null
  }
}
const updateProfile = async (id, 
  {accountId,
  photo,
  name,
  Position,
  Birth,
  Gender,
  PhoneNumber,
  Email,
  Address,
  colorSide,
  colorText,
  isPublic,
  experience=[],
  education=[],
  skill=[],
  }
)=> {
  const updateProfiles = await Profile.findByIdAndUpdate(id , 
 {   pId:accountId,
    photo,
    name,
    Position,
    Birth,
    Gender,
    PhoneNumber,
    Email,
    Address,
    colorSide,
    colorText,
    isPublic,
    experience,
    education,
    skill,
 },
    { new: true, runValidators: true }
  );
  if(updateProfiles) {
    return {
      updateProfiles,
      EC:0,
      EM:"Update Successful"
    }
  }else {
    return {
      EC:-1,
      EM:"Update Failed"
    }
  }
}
module.exports = {
  updateProfile,
  deleteProfile,
  createUserService,
  createAccountService,
    getUser,
  createPostProfile,
  getAllProfile
};
