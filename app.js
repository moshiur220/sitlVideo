const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
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
// socket connections
io.on("connection", (socket) => {
  console.log("a user connected");
  // a new user connect event
  socket.on("a new user", async (data) => {
    userArr = await removeUser(data.email);
    userArr = await addUser({
      userName: data.userName,
      email: data.email,
      userImage: data.userImage,
      userId: socket.id,
      status: true,
    });

    io.emit("show user", userArr);
  });
  console.log(socket.id);
  socket.emit("chat message", "This is test message");
  /// disconnect user
  socket.on("disconnect", async () => {
    let user = await changeStatus(userArr, socket.id);
    userArr = await removeUser(user[0].email);
    user = await currentStatus(user[0], socket.id);
    userArr = [...userArr, ...user];

    console.log(userArr);
    io.emit("show user", userArr);
    // console.log(changeStatus);
    console.log("a user disconnect");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
