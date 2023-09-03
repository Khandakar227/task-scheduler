export function openModal() {
    const openEvent = new Event("show-modal");
    window.dispatchEvent(openEvent);
}

export function closeModal() {
    const closeEvent = new Event("hide-modal");
    window.dispatchEvent(closeEvent);
}