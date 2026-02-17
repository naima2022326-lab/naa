// PASSWORD
function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === "March 25th") {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("hub").classList.remove("hidden");
  } else {
    document.getElementById("errorMsg").innerText = "Wrong password";
  }
}

// CATEGORY → GAME LIST
function openCategory(type) {
  const list = document.getElementById("gameList");
  list.innerHTML = "";

  if (type === "social") {
    addGame("Among Us", startAmongUs);
  }
  if (type === "arcade") {
    addGame("Flappy Style", startFlappy);
  }
  if (type === "classic") {
    addGame("Snake", startSnake);
  }
}

function addGame(name, func) {
  const btn = document.createElement("button");
  btn.innerText = name;
  btn.onclick = func;
  document.getElementById("gameList").appendChild(btn);
}

// CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// --------------------
// AMONG-US STYLE GAME
function startAmongUs() {
  let players = [
    {x:50,y:50,alive:true},
    {x:300,y:100,alive:true}
  ];
  let impostor = Math.floor(Math.random()*players.length);

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    players.forEach((p,i)=>{
      if(!p.alive) return;
      ctx.fillStyle = i === impostor ? "red" : "cyan";
      ctx.fillRect(p.x,p.y,25,25);
    });

    requestAnimationFrame(loop);
  }
  loop();
}

// --------------------
// FLAPPY STYLE
function startFlappy() {
  let y = 250, v = 0;

  canvas.onclick = () => v = -6;

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    v += 0.4;
    y += v;
    ctx.fillStyle = "yellow";
    ctx.fillRect(180,y,20,20);
    requestAnimationFrame(loop);
  }
  loop();
}

// --------------------
// SNAKE
function startSnake() {
  let x = 200, y = 200;

  document.onkeydown = e => {
    if(e.key==="ArrowUp") y-=10;
    if(e.key==="ArrowDown") y+=10;
    if(e.key==="ArrowLeft") x-=10;
    if(e.key==="ArrowRight") x+=10;
  };

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "lime";
    ctx.fillRect(x,y,15,15);
    requestAnimationFrame(loop);
  }
  loop();
}
