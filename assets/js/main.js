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
      box-shadow: 0 0 10px 2px rgba(255,255,255,0.7);
      transition: background-color 0.1s linear;
    }
  `;
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  let hue = 0;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    hue += 2; 
    if (hue > 360) hue = 0; 
    cursor.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
  });
});
