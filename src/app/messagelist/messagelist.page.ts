import { Component, OnInit } from "@angular/core";
import { NewUserService } from "../api/new-user.service";
import { Socket } from "ngx-socket-io";
import { gsap, Bounce } from "gsap";
import { ActivatedRoute, Router } from "@angular/router";

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
  gp = gsap;
  constructor(
    private userList: NewUserService,
    private socket: Socket,
    private router: Router
  ) {}

  notiFyaudio() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/message.mp3";
    audio.oncanplaythrough = (event) => {
      var playedPromise = audio.play();
      if (playedPromise) {
        playedPromise
          .catch((e) => {
            console.log(e);
            if (
              e.name === "NotAllowedError" ||
              e.name === "NotSupportedError"
            ) {
              console.log(e.name);
            }
          })
          .then(() => {
            console.log("playing sound !!!");
          });
      }
    };
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
      this.notiFyaudio();
      this.msgNotiStatus = true;

      // audio.load();
      // audio.play();
      this.userName = data[0].userName;
      this.userMessage = data[0].message;
      this.userImg = data[0].userImage;
      this.gp
        .timeline({ defaults: { direction: 1 } })
        .to(".app-notyfication", { duration: 1, ease: "bounce.in", y: "-20%" })
        .then(() => {
          setTimeout(() => {
            this.msgNotiStatus = false;
          }, 7000);
        });

      // console.log(data);
    });
    // make a call
    this.socket.on("go_audio_call", (data) => {
      // going to call user
      this.router.navigateByUrl(
        `/videocall;callarId=${data.roomName};callStatus=${data.callStatus};charUserEmail=${data.fromAudioCall};callUserName=${data.callUserName};coller=receive`
      );

      // window.location.href = `videocall;callarId=${data.roomName};callStatus=${data.callStatus};charUserEmail=${data.fromAudioCall};callUserName=${data.callUserName};coller=receive`;
    });
  }
}
