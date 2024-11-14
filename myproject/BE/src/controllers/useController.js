
const {
  createUserService,
  createAccountService,
  getUser,
  createPostProfile,
  getAllProfile,
  deleteProfile,
  updateProfile
} = require("../services/userService");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};
const createAccountLogin = async (req, res) => {
  const { email, password } = req.body;
  const datas = await createAccountService(email, password);
  return res.status(200).json(datas);
};
const HanldeGetUsers = async (req, res) => {
  const datas = await getUser();
  return res.status(200).json(datas);
};
const handleCreateProfile = async (req, res) => {
  const {
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
    experience,
    education,
    skill,
  } = req.body;
  const data = await createPostProfile(
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
    experience,
    education,
    skill
  );
  return res.status(200).json(data);
};
const hanldeGetProfile = async (req, res) => {
  const datas = await getAllProfile(req.params.id);
  return res.status(200).json(datas);
};
const handleUploadImg = async (req, res) => {
  try {
    const link_img = await req.files["img"][0].path; // Lấy URL của ảnh
    return res.status(200).json({ url: link_img });
  } catch (error) {
    return res.status(400).json({ message: "Upload failed", error });
  }
};
const hanldeDeleteProfile = async(req,res)=> {
  const deleteData = await deleteProfile(req.params.id);
  return res.status(200).json(deleteData);
}
const hanldeUpdateProfile = async(req,res)=> {
  const  {
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
    experience,
    education,
    skill,
  } = req.body;
  const updateResult = await updateProfile(req.params.id, {
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
    experience,
    education,
    skill
  });

  return res.status(200).json(updateResult);
}
module.exports = {
  hanldeDeleteProfile,
  createUser,
  createAccountLogin,
  HanldeGetUsers,
  handleCreateProfile,
  hanldeGetProfile,
  handleUploadImg,
  hanldeUpdateProfile
};
