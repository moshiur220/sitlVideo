const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// app.use(express.static("public"));
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("this is test api");
});

let userArr = [
  {
    userName: "admin",
    email: "some@gmail.com",
    userImage: null,
    userId: "kSnOkHaqai6EbfSEAAAB",
    status: true,
  },
];
// remove user
function removeUser(emails) {
  return new Promise((resolve, reject) => {
    resolve(userArr.filter((user) => user.email !== emails)); // Call callBack
  });
}
// add user
function addUser(newuserArr) {
  return new Promise((resolve, reject) => {
    resolve([newuserArr, ...userArr]); // Call callBack
  });
}
// user status change
function changeStatus(newuserArr, id) {
  return new Promise((resolve, reject) => {
    resolve(newuserArr.filter((user) => user.userId === id)); // Call callBack
  });
}

// user current status
function currentStatus(user, id) {
  return new Promise((resolve, reject) => {
    resolve([
      {
        userName: user.userName,
        email: user.email,
        userImage: user.userImage,
        userId: id,
        status: false,
      },
    ]); // Call callBack
  });
}
//********************* Fiend socket id **************************************

function privateSocketId(newuserArr, email) {
  return new Promise((resolve, reject) => {
    if (email) {
      resolve(newuserArr.filter((user) => user.email === email)); // Call callBack
    } else {
      reject("email not found");
    }
  });
}

//********************* socket connections **************************************
//******************************************************************************
io.on("connection", (socket) => {
  console.log("a user connected");
  // a new user connect event
  socket.on("a new user", async (data) => {
    // remove user
    try {
      userArr = await removeUser(data.email);
    } catch (error) {
      console.log(`Connections user Remove ${error}`);
    }

    // add new user
    try {
      userArr = await addUser({
        userName: data.userName,
        email: data.email,
        userImage: data.userImage,
        userId: socket.id,
        status: true,
      });
    } catch (error) {
      console.log(`Add user status ${error}`);
    }

    io.emit("show user", userArr);
  });
  console.log(socket.id);
  socket.emit("chat message", "This is test message");

  //********************* */ this is message aria *********************************
  //********************* */ this event for private chat message aria *************
  socket.on("private_message", async (data) => {
    console.log(data);
    let user;
    try {
      user = await privateSocketId(userArr, data.sentUse);
    } catch (error) {
      console.log(`Private user id Problem : ${error}`);
    }
    // sending to individual socketid (private message)
    socket.to(user[0].userId).emit("private_message_dispaly", [
      {
        receiveUser: data.sentUse,
        message: data.message,
        userImage: user[0].userImage,
        position: data.position,
        userName: user[0].userName,
      },
    ]);
    console.log(user);
  });

  //********************* */ this is audio call aria *********************************
  //********************* */ this event for private audion call aria *************
  socket.on("userAudioCall", async (data) => {
    console.log("audio call");
    console.log(data);
    let user;
    try {
      user = await privateSocketId(userArr, data.callUser);
      console.log(data);
      io.to(user[0].userId).emit("go_audio_call", {
        fromAudioCall: data.curentUserEmail,
        callUserName: data.currentUser,
        roomName: data.roomName,
        callStatus: data.callStatus,
        coller: data.coller,
      });
    } catch (error) {
      console.log(`User Call private user id fiend ${error}`);
    }
  });
  //********************* */ call screen unlock *************
  socket.on("screen lock", async (data) => {
    console.log("screen lock");
    console.log(data);
    let user;
    try {
      user = await privateSocketId(userArr, data.callUser);
    } catch (error) {
      console.log(`Screen lock Event private socket Id :${error}`);
    }
    console.log("fiend user id");
    console.log(user);
    io.to(user[0].userId).emit("call screen unlock", {
      callUser: data.callUser,
    });
  });
  //********************* */ this is audio call aria *********************************
  //********************* */ go return call messanger  *******************************

  socket.on("return_call", async (data) => {
    let user;
    try {
      user = await privateSocketId(userArr, data.callUser);
    } catch (error) {
      console.log(`Return Call Fiend Private socket Id : ${error}`);
    }
    socket.to(user[0].userId).emit("receive_all_call", data);
  });

  //*********************** / go disconnect *********************************************
  //*********************** / go disconnect *********************************************
  socket.on("disconnect", async () => {
    let user;
    try {
      user = await changeStatus(userArr, socket.id);
    } catch (error) {
      console.log(`User status chang erro ${error}`);
    }
    // remove user
    try {
      userArr = await removeUser(user[0].email);
    } catch (error) {
      console.log(`Remove user Error ${error}`);
    }

    // fiend carent user status
    try {
      user = await currentStatus(user[0], socket.id);
    } catch (error) {
      console.log(`Fiend current user status ${error}`);
    }

    userArr = [...userArr, ...user];

    console.log(userArr);

    io.emit("show user", userArr);
    // console.log(changeStatus);
    console.log("a user disconnect");
  });
});

http.listen(port, () => {
  console.log("listening on *:3000");
});

// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();
