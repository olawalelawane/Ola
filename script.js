// Script File

// Mobile Menu Functionality
const menuBtn = document.querySelector('.main-navbar .menu-btn');
const menuList = document.querySelector('.main-navbar .nav-list');
const menuListItems = document.querySelectorAll('.nav-list li a');

menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
});

menuListItems.forEach(item => {
    item.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        menuList.classList.remove('active');
    });
});

// Sticky Header
const homeSection = document.querySelector('.home');
function handleScroll() {
    if(window.scrollY > 120){
        homeSection.classList.add('active');
    } else {
        homeSection.classList.remove('active');
    }
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Banner Slider Configuration
$('.banner-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1,
    nav: true,
    dots: true,
    navText: [
        "<i class='fa-solid fa-chevron-left'></i>",
        "<i class='fa-solid fa-chevron-right'></i>"
    ],
    animateOut: 'fadeOut'
});

// Partners Section Starts 
$('.partners-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        700:{
            items:3
        },
        1000:{
        	items:5
        }
    }
})
// Partners Section Ends 

// Testimonials Slider
$('.testimonials-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    margin: 20,
    nav: true,
    dots: true,
    navText: [
        "<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>"
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize AOS (Animate On Scroll) if needed
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true
    });
}

// Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable submit button and show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Get form data
            const formData = new FormData(this);

            // Send form data using fetch
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                formMessage.textContent = "Thank you for your message! We'll get back to you soon.";
                formMessage.className = 'form-message success';
                
                // Reset form
                contactForm.reset();
            })
            .catch(error => {
                formMessage.textContent = 'An error occurred. Please try again later.';
                formMessage.className = 'form-message error';
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            });
        });
    }
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="close-btn">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#0a2463';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    notification.style.transition = 'all 0.3s ease';
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '10px';
    
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Image Gallery Interaction
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image');
    const smallImages = document.querySelectorAll('.small-images img');
    
    if (mainImage && smallImages.length > 0) {
        smallImages.forEach(img => {
            img.addEventListener('click', function() {
                // Store current main image src
                const currentMainSrc = mainImage.src;
                
                // Swap images with smooth transition
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = this.src;
                    this.src = currentMainSrc;
                    mainImage.style.opacity = '1';
                }, 300);
            });
        });
    }
});

// Program Cards Animation
document.addEventListener('DOMContentLoaded', function() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});