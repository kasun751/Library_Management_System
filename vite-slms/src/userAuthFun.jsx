
import axios from "axios";

export async function userAuthFun(navigate) {
  try {
    const sessionID = localStorage.getItem('session_id');
    const uid = localStorage.getItem('userID');
    const res = await axios.get(`http://localhost:80/project_1/UserLogin/controllers/LibraryUserLoginController.php?s=${sessionID}`);
    
    if (res.data.userID != uid || res.data.userID === undefined) {
      navigate('/login'); // Redirect if user ID does not match
    }
  } catch (error) {
    console.error("Authentication error:", error);
    navigate('/login'); // Redirect on error
  }
}
export async function userAuthFunDashboard() {
  try {
    const sessionID = localStorage.getItem('session_id');
    const uid = localStorage.getItem('userID');
    const res = await axios.get(`http://localhost:80/project_1/UserLogin/controllers/LibraryUserLoginController.php?s=${sessionID}`);
    
    if (res.data.userID != uid || res.data.userID === undefined) {
      return false;
    }else{
      return true;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}

export function getUserType(){
  const userID = localStorage.getItem('userID');
  let user_type = "guest";
  if(userID){let userTypeCode = userID.split('/')[1];
  if(userTypeCode == "REG"){
    user_type = "reg";
  }else if(userTypeCode == "ADM"){
    user_type = "staff";
  }else if(userTypeCode == "LIB"){
    user_type = "staff";
  }else if(userTypeCode == "LAR"){
    user_type = "staff"
  }else if(userTypeCode == "LIA"){
    user_type = "staff"
  }}
  return user_type;
}

export function getUserID(){
  let uid = "";
  uid = localStorage.getItem('userID');
  return uid;
}

export function getAgeCategory(){
 const birthday = localStorage.getItem('birthday');
 let cate = "kid";
 if(birthday){const birthYear = parseInt(birthday.split('-')[0]);
  const currentYear = new Date().getFullYear();
  cate = (currentYear - birthYear) >= 18 ? "adult" : "kid";}
  return cate;
}

export function isLibrarian(){
  const userID = localStorage.getItem('userID');
  let userTypeCode="";
  if(userID){userTypeCode = userID.split('/')[1];}

  if(userTypeCode == "LIB"){
    return true;
  }
  return false;
}

export function isAdmin(){
  const userID = localStorage.getItem('userID');
  let userTypeCode="";
  if(userID){userTypeCode = userID.split('/')[1];}

  if(userTypeCode == "ADM"){
    return true;
  }
  return false;
}

export async function isGuest(){
  const sessionID = localStorage.getItem('session_id');
  const uid = localStorage.getItem('userID');
  let res;
  if(sessionID != null && uid != null){
    try{ res = await axios.get(`http://localhost:80/project_1/UserLogin/controllers/LibraryUserLoginController.php?s=${sessionID}`);}
    catch{

    }finally{
      if (res.data.userID != uid || res.data.userID === undefined || uid==null) {
        return true;
      }
      else{
        return false;
      }
    }
    
  }else{
    return true
  }
}

export function reloadApp(){
  window.location.reload();
}