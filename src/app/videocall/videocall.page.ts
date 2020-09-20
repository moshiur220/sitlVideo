import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import "../sitlvendor/external_api";
import { NewUserService } from "../api/new-user.service";
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: "app-videocall",
  templateUrl: "./videocall.page.html",
  styleUrls: ["./videocall.page.scss"],
})
export class VideocallPage implements OnInit {
  apiObj: any;
  roomName: string;
  userName: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userList: NewUserService
  ) {
    this.route.paramMap.subscribe((param) => {
      this.roomName = param.get("callId");
    });
    // login user info
    let user = this.userList.returnUser()["userData"][0];
    console.log(user);
    this.userName = user.userName;
  }
  // where is functions loding

  videoLoding() {
    const domain = "mycall.sitlbd.com";
    const options = {
      roomName: this.roomName,
      width: "100%",
      height: "100%",
      parentNode: document.querySelector(".wrapper"),
      DEFAULT_REMOTE_DISPLAY_NAME: "Sitl Default user",
      userInfo: {
        displayName: this.userName,
      },
      configOverwrite: {
        doNotStoreRoom: true,
        startVideoMuted: 0,
        startWithVideoMuted: false,
        startWithAudioMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableRemoteMute: true,
        remoteVideoMenu: {
          disableKick: true,
        },
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_REMOTE_DISPLAY_NAME: "New User",
        TOOLBAR_BUTTONS: [],
      },
      onload: function () {
        //alert('loaded');
        // $('#joinMsg').hide();
        // $('#container').show();
        // $('#toolbox').show();
        console.log("loding");
      },
    };
    this.apiObj = new JitsiMeetExternalAPI(domain, options);
    // user avater image url
    this.apiObj.executeCommand(
      "avatarUrl",
      "https://www.sitlbd.com/wp-content/uploads/2018/02/sitl_or.png"
    );
    this.apiObj.addEventListeners({
      readyToClose: function () {
        this.router.navigate(["/messagelist"]);
      },
    });
  }

  // hangup() functions

  hangup() {
    console.log(this.apiObj);
    // this.videoLoding();
    // this.apiObj.executeCommand("hangup");
  }
  ngOnInit() {
    this.videoLoding();
  }
  ngAfterViewInit(): void {
    // this.videoLoding();
    // this.videoLoding();
  }
}
