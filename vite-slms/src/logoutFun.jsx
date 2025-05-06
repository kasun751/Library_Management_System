import axios from "axios";

export async function logoutFun() {
    try {
        const sessionID = localStorage.getItem('session_id');
        const res = await axios.delete(`http://localhost:80/project_1/UserLogin/controllers/LibraryUserLoginController.php?s=${sessionID}`);
        console.log(res.data.userID);
      } catch (error) {
        console.error("logout error:", error);
      }
    localStorage.removeItem('userID');
    localStorage.removeItem('session_id');
    localStorage.removeItem('birthday');
    sessionStorage.setItem('hasReloaded', 'false');

}
