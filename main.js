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
        "Saturday, October 29, 2022 - 19:07",
    'sudo rm -rf' : 
        "It's the end!",
    party :
        '🎉',
};

let userInput, terminalOutput;
let typeWriter = document.querySelector('.typewriter');

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
        execute(input);
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

const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
      return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(0, userInput.innerHTML.length - 1);
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);