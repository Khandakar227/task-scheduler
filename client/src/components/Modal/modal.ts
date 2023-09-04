export function openModal(data = {}) {
    const openEvent = new CustomEvent("show-modal", {
        detail: data
    });
    window.dispatchEvent(openEvent);
}

export function closeModal(data = {}) {
    const closeEvent = new CustomEvent("hide-modal", {
        detail: data
    });
    window.dispatchEvent(closeEvent);
}