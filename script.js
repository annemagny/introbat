// ====== CONFIG ======
const PASSWORD = "projectvoc";

const bootLines = [
  "Initializing secure system...",
  "Loading Wayne Enterprises OS...",
  "Accessing encrypted Batcomputer nodes...",
  "Verifying biometric signature...",
  "Connection established.",
  "Welcome back, sir."
];

// ====== PASSWORD CHECK ======
function checkPassword() {
  const input = document.getElementById('password-input').value;
  if (input === PASSWORD) {
    document.getElementById('password-screen').classList.add('hidden');
    startBootSequence();
  } else {
    document.getElementById('error-message').innerText = "Access Denied";
  }
}

// ====== BOOT SEQUENCE ======
function startBootSequence() {
  document.getElementById('boot-screen').classList.remove('hidden');
  const audio = document.getElementById('alfred-audio');
  audio.play();

  const bootTextElement = document.getElementById('boot-text');
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex < bootLines.length) {
      let charIndex = 0;

      function typeChar() {
        if (charIndex < bootLines[lineIndex].length) {
          bootTextElement.textContent += bootLines[lineIndex][charIndex];
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          bootTextElement.textContent += "\n";
          lineIndex++;
          setTimeout(typeLine, 300);
        }
      }

      typeChar();
    } else {
      setTimeout(showMenu, 1000);
    }
  }

  typeLine();
}

// ====== SHOW MENU ======
function showMenu() {
  document.getElementById('boot-screen').classList.add('hidden');
  document.getElementById('menu-screen').classList.remove('hidden');
}

// ====== POP-UP MENU INTERACTIVITY ======
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', () => {
      popup.classList.toggle('active');
    });
  });
});
