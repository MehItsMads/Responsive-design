// main.js

console.log("Hello, World!");

const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

let hue = 0;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  
  hue += 2;
  cursor.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
});
