import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ActivatedRoute, Router } from "@angular/router";
import { NewUserService } from "../api/new-user.service";
@Component({
  selector: "app-conversation",
  templateUrl: "./conversation.page.html",
  styleUrls: ["./conversation.page.scss"],
})
export class ConversationPage implements OnInit {
  chatUserEmail: string;
  userSocket: string;
  userMessage: string;
  curentUserEmail: string;
  displayMessage = [
    {
      message: "Wellcome to out eshosto",
      receiveUser: "admin@gmail.com",
      position: "left",
    },
  ];
  sendCurrentUser: any;
  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private userList: NewUserService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((param) => {
      console.log(param.get("email"));
      console.log(param.get("userId"));
      this.chatUserEmail = param.get("email");
      this.userSocket = param.get("userId");
    });

    // current user list

    let user = this.userList.returnUser()["userData"][0];
    this.curentUserEmail = user.email;
  }
  //***********************************************************************
  //********************* function ****************************************
  //***********************************************************************

  userMessageEvent() {
    this.sendSound();
    console.log(this.userMessage);
    this.socket.emit("private_message", {
      sentUse: this.chatUserEmail,
      // receiveUser: this.curentUserEmail,
      userImage: "",
      message: this.userMessage,
      position: "left",
    });
    this.displayMessage.push({
      message: this.userMessage,
      receiveUser: this.curentUserEmail,
      position: "right",
    });

    this.userMessage = "";
  }
  //***********************************************************************
  //********************* function ****************************************
  //***********************************************************************
  sendSound() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/send.mp3";
    audio.load();
    audio.play();
  }

  receiveSound() {
    let audio = new Audio();
    audio.src = "../../../assets/mp3/receive.mp3";
    audio.load();
    audio.play();
  }
  ngOnInit() {
    this.socket.on("private_message_dispaly", (data) => {
      console.log(data);

      this.displayMessage = [
        ...this.displayMessage,
        // ...this.msfuncDisplay(),
        ...data,
      ];

      console.log(this.displayMessage);

      // this.displayUser = data;
      this.receiveSound();
    });
    // audio call for go
    this.socket.on("go_audio_call", (data) => {
      this.router.navigateByUrl(
        `audiocall/${data.fromAudioCall}/${data.callUserName}/${data.receveUser}`
      );
    });
  }
}
