import { Component, OnInit } from "@angular/core";
import { NewUserService } from "../api/new-user.service";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  constructor(
    private user: NewUserService,
    public toastController: ToastController,
    private router: Router
  ) {}
  createUser(form) {
    // console.log(form.value);

    this.user.registration(form.value).subscribe(async (data) => {
      // console.log(data);
      if (data["status"]) {
        const toast = await this.toastController.create({
          message: "Account Created successfully.",
          duration: 2000,
        });
        toast.present();
        this.router.navigate(["login"]);
      } else {
        const toast = await this.toastController.create({
          message: "This email address already has a account.",
          duration: 2000,
        });
        toast.present();
      }
    });
  }

  ngOnInit() {}
}
