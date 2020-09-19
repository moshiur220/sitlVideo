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
}
