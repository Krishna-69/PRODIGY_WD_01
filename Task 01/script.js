window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = '#222'; // Change color when scrolled
    } else {
      navbar.style.backgroundColor = '#333'; // Revert back to original color
    }
  });
  