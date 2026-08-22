// Establish the observer to watch for elements entering the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add the 'show' class when the element comes into view
            entry.target.classList.add('show');
            // Optional: Stop observing once revealed so it doesn't animate repeatedly
            observer.unobserve(entry.target);
        }
    });
}, {
    // Trigger the animation when the element is 10% visible
    threshold: 0.1 
});

// Select all elements tagged with the 'hidden' class on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
