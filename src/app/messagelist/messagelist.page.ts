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
  constructor(private userList: NewUserService, private socket: Socket) {}
  ngOnInit() {
    let user = this.userList.returnUser()["userData"][0];
    //
    // Sample chat options
    this.socket.on("chat message", (data) => {
      console.log(data);
    });
    // When connect new user in socket
    this.socket.emit("a new user", {
      userName: user.userName,
      email: user.email,
      userImage: user.userImage,
    });
    // whent disconnect and connect user in socket
    this.socket.on("show user", (data) => {
      this.displayUser = data;
    });
  }
}
