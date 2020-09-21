import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ContactPipe } from "./contact.pipe";
import { PreloaderPipe } from "./preloader.pipe";
import { HttpClientModule } from "@angular/common/http";

// socket module inport here
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
//http://localhost:3000/
//https://sitlchat.herokuapp.com/
const config: SocketIoConfig = {
  url: "http://localhost:3000/",
  options: {},
};
@NgModule({
  declarations: [AppComponent, ContactPipe, PreloaderPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
