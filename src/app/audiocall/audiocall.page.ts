import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { NewUserService } from "../api/new-user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MysocketService } from "../api/mysocket.service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-audiocall",
  templateUrl: "./audiocall.page.html",
  styleUrls: ["./audiocall.page.scss"],
})
export class AudiocallPage implements OnInit {
  chatUserEmail: string;
  userSocket: string;
  curreUserName: string;
  curentUserEmail: string;
  callRiongTime = 24000;
  callReciveStatus: string;
  callStatus = "video";
  callarId: string;
  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private userList: NewUserService,
    private sService: MysocketService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((param) => {
      // this.callarId = uuidv4();
      this.chatUserEmail = param.get("email");
      this.userSocket = param.get("userName");
      this.callarId = uuidv4();
    });

    let user = this.userList.returnUser()["userData"][0];
    this.curreUserName = user.userName;
    this.curentUserEmail = user.email;
  }

  receivePlayAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/0r.mp3";
    audio.load();
    audio.play();
    //https://www.w3schools.com/JSREF/met_audio_pause.asp
    //https://codetogo.io/how-to-stop-audio-in-javascript/
  }

  callPlayAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/0c.mp3";
    audio.load();
    audio.play();
  }

  ngOnInit() {
    console.log(this.sService.callAudio);
    this.socket.emit("userAudioCall", {
      callUser: this.chatUserEmail,
      currentUser: this.curreUserName,
      curentUserEmail: this.curentUserEmail,
    });

    // video call receive for all
    this.socket.on("receive_all_call", (data) => {
      // this.router.navigate(["/messagelist"]);
      //console.log("working....");
      // this.router.navigateByUrl(`videocall/${data.callarId}`);
      window.location.href = `videocall/${this.callarId}`;
    });

    // this.playAudio();
    // This condi tion for receive caller and make a call

    if (this.sService.callAudio) {
      this.callReciveStatus = "Calling...";
      this.callPlayAudio();
    } else {
      this.receivePlayAudio();
      this.callReciveStatus = "Receive...";
    }

    // goto message list
    setTimeout(() => {
      //this.router.navigate(["/messagelist"]);
    }, this.callRiongTime);
  }

  // call receive button click
  callReceive() {
    if (!this.sService.callAudio) {
      console.log("click");

      this.socket.emit("return_call", {
        callUser: this.chatUserEmail,
        curentUserEmail: this.curentUserEmail,
        currentUser: this.curreUserName,
        callStatus: this.callStatus,
        callarId: this.callarId,
      });
      // this.router.navigate(["/videocall"]);
      // this.router.navigateByUrl(`videocall/${this.callarId}`);
      window.location.href = `videocall/${this.callarId}`;
    }
  }

  // socket call go video messanger

  // go call user
}
