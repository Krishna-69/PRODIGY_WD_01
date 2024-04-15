document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    function checkVisibility() {
        sections.forEach(section => {
            const position = section.getBoundingClientRect();

            // Checking if section is in the viewport
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    // Initially check the visibility
    checkVisibility();

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
});
