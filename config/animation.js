const nameElement = document.querySelector('p .name');

let animationTimer;
const inactivityDelay = 3000; // 3 seconds

function startAnimations() {
    nameElement.style.animation = 'bounce 0.5s ease-in-out, wiggle 1s cubic-bezier(0.5, 0, 0.5, 1) forwards';
}

function resetAnimations() {
    nameElement.style.animation = 'none';
    clearTimeout(animationTimer);
    animationTimer = setTimeout(startAnimations, inactivityDelay);
}

// Initial start after 3 seconds
animationTimer = setTimeout(startAnimations, inactivityDelay);

// Reset animations on mouse enter and leave
nameElement.addEventListener('mouseenter', resetAnimations);
nameElement.addEventListener('mouseleave', resetAnimations);
