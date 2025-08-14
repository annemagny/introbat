// Boot lines
const bootLinesBefore = [
    "Initializing WayneTech OS v7.3...",
    "Powering up Batcave systems...",
    "Loading encrypted databases...",
    "Activating satellite uplinks...",
    "Awaiting authentication..."
];

const bootLinesAfter = [
    "Password accepted.",
    "Decrypting secure files...",
    "Loading mission data...",
    "Engaging remote vehicle systems...",
    "All Batcomputer modules online."
];

// DOM elements
const bootScreen = document.getElementById("boot-screen");
const passwordScreen = document.getElementById("password-screen");
const afterBoot = document.getElementById("after-boot");
const mainContent = document.getElementById("main-content");

// Type out boot lines
function typeBootLines(lines, element, callback) {
    let index = 0;
    function typeLine() {
        if(index < lines.length){
            element.textContent += lines[index] + "\n";
            index++;
            setTimeout(typeLine,700);
        } else {
            if(callback) callback();
        }
    }
    typeLine();
}

// Start boot sequence before password
function startBoot(){
    typeBootLines(bootLinesBefore, bootScreen, ()=>{
        setTimeout(()=>{
            bootScreen.classList.add("hidden");
            passwordScreen.classList.remove("hidden");
        },500);
    });
}

// Password check
function checkPassword(){
    const password = document.getElementById("password-input").value;
    if(password === "projectvoc"){
        passwordScreen.classList.add("hidden");
        afterBoot.classList.remove("hidden");
        typeBootLines(bootLinesAfter, afterBoot, ()=>{
            setTimeout(()=>{
                afterBoot.classList.add("hidden");
                mainContent.classList.remove("hidden");
            },500);
        });
    } else {
        alert("Access Denied.");
    }
}

// Make popups draggable
function makeDraggable(el){
    let pos1=0,pos2=0,pos3=0,pos4=0;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e){
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e){
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Apply draggable to all popups
window.onload = ()=>{
    startBoot();
    const boxes = document.querySelectorAll('.popup');
    boxes.forEach(box=>makeDraggable(box));
}

  });
});
