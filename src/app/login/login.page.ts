import { Component, OnInit } from "@angular/core";
import { NewUserService } from "../api/new-user.service";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private user: NewUserService,
    public toastController: ToastController,
    private router: Router
  ) {}
  loginUser(userData) {
    // console.log(user.value);
    this.user.userLogin(userData.value).subscribe(async (data) => {
      console.log(data);
      if (data["status"]) {
        this.user.setUset({ userData: data["userData"], status: true });
        this.router.navigate(["messagelist"]);
      } else {
        const toast = await this.toastController.create({
          message: "Please enter valid email and password ",
          duration: 2000,
        });
        toast.present();
      }
    });
  }

  // test function

  ngOnInit() {}
}
