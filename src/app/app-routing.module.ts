import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "conversation",
    loadChildren: () =>
      import("./conversation/conversation.module").then(
        (m) => m.ConversationPageModule
      ),
  },
  {
    path: "conversation/:email/:userId",
    loadChildren: () =>
      import("./conversation/conversation.module").then(
        (m) => m.ConversationPageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "audiocall",
    loadChildren: () =>
      import("./audiocall/audiocall.module").then((m) => m.AudiocallPageModule),
  },
  {
    path: "audiocall/:email/:userName",
    loadChildren: () =>
      import("./audiocall/audiocall.module").then((m) => m.AudiocallPageModule),
  },
  {
    path: "groupcall",
    loadChildren: () =>
      import("./groupcall/groupcall.module").then((m) => m.GroupcallPageModule),
  },
  {
    path: "videocall",
    loadChildren: () =>
      import("./videocall/videocall.module").then((m) => m.VideocallPageModule),
  },
  {
    path: "videocall/:callId",
    loadChildren: () =>
      import("./videocall/videocall.module").then((m) => m.VideocallPageModule),
  },
  {
    path: "myprofile",
    loadChildren: () =>
      import("./myprofile/myprofile.module").then((m) => m.MyprofilePageModule),
  },
  {
    path: "messagelist",
    loadChildren: () =>
      import("./messagelist/messagelist.module").then(
        (m) => m.MessagelistPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
