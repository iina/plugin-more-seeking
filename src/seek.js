const { core, overlay, console, event, input, menu } = iina;

const TIMEOUT = 150;

const IDLE = 0;
const WAITING = 1;
const SEEKING = 2;

export class SeekModule {
  status = IDLE;

  constructor() {
    event.on("iina.window-loaded", () => {
      overlay.loadFile("dist/ui/overlay/index.html");
    });

    this.addInputListeners();
  }

  #cancelSeek() {
    if (this.status === IDLE) {
      return;
    }
    if (this.status === SEEKING) {
      core.setSpeed(1);
    }
    console.log("Cancel Seek");
    this.status = IDLE;
    overlay.hide();
  }

  addInputListeners() {
    input.onMouseDown(input.MOUSE, (e) => {
      const { x, y } = e;
      console.log("Mouse Down");
      // only start seeking if the player is not paused
      if (core.status.paused) {
        return;
      }
      this.status = WAITING;
      // show the overlay after a timeout.
      // if the window is acturally dragged, cancel the seek
      setTimeout(() => {
        if (this.status != WAITING) {
          return;
        }
        this.status = SEEKING;
        overlay.show();
        overlay.postMessage("mousePos", { x, y });
        core.setSpeed(2);
      }, TIMEOUT);
    });

    input.onMouseUp(input.MOUSE, () => {
      this.#cancelSeek();
    });

    input.onMouseDrag(input.MOUSE, () => {
      this.#cancelSeek();
    });
  }
}
