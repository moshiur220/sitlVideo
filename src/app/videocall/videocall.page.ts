import { Component, OnInit } from "@angular/core";
import "../sitlvendor/external_api";
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: "app-videocall",
  templateUrl: "./videocall.page.html",
  styleUrls: ["./videocall.page.scss"],
})
export class VideocallPage implements OnInit {
  apiObj: any;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    const domain = "mycall.sitlbd.com";
    const options = {
      roomName: "JitsiMeetAPIExample123",
      width: "100%",
      height: "100%",
      parentNode: document.querySelector(".wrapper"),
    };
    this.apiObj = new JitsiMeetExternalAPI(domain, options);
  }
}
