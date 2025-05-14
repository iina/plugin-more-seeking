import "../shared.scss";

console.log(window.iina);

iina.onMessage("showIndicator", (e) => {
  const seekIndicator = document.getElementById("seek-indicator");

  if (e && typeof e.x === "number" && typeof e.y === "number") {
    seekIndicator.style.left = `${e.x}px`;
    seekIndicator.style.bottom = `${e.y}px`;
    seekIndicator.style.top = ""; // Reset
    seekIndicator.style.transform = "translate(-50%, 50%)";
  } else {
    seekIndicator.style.left = "50%";
    seekIndicator.style.top = "50%";
    seekIndicator.style.bottom = ""; // Reset
    seekIndicator.style.transform = "translate(-50%, -50%)";
  }
});
