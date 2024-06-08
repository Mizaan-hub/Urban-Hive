import { Server, Socket } from "socket.io";

const io = new Server({
  cors:{
    origin:"http://localhost:6969",
  }
})

io.on("connection", (socket) => {
  console.log(socket);
})

io.listen("8008")
