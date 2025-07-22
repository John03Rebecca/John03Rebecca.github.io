// Stickman interaction + navigation
function goToSection(id, label) {
  const stickman = document.getElementById("stickman");
  const bubble = document.getElementById("speech-bubble");

  if (stickman && bubble) {
    // Animate pointing
    stickman.classList.add("pointing");

    // Show speech bubble
    bubble.innerText = `Let's look at ${label}`;
    bubble.classList.remove("hidden");

    // Smooth scroll to section
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    // Reset animation and bubble after 2s
    setTimeout(() => {
      stickman.classList.remove("pointing");
      bubble.classList.add("hidden");
    }, 2000);
  }
}
