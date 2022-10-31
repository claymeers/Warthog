const COMMANDS = {
    help : 
        'Supported commands: ["<span class="code">about</span>", "<span class="code">skills</span>",  "<span class="code">get cv</span>", "<span class="code">hobbies</span>", "<span class="code">contact</span>", "<span class="code">clear</span>"]',
    about : 
        "Hello 👋<br>I'm Naveen. I’m a 18 yr old web3 developer currently living in Paris. I have a burning passion to want and help others with code that I create. I enjoy the limitless potential of impact that I can have with what I build. It is what pushes me every day to become a better developer.",
    skills : 
        '<span class="code">Languages:</span> HTML, CSS, JavaScript, Solidity<br><span class="code">Technologies:</span> Git, NodeJS, GraphQL<br><span class="code">Frameworks:</span> React.js, Redux, GSAP, Sass, Hardhat',
    hobbies : 
        '<span class="code">Music:</span> Piano, Guitare<br><span class="code">Sport:</span> Badminton, Basketball, Muay Thai<br><span class="code">Programmation:</span> Cybersecurity, Blockchain, AI, Robotics<br><span class="code">Others:</span> Cinema, Aeronautics, Art',
    contact : 
        'You can contact me on any of the following links:<br>["<a target="_blank" rel="noopener noreferrer" href="https://github.com/claymeers" class="social link">GitHub</a>", "<a target="_blank" rel="noopener noreferrer" href="https://medium.com" class="social link">Medium</a>", "<a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com" class="social link">Twitter</a>", "<a href="wasabi.naveen@gmail.com" class="social link">Gmail</a>"]',
    clear : '',
    experience : 
        "Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Bored Apes Yatch Club.",
    'get cv' : 
        "Here is my CV [resume.pdf]",
    quote : 
        "Software is like sex: it’s better when it’s free. – Linus Torvalds",
    education : 
        "B.Sc. Electrical Engineer & Computer Science - Massachusetts Institute of Technology, Cambridge",
    repo : 
        "Take a look at some of my work",
    date :
        showDate(),
    'sudo rm -rf' : 
        "It's the end!",
    party :
        '🎉',
};

let userInput, terminalOutput;
let typeWriter = document.querySelector('.typewriter');
// Order history table
const commandsHistory = [];
let historyIndex = -1;
let historyMode = false;

// Table containing the orders (useful for the completion of the orders)
let commandsList = Object.keys(COMMANDS);

const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("terminalOutput");
    document.getElementById("dummyKeyboard").focus();
};

const execute = function executeCommand(input) {
    let output;
    input = input.toLowerCase();

    typeWriter.classList.remove('typewriter');

    if (input.length === 0) { return;}

    // Custom command
    if (input === "get cv") {
        getCV();
    }

    if (input === "clear") {
        clearTerm();
    }
    //Easter egg
    if (input === "party") {
        startTheParty();
    }
    if (input === "sudo rm -rf") {
        whooops();
    }
    if (input === "date") {
        showDate();
    }
    if (input === "repo") {
        getRepo();
    }
    if (input === "quote") {
        showQuote();
    }

    if (input != "clear") {
        output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
        if (!COMMANDS.hasOwnProperty(input)) {
            output += `<div class="terminal-line">no such command: <span class="output">"${input}"</span></div>`;
            console.log("Oops! no such command");
        } else {
            output += `<div class="output"> ${COMMANDS[input]} </div>`;
        }
        
        terminalOutput.innerHTML += `<div class="terminal-line">${output}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
};

const key = function keyEvent(e) {
    const input = userInput.innerHTML;

    if (e.key === "Enter") {
        historyMode = false;
        execute(input);
        commandsHistory.push(input);
        userInput.innerHTML = "";
        return;
    }
    
    userInput.innerHTML = input + e.key;
};

function clearTerm() {
    output = '';
    terminalOutput.innerHTML = '';
}

function getCV() {
    const a = document.createElement("a");
    a.href = "assets/resume.pdf";
    a.setAttribute("download", "CV - Wasabi.pdf");
    a.click();
}

function getRepo() {
    const a = document.createElement("a");
    a.href = "https://github.com/claymeers";
    a.setAttribute("target", "_blank");
    a.click();
}

function showDate() {
    let today = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    let time = new Date(), hours = time.getHours(), minutes = time.getMinutes();
    return today + ' - ' + hours + ':' + minutes;
}

function showQuote() {
    //fetching random quotes/data from the api and parsing it into JS object
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => {
            COMMANDS['quote'] = data.content + " - " + data.author;
        })
}

const whooops = () => {
    document.body.querySelector(".hero").remove();
    document.body.style.background = "#000";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";

    document.body.classList.add("firework");
    const fireworks = new Fireworks(document.body, {
        mouse: { click: true, move: false, max: 7 },
    });
    fireworks.start();
};  

// TOP SECRET, DON'T READ
const startTheParty = () => {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });
    fire(0.2, {
    spread: 60,
    });
    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
};  

const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
      return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(0, userInput.innerHTML.length - 1);
};

//Autocompletion
const autocomplete = function tabs(e) {
    const input = userInput.innerHTML;
    //TAB
    if (e.key == "Tab") {
        e.preventDefault();
        if (input === "") {
            userInput.innerHTML = input + "help";
        } else {
            const matchingCommand = commandsList.find((c) =>
                c.startsWith(input)
            );
            if (matchingCommand) {
                userInput.innerHTML = matchingCommand;
            }
        }  
        historyMode = false;
        // UP / DOWN
    } else if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        if(commandsHistory.length > 0) {
            if (historyMode === false) {
                historyIndex = commandsHistory.length - 1;
            } else {
                if (e.key == "ArrowUp" && historyIndex !== 0) {
                    historyIndex--;
                } else if (e.key == "ArrowDown" && historyIndex !== commandsHistory.length - 1) {
                    historyIndex++;
                }
            }
            userInput.innerHTML = commandsHistory[historyIndex];
        } 
        historyMode = true;
    }
}

document.addEventListener("keydown", backspace);
document.addEventListener("keydown", autocomplete);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
document.addEventListener("DOMContentLoaded", showQuote);