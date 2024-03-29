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
  displayUser: any;
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
  // group call button status
  groupcall = true;
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
    if (this.coller === "groupCall") {
      this.videoLoding();
      diyalCall.pause();
      this.ringStatus = false;
      // console.log(apiObj);
      this.allLoadStatus = false;
      this.allButton = false;
    }

    if (this.coller === "receive") {
      this.socket.emit("screen lock", { callUser: this.chatUserEmail });
      this.videoLoding();
      this.ringStatus = false;
      // console.log(apiObj);
      this.allLoadStatus = false;
      this.allButton = false;
      console.log("receive click");
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
    this.allBtnTogle = !this.allBtnTogle;
    if (this.allBtnTogle) {
      console.log(this.allBtnTogle);
      gsap.to(".call-audio-video-button", { duration: 1, opacity: 1 });
      gsap.to(".video-footer", { duration: 1, opacity: 1 });
    } else {
      console.log(this.allBtnTogle);
      gsap.to(".call-audio-video-button", { opacity: 0, duration: 1 });
      gsap.to(".video-footer", { opacity: 0, duration: 1 });
    }
    // console.log(this.allBtnTogle);
  }

  // group close and on button
  groupClose(status) {
    if (status === "close") {
      this.groupcall = true;
      gsap.to(".app-group-call", { opacity: 0, duration: 1 });
      this.socket.on("show user", (data) => {
        this.displayUser = data;
      });
    }
    if (status === "open") {
      this.groupcall = false;
      gsap.to(".app-group-call", { opacity: 1, duration: 1 });
      this.socket.on("show user", (data) => {
        this.displayUser = data;
      });
    }
  }

  // make a group call
  makeGroupCall(user) {
    this.socket.emit("userAudioCall", {
      callUser: user.email,
      currentUser: this.curreUserName,
      curentUserEmail: this.curentUserEmail,
      roomName: this.roomName,
      callStatus: this.goCallStatus,
      coller: "groupCall",
    });
    this.callDisplayStatus = "Colling...";
    // this.allLoadStatus = false;
    this.allButton = false;
    audio.play();
  }
  ngOnInit() {
    if (this.coller === "call") {
      this.socket.emit("userAudioCall", {
        callUser: this.chatUserEmail,
        currentUser: this.curreUserName,
        curentUserEmail: this.curentUserEmail,
        roomName: this.roomName,
        callStatus: this.goCallStatus,
        coller: "receive",
      });
      this.callDisplayStatus = "Colling...";
      // this.allLoadStatus = false;
      this.allButton = false;
      audio.play();
    }
    if (this.coller === "groupCall") {
      diyalCall.play();
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
