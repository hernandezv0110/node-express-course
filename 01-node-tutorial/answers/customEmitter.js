const EventEmitter = require("events");
const soccerEmitter = new EventEmitter();

const players = ["Messi", "Ronaldo", "Mbappe", "Pulisic", "Lozano"];
setInterval(() => {
  const randomPlayer = players[Math.floor(Math.random() * players.length)];
  soccerEmitter.emit("player", randomPlayer, " just scored a goal!");
}, 2000);

soccerEmitter.on("player", (player, msg) => console.log(player, msg));
