let money = 0;
let gain = 1;
let autoLevel = 0;
let costs = [25,200,400];
let gate = [[false, "you need more money to upgrade your click"],[false, "you need more money to upgrade your auto clicker"],[false,"you need more money to upgrade your golden clicker"]];
let particles = [];
let achievements = [false,false,false,false];
let goldenAutoLevel = 0;
let logger = ["--","--","--","--","--","--","--","--"];
let consoleAlpha = 1000;

function preload() {
  song = loadSound("song.mp3");
  img2 = loadImage("grad.png");
  img = loadImage("cookie.png");
  pointer = loadImage("pointer.png");
}

function increases(plusplus,cost,times) {
  eval(plusplus + "++;");
  money-=costs[cost];
  if (money < 0) {
    newLog("poor");
  }
  costs[cost] = Math.floor(costs[cost] * times)
}

function newLog(Text) {
  console.log(Text);
  logger.push(Text);
  if (logger.length > 7) {
    logger.splice(0,1);
  }
}

function setup() {
  song.loop();
  createCanvas(400,400);
  setInterval(function(){money+=autoLevel}, 1000);
  //generate button
  const generate = createButton("click me!");
  generate.mousePressed(function() {
    money+=gain; 
    if (money > 1000) {
      achievements[0] = true;
    }
  });
  generate.position(160,165);
  //reset button
  const resetButton = createButton("reset");
  resetButton.mousePressed(function () {
    money = 0;
    gain = 1;
    autoLevel = 0;
    costs[0] = 25;
    costs[1] = 200;
    costs[2] = 300;
    for (let i = 0; i < 3; i++) {
      achievements[i] = false;
      logger[i] = "--";
    }
  });
  resetButton.position(5,405);
  const levelup = createButton("upgrade");
  levelup.mousePressed(function() {
    if (money >= costs[0]) {
      increases("gain",0,1.3);
      if (gain-1 === 10) {
        achievements[1] = true;
      }
    } else {
      gateFunc(0);
    }
  });
  levelup.position(4,75);
  const auto = createButton("auto");
  auto.mousePressed(function() {
    if (money >= costs[1]) {
      increases("autoLevel",1,1.75);
      if (autoLevel === 5) {
        achievments[2] = true;
        const goldenAuto = createButton("golden auto");
        goldenAuto.mousePressed(function() {
          if (money >= costs[2]) {
            increases("goldenAutoLevel",2,1.5);
            if (goldenAutoLevel === 5) {
                achievements[3] = true;
            }
          } else {
            gateFunc(2);
          }
        });
        goldenAuto.position(345,95);
        setInterval(function(){money+=goldenAutoClicker*15});
      }
    } else {
      gateFunc(1);
    }
  });
  auto.position(347, 100);
  const hideButton = createButton("hide console");
  hideButton.mousePressed(function() {
    switch (consoleAlpha) {
      case 1000:
        consoleAlpha = 0;
        break;
      case 0:
        consoleAlpha = 1000;
        break;  
      default:
        console.log("alpha !== 100 || 0");
    }
  });
  hideButton.position(55,405);
}

function draw() {
  background(img2);
  image(img,130,115,120,120);
  image(pointer,350,10,40,50);
  fill("gold");
  textSize(30);
  text(money,1,30);
  fill("green");
  text(gain-1,1,65);
  fill("white");
  text(autoLevel,360,90);
  fill("black");
  textSize(40);
  text("object clicker",90,40);
  if (goldenAutoLevel > 0) {
    tint("gold");
    image(pointer,350,80,40,50);
    fill("gold");
    text(goldenAutoLevel,360,95);
  }
  for (let i = 0; i < 2; i++) {
    switch (gate[i][0]) {
      case true:
        fill("red");
        textSize(15);
        text(gate[i][1],10,380);
    }
  }
  for (let i = 0; i < (width - 300) / 100; i++) {
        append(particles, [Math.floor(Math.random() * width), -10, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 3, Math.floor(Math.random() * 10),]);
    }
    for (let i = 1; i < particles.length; i++) {
        if (particles[i - 1][4] > 4) {
            particles[i - 1][0] += particles[i - 1][2];
        } else if (particles[i - 1][4] <= 4) {
            particles[i - 1][0] -= particles[i - 1][2];
        }
        particles[i - 1][1] += particles[i - 1][3];
        fill(225, 225, 225, 50);
        noStroke();
        circle(particles[i - 1][0], particles[i - 1][1], 10);
        if (particles[i - 1][1] > height + 10) {
            particles.splice(i - 1, 1);
        }
    }
  for (let i = 0; i < 3; i++) {
    switch (achievements[i]) {
      case true:
        fill("red");
        square(10 + 70 * i, 310, 50);
        fill("orange");
        textSize(30);
        text(i+1,25 + 70 * i, 345);
        break;
      case false:
        fill("black");
        square(10 + 70 * i, 310, 50);
        break;
    }
  }
  strokeWeight(3);
  stroke(0,0,0,consoleAlpha);
  fill(168,168,168,consoleAlpha);
  square(280,280,120);
  fill(0,0,0,consoleAlpha);
  square(295,295,90);
  noStroke();
  fill(0,208,7,consoleAlpha);
  textSize(13)
  text("console",295,292);
  fill(225,225,225,consoleAlpha);
  for (let i = 0; i < 7; i++) {
    if (logger[i] !== undefined || logger[i] !== null) {
      textSize(10);
      text(logger[i],300, 390-i*12);
    }
  }
}

function gateFunc(item) {
  newLog("too poor");
  gate[item][0] = true;
  setTimeout(function () {gate[item][0] = false;}, 1500);
}