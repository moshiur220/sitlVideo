import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Socket } from "ngx-socket-io";
import "../sitlvendor/external_api";
import { NewUserService } from "../api/new-user.service";
import { chatDomain } from "../api/setting";
import { MysocketService } from "../api/mysocket.service";
import { gsap, Bounce } from "gsap";
declare var JitsiMeetExternalAPI: any;
var apiObj = null;

// receive call
var audio = new Audio();
audio.src = "../../../assets/mp3/0c.mp3";
// dayling call
var diyalCall = new Audio();
diyalCall.src = "../../../assets/mp3/0r.mp3";

@Component({
  selector: "app-videocall",
  templateUrl: "./videocall.page.html",
  styleUrls: ["./videocall.page.scss"],
})
export class VideocallPage implements OnInit {
  // apiObj: any;

  roomName: string;
  curreUserName: string;
  callerUser: string;
  callStatus: boolean;
  callReceiveStatus = false;
  goCallStatus: string;
  coller: string;
  chatUserEmail: string;
  curentUserEmail: string;
  allLoadStatus = true;
  // display call status
  callDisplayStatus = "Receive call";
  // call receive and call ring
  callAudio: any;
  callReceiveAudio: any;
  ringStatus = true;
  // loding tool box button
  allButton = true;
  allBtnTogle = true;
  constructor(
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute,
    private userList: NewUserService,
    private videoSetting: MysocketService
  ) {
    this.route.paramMap.subscribe((param) => {
      this.roomName = param.get("callarId");
      this.callerUser = param.get("callUserName");
      this.goCallStatus = param.get("callStatus");
      this.coller = param.get("coller");
      this.chatUserEmail = param.get("charUserEmail");
      if (param.get("callStatus") === "video") {
        this.callStatus = false;
      } else {
        this.callStatus = true;
      }
    });
    // login user info
    let user = this.userList.returnUser()["userData"][0];
    // console.log(user);
    this.curreUserName = user.userName;
    this.curentUserEmail = user.email;

    // call receive and call change audio
  }
  // where is functions loding

  videoLoding() {
    apiObj = new JitsiMeetExternalAPI(
      chatDomain,
      this.videoSetting.videoCallConfig(
        this.roomName,
        this.curreUserName,
        this.callStatus
      )
    );
    // user avater image url
    apiObj.executeCommand(
      "avatarUrl",
      "https://www.sitlbd.com/wp-content/uploads/2018/02/sitl_or.png"
    );

    this.allToos();
  }

  // hangup() functions

  receiveCall() {
    this.socket.emit("screen lock", { callUser: this.chatUserEmail });
    this.videoLoding();
    this.ringStatus = false;
    // console.log(apiObj);
    this.allLoadStatus = false;
    this.allButton = false;
    console.log("receive click");

    if (this.coller === "receive") {
      diyalCall.pause();
      console.log("call receive pause......");
    }
    if (this.coller === "call") {
      audio.pause();
      console.log("call pause......");
    }

    // socket event
  }

  // call close button
  callClose() {
    diyalCall.pause();
    this.router.navigate(["/messagelist"]);
  }
  allToos() {
    // video camera
    //toolbarBtn
    document.querySelector(".takae-phot").addEventListener("click", (e) => {
      console.log(apiObj);
    });

    //toolbarBtn
    document.querySelector(".video-btn").addEventListener("click", () => {
      apiObj.executeCommand("toggleVideo");
    });

    // audio spicker
    document.querySelector(".audio-btn").addEventListener("click", () => {
      apiObj.executeCommand("toggleAudio");
    });
    // enable chat
    document.querySelector(".enable-chat").addEventListener("click", () => {
      apiObj.executeCommand("toggleChat");
    });

    // tile view
    document
      .querySelector(".video-switch-btn")
      .addEventListener("click", () => {
        apiObj.executeCommand("toggleTileView");
      });
  }
  // ================== rintone ==================

  callPlayAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/0c.mp3";
    // audio.load();
    // audio.play();
    return audio;
  }

  // video call toggole button
  clicktogoleBtn() {
    let ell = gsap.timeline({ defaults: { direction: 1 } });
    let ell2 = gsap.timeline({ defaults: { direction: 1 } });
    this.allBtnTogle = !this.allBtnTogle;
    if (this.allBtnTogle) {
      console.log(this.allBtnTogle);

      ell.to(".call-audio-video-button", {
        duration: 1,
        ease: "none",
        x: 500,
      });
      ell2.to(".video-footer", { duration: 1, ease: "none", y: 500 });
    } else {
      console.log(this.allBtnTogle);
      ell.from(".call-audio-video-button", {
        duration: 1,
        ease: "bounce.in",
        x: "-100%",
      });
      ell2.from(".video-footer", {
        duration: 1,
        ease: "bounce.in",
        y: "-100%",
      });
    }
    // console.log(this.allBtnTogle);
  }
  ngOnInit() {
    // console.log(this.callReceiveStatus);

    if (this.coller === "call") {
      this.socket.emit("userAudioCall", {
        callUser: this.chatUserEmail,
        currentUser: this.curreUserName,
        curentUserEmail: this.curentUserEmail,
        roomName: this.roomName,
        callStatus: this.goCallStatus,
      });
      this.callDisplayStatus = "Colling...";
      // this.allLoadStatus = false;
      this.allButton = false;
      audio.play();
    }
    if (this.coller === "receive") {
      diyalCall.play();
    }

    // user call screen unlock
    this.socket.on("call screen unlock", (data) => {
      console.log("screen - unlock here");
      console.log(data);
      this.videoLoding();
      this.ringStatus = false;
      // console.log(apiObj);
      this.allLoadStatus = false;
      this.allButton = false;
      if (this.coller === "call") {
        audio.pause();
        console.log("call pause......");
      }
    });
  }
  ngAfterViewInit(): void {
    console.log("after init loding");
  }
}
