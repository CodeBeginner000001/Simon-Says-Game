let button = ["button-1", "button-2", "button-3", "button-4"];
let gameseq = [];
let userseq = [];
let level = 0;
let count = 0;
let starter = false;
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function (event) {
    if (!starter) {
        console.log("Game Started...");
        starter = true;
    }
    if (event.code == "Enter") count++;
    // console.log(event.code);
    if (count<2) {
        levelup();
    }
});
let maxScore = 0;

// creating a flash for a button
function gameflash(btn) {
    btn.classList.add("flash"); //add the class name from css
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}
// creating a user flash for a button
function userflash(btn) {
    btn.classList.add("userflash"); //add the class name from css
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}
// Change the level and flash the button for level change
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //  Random Color Generator
    let randomNumber = Math.floor(Math.random() * button.length); //choosing a random number
    let randomColor = button[randomNumber]; //getting the index value (class name) from color array by using randomNumber
    let randombtn = document.querySelector(`.${randomColor}`); //selecting button according to class-name got from randomColor
    // console.log(randomColor);
    // console.log(randomNumber);
    // console.log(randombtn);
    gameseq.push(randomColor);
    console.log(gameseq);
    // calling btnflash function for flashing
    gameflash(randombtn);
}
function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length)
        {
            setTimeout(levelup, 1000);
        }
        
    } else {
        if (maxScore < level) {
            maxScore = level;
        }
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Your Highest Score is <b> ${maxScore}</b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "aquamarine";
        }, 100);
        reset();
    }
}

function reset() {
    starter = false;
    gameseq = [];
    userseq = [];
    level = 0;
    count = 0;
}

// calling userflash function
function btnpress() {
    // console.log(this);
    userflash(this);
    userseq.push(this.getAttribute("id"));
    // console.log(userseq);
    checkans(userseq.length-1);
}
// User pressed the button
let allbtns = document.querySelectorAll(".btn");
for (btns of allbtns) {
    btns.addEventListener("click", btnpress);
}