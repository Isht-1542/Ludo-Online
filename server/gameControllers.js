var rooms = {};
var users = {};
var nameToSocketId = {};
var colors = {};
var colorToUser = {};
var nextObject = {};
var winners= {};

const nextPos = [20, 21, 22, 23, 24, 16, 13, 10, 7, 4, 1, 2, 3, 6, 9, 12, 15, 18, 
  37, 38,39,40,41,42,48,54,53,52,51,50,49,57,60,63,66,69,72,71,70,67,64,61,58,55,
  36,35,34,33,32,31,25,19,20];

const startPos = [20,6,67,53];

var isStarted = {};

const addUser = (name, socketId, roomId ) => {
  name = name;

  if (rooms[roomId] && rooms[roomId].includes(name)) {
    return { error: "Username is already present" };
  }
  if (rooms[roomId] && rooms[roomId].length === 4)
    return { error: "Room is full" };

  if (!rooms[roomId]) {
    rooms[roomId] = [];
    rooms[roomId].push(name);
    console.log(rooms[roomId]);
  }
  else{
    rooms[roomId].push(name);
    console.log(rooms[roomId]);
  }
  console.log(typeof(rooms[roomId]));
  console.log(rooms[roomId]);
  users[socketId] = { name, roomId };
  nameToSocketId[name] = socketId;
};

const removeUser = (socketId) => {
  let name, roomId;
  if (users[socketId]) {
    name = users[socketId].name;
    roomId = users[socketId].roomId;
  }

  if (rooms && rooms[roomId]) {
    rooms[roomId] = rooms[roomId].filter((x) => {
      if (x !== name) return true;
    });

    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
      delete nextObject[roomId];
      delete colors[roomId];
      delete winners[roomId];
    }
    delete users[socketId];
    delete nameToSocketId[name];
  }
};

module.exports = {
  rooms,
  users,
  nameToSocketId,
  addUser,
  removeUser,
  colors,
  nextObject,
  isStarted,
  colorToUser,
  winners,
};





