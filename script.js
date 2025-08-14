// PASSWORD AND BOOT
const PASSWORD = "projectvoc";

// Boot sequences
const bootLinesBefore = [
    "Initializing secure system...",
    "Loading Wayne Enterprises OS...",
    "Accessing encrypted Batcomputer nodes...",
    "Verifying biometric signature...",
    "Connection established.",
    "Welcome back, sir."
];

const bootLinesAfter = [
    "Password accepted.",
    "Decrypting secure files...",
    "Loading mission data...",
    "Engaging remote vehicle systems...",
    "All Batcomputer modules online."
];

// Elements
const bootScreen = document.getElementById("boot-screen");
const passwordScreen = document.getElementById("password-screen");
const bootAfter = document.getElementById("boot-after");
const menuScreen = document.getElementById("menu-screen");
const popupContainer = document.getElementById("popup-container");
const alfredAudio = document.getElementById("alfred-audio");

// Type boot lines function
function typeBootLines(lines, element, callback) {
    let index = 0;
    function typeLine() {
        if(index < lines.length){
            element.textContent += lines[index] + "\n";
            index++;
            setTimeout(typeLine, 500);
        } else if(callback) callback();
    }
    typeLine();
}

// Initial boot
window.onload = () => {
    typeBootLines(bootLinesBefore, bootScreen, ()=>{
        bootScreen.classList.add("hidden");
        passwordScreen.classList.remove("hidden");
    });
}

// Check password
function checkPassword() {
    const input = document.getElementById("password-input").value;
    if(input === PASSWORD){
        passwordScreen.classList.add("hidden");
        bootAfter.classList.remove("hidden");
        alfredAudio.play();
        typeBootLines(bootLinesAfter, bootAfter, ()=>{
            bootAfter.classList.add("hidden");
            menuScreen.classList.remove("hidden");
            popupContainer.classList.remove("hidden");
            makeAllDraggable();
        });
    } else { alert("Access Denied"); }
}

// DRAGGABLE POPUPS
function makeDraggable(el){
    let pos1=0,pos2=0,pos3=0,pos4=0;
    el.onmousedown = dragMouseDown;
    function dragMouseDown(e){
        e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e){
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX; pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }
    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function makeAllDraggable(){
    document.querySelectorAll('.popup').forEach(el => makeDraggable(el));
}
