import "../shared.scss";

console.log(window.iina);

iina.onMessage("mousePos", (e) => {
  const seekIndicator = document.getElementById("seek-indicator");
  seekIndicator.style.left = `${e.x}px`;
  seekIndicator.style.bottom = `${e.y}px`;
});
