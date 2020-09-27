import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ActivatedRoute, Router } from "@angular/router";
import { NewUserService } from "../api/new-user.service";
import { MysocketService } from "../api/mysocket.service";
import { v4 as uuidv4 } from "uuid";
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
  callarId: string;
  displayMessage = [
    {
      message: "Wellcome to out eshosto",
      receiveUser: "admin@gmail.com",
      position: "left",
    },
  ];
  sendCurrentUser: any;
  toggled: boolean = false;
  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private userList: NewUserService,
    private router: Router,
    private sService: MysocketService
  ) {
    this.route.paramMap.subscribe((param) => {
      // console.log(param.get("email"));
      // console.log(param.get("userId"));
      this.chatUserEmail = param.get("email");
      this.userSocket = param.get("userId");
    });

    // current user list

    let user = this.userList.returnUser()["userData"][0];
    this.curentUserEmail = user.email;
    this.callarId = uuidv4();
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

  //********************* make a call ****************************************
  makeCall(callStatus) {
    // window.location.href = `videocall;callarId=${this.callarId};callStatus=${callStatus};charUserEmail=${this.chatUserEmail};callUserName=${this.userSocket};coller=call`;
    // this.router.navigateByUrl('/product;name=Mango;price=400');
    this.router.navigateByUrl(
      `/videocall;callarId=${this.callarId};callStatus=${callStatus};charUserEmail=${this.chatUserEmail};callUserName=${this.userSocket};coller=call`
    );
  }
  handleSelection(event) {
    this.userMessage += event.char;
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
      // going to call user
      this.router.navigateByUrl(
        `/videocall;callarId=${data.roomName};callStatus=${data.callStatus};charUserEmail=${data.fromAudioCall};callUserName=${data.callUserName};coller=${data.coller}`
      );

      // window.location.href = `videocall;callarId=${data.roomName};callStatus=${data.callStatus};charUserEmail=${data.fromAudioCall};callUserName=${data.callUserName};coller=receive`;
    });

    // function make a call
  }
}
