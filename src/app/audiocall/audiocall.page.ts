import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { NewUserService } from "../api/new-user.service";
import { ActivatedRoute } from "@angular/router";
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
  callRing: string;
  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private userList: NewUserService
  ) {
    this.route.paramMap.subscribe((param) => {
      this.chatUserEmail = param.get("email");
      this.userSocket = param.get("userName");
      this.callRing = param.get("ring");
    });

    let user = this.userList.returnUser()["userData"][0];
    this.curreUserName = user.userName;
    this.curentUserEmail = user.email;
  }

  //  callUserInfo(){
  //   return new Promise((resolve, reject) => {
  //     resolve(

  //     ); // Call callBack
  //   })
  //  }
  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/quest.mp3";
    audio.load();
    audio.play();
  }

  ngOnInit() {
    this.socket.emit("userAudioCall", {
      callUser: this.chatUserEmail,
      currentUser: this.curreUserName,
      curentUserEmail: this.curentUserEmail,
    });

    if (this.callRing === "receveUser") {
      this.playAudio();
    }
  }
}
