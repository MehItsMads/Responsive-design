// main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello, World!");

  const style = document.createElement("style");
  style.textContent = `

    .custom-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      image-rendering: pixelated;
      box-shadow: 0 0 10px 2px rgba(255,255,255,0.7);
      transition: background-color 0.1s linear;
    }

    .trail {
      position: fixed;
      width: 12px;
      height: 12px;
      pointer-events: none;
      z-index: 9998;
      border-radius: 2px;
      image-rendering: pixelated;
      opacity: 0;
      transform: translate(-50%, -50%);
    }
  `;
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  const trailCount = 20;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const t = document.createElement("div");
    t.classList.add("trail");
    document.body.appendChild(t);
    trails.push({el: t, x: 0, y: 0, hue: 0, opacity: 0});
  }

  let hue = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

    hue += 2;
    if (hue > 360) hue = 0;
    cursor.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    for (let i = trails.length - 1; i > 0; i--) {
      trails[i].x = trails[i - 1].x;
      trails[i].y = trails[i - 1].y;
      trails[i].hue = trails[i - 1].hue;
      trails[i].opacity = trails[i - 1].opacity * 0.8;
    }
    trails[0].x = mouseX;
    trails[0].y = mouseY;
    trails[0].hue = hue;
    trails[0].opacity = 1;

    trails.forEach(t => {
      t.el.style.left = t.x + "px";
      t.el.style.top = t.y + "px";
      t.el.style.backgroundColor = `hsl(${t.hue}, 100%, 50%)`;
      t.el.style.opacity = t.opacity;
    });

    requestAnimationFrame(animate);
  }

  animate();
});
