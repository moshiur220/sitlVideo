import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "./setting";
// import "../sitlvendor/external_api";
// declare var JitsiMeetExternalAPI: any;
@Injectable({
  providedIn: "root",
})
export class NewUserService {
  constructor(private http: HttpClient) {}

  registration(userData) {
    return this.http.post(`${url}/newuser.php`, userData);
  }

  userLogin(userData) {
    return this.http.post(`${url}/userlogin.php`, userData);
  }

  getAllUser() {
    return this.http.get(`${url}/getAlluser.php`);
  }

  // ===================== user local storage aria ===============================
  setUset(user) {
    localStorage.setItem("login", JSON.stringify(user));
  }

  checkUser() {
    return JSON.parse(localStorage.getItem("login")) || { status: false };
  }

  deleteUser() {
    localStorage.removeItem("login");
  }
  returnUser() {
    return JSON.parse(localStorage.getItem("login"));
  }
}
