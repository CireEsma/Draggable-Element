/* The `Draggable` class enables dragging an HTML element by mouse or touch events. */
class Draggable {
  constructor(element) {
    this.element = element;
    this.initialX = 0;
    this.initialY = 0;
    this.moveElement = false;

    this.events = {
      down: ["mousedown", "touchstart"],
      move: ["mousemove", "touchmove"],
      up: ["mouseup", "touchend"],
    };

    this.isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    this.initEvents();
  }

  getEventType(type) {
    return this.isTouchDevice ? this.events[type][1] : this.events[type][0];
  }

  getPointerEvent(e) {
    return this.isTouchDevice ? e.touches[0] : e;
  }

  startMovement = (e) => {
    e.preventDefault();
    const pointerEvent = this.getPointerEvent(e);
    this.initialX = pointerEvent.clientX;
    this.initialY = pointerEvent.clientY;
    this.moveElement = true;
  };

  move = (e) => {
    if (this.moveElement) {
      e.preventDefault();
      const pointerEvent = this.getPointerEvent(e);
      const newX = pointerEvent.clientX;
      const newY = pointerEvent.clientY;
      this.element.style.top = `${
        this.element.offsetTop - (this.initialY - newY)
      }px`;
      this.element.style.left = `${
        this.element.offsetLeft - (this.initialX - newX)
      }px`;
      this.initialX = newX;
      this.initialY = newY;
    }
  };

  stopMovement = () => {
    this.moveElement = false;
  };

  initEvents() {
    this.element.addEventListener(
      this.getEventType("down"),
      this.startMovement
    );
    this.element.addEventListener(this.getEventType("move"), this.move);
    this.element.addEventListener(this.getEventType("up"), this.stopMovement);
    this.element.addEventListener("mouseleave", this.stopMovement);
    this.element.addEventListener(this.getEventType("up"), this.stopMovement);
  }
}

document.querySelectorAll(".draggable").forEach((element) => {
  new Draggable(element);
});
