document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Infinite Scroll Gallery Setup
    const track = document.getElementById('galleryTrack');
    
    // Using the 5 provided images, repeating them to create a sequence of 10
    const imageUrls = [
        'assets/images/optica_frame_1.png',
        'assets/images/optica_sunglasses_1.png',
        'assets/images/optica_hearing_aid.png',
        'assets/images/optica_frame_2.png',
        'assets/images/optica_sunglasses_2.png',
        'assets/images/optica_frame_1.png',
        'assets/images/optica_sunglasses_1.png',
        'assets/images/optica_hearing_aid.png',
        'assets/images/optica_frame_2.png',
        'assets/images/optica_sunglasses_2.png',
    ];

    // Inject images into track
    imageUrls.forEach(url => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Producto Hidalgo Luna';
        item.appendChild(img);
        track.appendChild(item);
    });
    
    // Clone track content to make an infinite seamless loop
    const itemsHTML = track.innerHTML;
    track.innerHTML += itemsHTML;

    // Animation variables
    let currentX = 0;
    let baseSpeed = 0.5; // slow drift
    let currentSpeed = baseSpeed;
    let targetSpeed = baseSpeed;
    let isHovered = false;
    
    // Increase speed slightly when scrolling
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        let currentScrollY = window.scrollY;
        let diff = currentScrollY - lastScrollY;
        
        if (Math.abs(diff) > 0) {
            targetSpeed = baseSpeed + (Math.abs(diff) * 0.1);
            if (targetSpeed > 10) targetSpeed = 10;
        }
        
        lastScrollY = currentScrollY;
        
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            targetSpeed = baseSpeed;
        }, 150);
    });

    // Pause on hover
    const allItems = document.querySelectorAll('.gallery-item');
    allItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            isHovered = true;
        });
        item.addEventListener('mouseleave', () => {
            isHovered = false;
        });
    });

    function animate() {
        if (!isHovered) {
            // Smoothly ease back to base speed
            currentSpeed += (targetSpeed - currentSpeed) * 0.05;
            currentX -= currentSpeed;
            
            // Loop reset: since we duplicated the items, resetting at half width creates a seamless loop
            const trackWidth = track.scrollWidth / 2;
            if (Math.abs(currentX) >= trackWidth) {
                currentX = 0;
            }
            
            track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    requestAnimationFrame(animate);
});
