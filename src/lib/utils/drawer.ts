let startY = 0;
let currentY = 0;
let offsetY = 0;
let dragging = false;

export function startGrab(
  event: MouseEvent | TouchEvent,
  panel: HTMLElement | null
) {
  dragging = true;
  startY = "touches" in event ? event.touches[0].clientY : event.clientY;
  panel!.style.transition = "none";

  function onMove(event: MouseEvent | TouchEvent) {
    if (!dragging) return;
    currentY = "touches" in event ? event.touches[0].clientY : event.clientY;
    offsetY = currentY - startY;

    // Prevent moving up too far
    offsetY = Math.max(0, offsetY);

    panel!.style.transform = `translateY(${offsetY}px)`;
  }

  function endGrab() {
    dragging = false;
    panel!.style.transition = "transform 0.3s ease";

    if (offsetY > 100) {
      // Close it fully (just show handle)
      panel!.style.transform = `translateY(calc(100% - 40px))`;
    } else {
      // Snap open
      panel!.style.transform = `translateY(0)`;
    }

    offsetY = 0;

    // Clean up
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", endGrab);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", endGrab);
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", endGrab);
  window.addEventListener("touchmove", onMove);
  window.addEventListener("touchend", endGrab);
}
