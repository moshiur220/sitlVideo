import { Component, OnInit } from "@angular/core";
import { NewUserService } from "../api/new-user.service";
import { Socket } from "ngx-socket-io";
@Component({
  selector: "app-messagelist",
  templateUrl: "./messagelist.page.html",
  styleUrls: ["./messagelist.page.scss"],
})
export class MessagelistPage implements OnInit {
  slideOpts = {
    initialSlide: 4,
    speed: 400,
    pagination: false,
    slidesPerView: 4,
  };

  displayUser: any;
  constructor(private userList: NewUserService, private socket: Socket) {
    // this.userList.getAllUser().subscribe((user) => {
    //   this.displayUser = user;
    //   console.log(user);
    // });
  }
  ngOnInit() {
    let user = this.userList.returnUser()["userData"][0];
    //
    console.log(user);
    // userName: "hello ionic", mobile: "234555", email: "ionic@gmail.com"
    this.socket.on("chat message", (data) => {
      console.log(data);
    });

    this.socket.emit("a new user", {
      userName: user.userName,
      email: user.email,
      userImage: user.userImage,
    });

    this.socket.on("show user", (data) => {
      console.log(data);
      this.displayUser = data;
      // this.displayUser.map((us) => {
      //   console.log(us);
      // });
    });
  }
}
