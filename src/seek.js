const { core, overlay, console, event, input, menu } = iina;

const TIMEOUT = 150;

const SEEK_SPEED = 2;

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

  #initSeek(x,y) {
    // only start seeking if the player is not paused
    if (core.status.paused) {
      return;
    }

    this.status = WAITING;

    // show the overlay after a timeout.
    setTimeout(() => {
      // if the window is acturally dragged, cancel the seek
      if (this.status != WAITING) {
        return;
      }

      this.status = SEEKING;

      overlay.show();
      overlay.postMessage("mousePos", { x, y });

      this.#startSeek();
    }, TIMEOUT);
  }

  #startSeek() {
    console.log("Start Seek");

    this.originalSpeed = core.status.speed;

    core.setSpeed(SEEK_SPEED);
  }

  #cancelSeek() {
    console.log("Cancel Seek");

    if (this.status === IDLE) {
      return;
    }
    if (this.status === SEEKING) {
      core.setSpeed(this.originalSpeed);
    }
    this.status = IDLE;
    overlay.hide();
  }

  addInputListeners() {
    input.onMouseDown(input.MOUSE, (e) => {
      console.log("Mouse Down");

      const { x, y } = e;
      this.#initSeek(x, y);
    });

    input.onMouseUp(input.MOUSE, () => {
      console.log("Mouse Up");

      this.#cancelSeek();
    });

    input.onMouseDrag(input.MOUSE, () => {
      console.log("Mouse Drag");

      this.#cancelSeek();
    });
  }
}
