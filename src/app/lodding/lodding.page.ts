import { Component, OnInit } from "@angular/core";
import { gsap, Bounce } from "gsap";
import { Router } from "@angular/router";
import { NewUserService } from "../api/new-user.service";
@Component({
  selector: "app-lodding",
  templateUrl: "./lodding.page.html",
  styleUrls: ["./lodding.page.scss"],
})
export class LoddingPage implements OnInit {
  constructor(private router: Router, private user: NewUserService) {}

  ngOnInit() {
    let ell = gsap.timeline({ defaults: { direction: 1 } });
    ell
      .from(".logo-img", { duration: 1, ease: "bounce.in", y: -500 })
      .from(".ellipse1", {
        duration: 1,
        opacity: 0,
        ease: "bounce.in",
        x: "-100%",
      })
      .from(".ellipse2", {
        duration: 1,
        opacity: 0,
        ease: "bounce.in",
        x: "100%",
      })
      .from(".ellipse3", {
        duration: 1,
        opacity: 0,
        ease: "bounce.in",
        x: "-100%",
      })
      .from(".ellipse4", {
        duration: 1,
        opacity: 0,
        ease: "bounce.in",
        x: "-100%",
      })
      .from(".ellipse5", {
        duration: 1,
        opacity: 0,
        ease: "bounce.in",
        x: "100%",
      })
      .to(".logo-img", { duration: 1, ease: "bounce.in", y: 500 })
      .then(() => {
        if (this.user.returnUser()) {
          if (this.user.returnUser().status) {
            this.router.navigate(["messagelist"]);
          }
        } else {
          this.router.navigate(["login"]);
        }
      });

    // ell.
  }
}
