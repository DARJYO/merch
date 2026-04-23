// Minimalist, purely decorative JS for the header pulsing
// Does not interact with Three.js/SVGLoader anymore.

document.addEventListener("DOMContentLoaded", () => {
    // We target the logo text in the header to animate the "O" symbol
    const logoSymbolText = document.querySelector(".h-6"); // Or your specific logo selector

    if (logoSymbolText) {
        // Simple pulsing animation for the symbol in the logo
        setInterval(() => {
            logoSymbolText.style.transition = "transform 0.5s ease-in-out";
            logoSymbolText.style.transform = logoSymbolText.style.transform === "scale(1.1)" ? "scale(1)" : "scale(1.1)";
        }, 1500);
    }
});
