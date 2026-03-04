// main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello, World!");

  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      height: 100vh;
      cursor: none;

      background:
        linear-gradient(#ccc 1px, transparent 1px),
        linear-gradient(90deg, #ccc 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .custom-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      image-rendering: pixelated; /* makes cursor blocky */
      box-shadow: 0 0 10px 2px rgba(255,255,255,0.7);
      transition: background-color 0.1s linear;
    }

    .trail-pixel {
      position: fixed;
      width: 10px;
      height: 10px;
      pointer-events: none;
      z-index: 9998;
      border-radius: 2px;
      image-rendering: pixelated;
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  let hue = 0;
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  const speed = 0.2;

  const trails = [];

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    hue += 2;
    if (hue > 360) hue = 0;
    cursor.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    const trail = document.createElement("div");
    trail.classList.add("trail-pixel");
    trail.style.left = cursorX + "px";
    trail.style.top = cursorY + "px";
    trail.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    document.body.appendChild(trail);
    trails.push(trail);

    if (trails.length > 50) {
      const old = trails.shift();
      old.remove();
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});
