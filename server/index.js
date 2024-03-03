const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer(app);

app.use(
	cors({
		origin:"*",
		credentials:true,
	})
);

const io = new Server(server, {
    cors: {origin:"http://localhost:3000",
			credentials:true,
            methods:['GET','POST']
        }
});


const {
	addUser,
	removeUser,
    rooms,
    users,
    colors,
    nameToSocketId,
    nextObject,
    colorToUser,
    winners,
} = require('./gameControllers');

console.log(rooms);

const {
    isStarted
} = require('./gameControllers');

const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
};

io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

	socket.on('joinRoom',(payload) => {
        // console.log("I1");
        console.log(payload);
        addUser(payload.username, socket.id, payload.roomId);

        const user = {socketId:socket.id, username:payload.username, roomId:payload.roomId};

        socket.join(user.roomId);    //join user's socket with roomId
        socket.emit('message', 'Welcome to the Game!');
        io.in(user.roomId).emit('names', rooms[user.roomId]);
        // console.log("I2");
    })

	socket.on('joinExistingRoom', (payload) => {
        // console.log("I3");
        if(!rooms[payload.roomId]){
            console.log("I4");
            socket.emit('message', {error:'Room does not exist'});
            return;
        }
        if(rooms[payload.roomId].length === 4){
            console.log("I5");
            socket.emit('message', {error:'Room is already full'});
            return;
        }
        if(isStarted[payload.roomId]){
            console.log("I6");
            socket.emit('message', {error:'Game has already started'});
            return;
        }
        addUser(payload.username, socket.id, payload.roomId);
        const user = {socketId:socket.id, username:payload.username, roomId:payload.roomId};

        socket.join(user.roomId);
        socket.emit('message', 'Welcome to the Game!');
        socket.to(payload.roomId).emit('userJoined',`${payload.username} has joined the chat`);
        // console.log("I6");
        return;
    })

    socket.on('waitingRoom', () => {
        let room = users[socket.id].roomId;
        io.in(room).emit('names', rooms[room]);
    })

    socket.on('GameStarted', (roomId) => {
        socket.to(roomId).emit('gameBegin',{});
        isStarted[roomId] = true;
        console.log("GS1");

        let room = roomId;
        colors[room] = ["blue", "red", "green", "yellow"];

        //helps in determining which player's turn is next
        let tempnextObject = {};
        let len = rooms[room]?.length;
        console.log(len);
        console.log(rooms[room]);
        console.log(typeof(rooms[room]));
        tempnextObject[nameToSocketId[rooms[room][rooms[room]?.length - 1]]] =
        nameToSocketId[rooms[room][0]];
        console.log("GS2");
        let ctoU = {};
        winners[room] = 0;
        for(let i=0;i<rooms[room]?.length;i++){
            colorToUser[rooms[room][i]] = colors[room].shift();
            ctoU[colorToUser[rooms[room][i]]] = rooms[room][i];
            console.log(colorToUser[rooms[room][i]]);

            var tempSocketId = nameToSocketId[rooms[room][i]];
            if (i + 1 < rooms[room].length) {
                tempnextObject[tempSocketId] = nameToSocketId[rooms[room][i + 1]];
            }
            io.to(tempSocketId).emit('color', colorToUser[rooms[room][i]]);
        }
        console.log("ctou:",ctoU);
        io.in(room).emit('colorTOuser', ctoU);
        console.log(tempnextObject);

        tempSocketId = nameToSocketId[rooms[room][0]];

        // var board = {"blue":[29,100,100,100],"red":[85,86,87,88],"green":[89,90,91,92],"yellow":[93,94,95,96]};
        // io.in(room).emit('board', board);

        io.to(tempSocketId).emit('firstTurn', colorToUser[users[tempSocketId].name], roomId)
        socket.to(room).emit('visDice', colorToUser[users[tempSocketId].name]);

        io.in(room).emit('winner', null, winners[room]);

        nextObject[room] = tempnextObject;

        io.in(room).emit("message", {
          player: "CPU",
          text: "Game has started",
        });
    })

    socket.on('turn', () => {
        let room = users[socket.id].roomId;
        if (users[socket.id]) {
            io.to(nextObject[users[socket.id].roomId][socket.id]).emit("turn", {});
        }
        io.in(room).emit('visDice', colorToUser[users[nextObject[users[socket.id].roomId][socket.id]].name]);
    })

    socket.on("board", (board) => {
        let room = users[socket.id].roomId;
        console.log("board:server");
        console.log(room);
        console.log(board);
        socket.to(room).emit("board",board);
    })

    socket.on('animDice', (payload) => {
        let room = users[socket.id].roomId;
        console.log("dice val in server:", payload.val);
        socket.to(room).emit("valDice", payload.val, payload.plColor);
    })

    socket.on("sendMessage", (message, callback) => {
        const tempUser = users[socket.id];
    
        io.in(tempUser.roomId).emit("message", {
          player: tempUser.name,
          text: message,
        });
    
        callback();
    });

    socket.on("home", () => {
        let room = users[socket.id].roomId;
        let key = getKeyByValue(nextObject[room], socket.id);
        nextObject[room][key] = nextObject[room][socket.id];
        if(!winners[room]) winners[room] = 1;
        else winners[room]++;

        if(winners[room]===rooms[room].length-1 || nextObject[room][key]===socket.id){
            //socket.emit('winner', colorToUser[users[socket.id].name], winners[room]);
            io.in(room).emit('winner', colorToUser[users[socket.id].name], winners[room]);
            //socket.emit('gameFinish',{});
            io.in(room).emit('gameFinish',{});
        }
        else{
            //socket.emit('winner', colorToUser[users[socket.id].name], winners[room]);
            io.in(room).emit('winner', colorToUser[users[socket.id].name], winners[room]);
            if (users[socket.id]) {
                io.to(nextObject[users[socket.id].roomId][socket.id]).emit("turn", {});
            }
            //socket.emit('visDice', colorToUser[users[nextObject[users[socket.id].roomId][socket.id]].name]);
            io.in(room).emit('visDice', colorToUser[users[nextObject[users[socket.id].roomId][socket.id]].name]);
        }
    });

    socket.on('restart', () => {
        io.in(users[socket.id].roomId).emit('newGame');
    })

    socket.on("disconnect", () => {
        if (users[socket.id]) {
          roomId = users[socket.id].roomId;
          if (nextObject[roomId]) {
            let key = getKeyByValue(nextObject[roomId], socket.id);
            if (nextObject[roomId][key]) {
              nextObject[roomId][key] = nextObject[roomId][socket.id];
            }
          }
          removeUser(socket.id);
          //io.in(roomId).emit("names", rooms[roomId]);
        }
        console.log(rooms);
        console.log("user has left!!");
    });

});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { 
    console.log(`App is listening at ${PORT}`);
});
