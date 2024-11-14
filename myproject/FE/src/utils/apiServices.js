
import axios from "./axious.Customize";


const DoingRegister = (email, name, password) => {
    const URL_REGISTER = '/v1/api/register';
    const data = { email, name, password };
    return axios.post(URL_REGISTER, data);
};
const DoingLogin = (email ,password) => {
    const URL_LOGIN = '/v1/api/logins';
    const data = { email, password };
   return axios.post(URL_LOGIN, data);
}
const getAllUser = () => {
    const URL_GET_USER = '/v1/api/GetAllUser';
   return axios.get(URL_GET_USER);
}
const getAllProfile = (id) => {
    const URL_GET_PROFILE = `/v1/api//GetAllProfile/${id}`;
    return axios.get(URL_GET_PROFILE);
}
const getProvinces = () => {
    const URL_GET_PROVINCES = "https://vapi.vnappmob.com/api/province/";
    return axios.get(URL_GET_PROVINCES);
}
const getDistrict = (provincesId) => {
    const URL_GET_DISTRICT = `https://vapi.vnappmob.com/api/province/district/${provincesId}`;
    return axios.get(URL_GET_DISTRICT);
}
const getWard = (districtId) => {
    const URL_GET_WARD = `https://vapi.vnappmob.com/api/province/ward/${districtId}`;
    return axios.get(URL_GET_WARD);
}
const PostCreateProfile = (accountId,photo,name,Position,Birth,Gender,PhoneNumber,Email,Address,colorSide,colorText,isPublic,experience,education,skill) => {
  //submit data
  const data = {
    accountId,photo,name,Position,Birth,Gender,PhoneNumber,Email,Address,colorSide,colorText,isPublic,experience,education,skill
  }
     const URL_POST_PROFILE= "/v1/api/postProfile";
  return axios.post(URL_POST_PROFILE, data);
};
const DeleteProfile = (IdDelete)=> {
const URL_DELETE_PROFILE = `/v1/api//DeleteProfile/${IdDelete}`;
return axios.delete(URL_DELETE_PROFILE);
}
const PostUploadImage = (selectedFile) => {
    const formData = new FormData();
    formData.append('img', selectedFile);
    const URL_UPLOAD_IMG = '/v1/api/Upload';
    return axios.post(URL_UPLOAD_IMG,formData);
}
export { DeleteProfile, DoingRegister,DoingLogin,getAllUser,getAllProfile,getProvinces,getDistrict,getWard,PostCreateProfile,PostUploadImage};