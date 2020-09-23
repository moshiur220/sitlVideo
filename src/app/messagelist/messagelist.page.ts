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
  msgNotiStatus = false;
  userName: string;
  userMessage: string;
  userImg: string;
  constructor(private userList: NewUserService, private socket: Socket) {}

  notiFyaudio() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/message.mp3";
    // audio.load();
    audio.play();
  }
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

    /// tis is test call
    this.socket.on("call screen unlock", (data) => {
      console.log("screen - unlock here");
      console.log(data);
      console.log("call pause......");
    });

    // message togal
    this.socket.on("private_message_dispaly", (data) => {
      // this.notiFyaudio();
      this.msgNotiStatus = true;
      let audio = new Audio();
      audio.src = "../../../assets/mp3/message.mp3";
      // audio.load();
      audio.play();
      this.userName = data[0].userName;
      this.userMessage = data[0].message;
      this.userImg = data[0].userImage;

      console.log(data);
      setTimeout(() => {
        this.msgNotiStatus = false;
      }, 10000);
    });
  }
}
