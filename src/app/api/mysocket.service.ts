import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MysocketService {
  constructor() {}

  callAudio = false;
  callVideo = true;
  callarId = "";

  // callStatus(audio = false, video = false) {
  //   return { audio, video };
  // }

  videoCallConfig(roomName, curreUserName, callStatus) {
    return {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: document.querySelector(".wrapper"),
      DEFAULT_REMOTE_DISPLAY_NAME: "Sitl Default user",
      userInfo: {
        displayName: curreUserName,
      },
      configOverwrite: {
        // doNotStoreRoom: true,
        // startVideoMuted: 0,
        startWithVideoMuted: callStatus,
        startWithAudioMuted: false,
        enableWelcomePage: false,
        // prejoinPageEnabled: false,
        // disableRemoteMute: true,
        remoteVideoMenu: {
          disableKick: false,
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
        // this.allLoadStatus = true;
        console.log("sitl loding");
        // this.callReceiveStatus = true;
      },
    };
  }
}
