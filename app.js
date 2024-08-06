// Hamburger menu functionality
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active'); // Close menu on item click
        mobile_menu.classList.remove('active');
    });
});

// Project items animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');

    const animateOnScroll = () => {
        projectItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) { // Trigger when the item is within 100px of the viewport
                item.classList.add('animated');
            }
        });
    };

    // Initial check
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// WhatsApp button functionality (example)
document.querySelector('.whatsapp-button').addEventListener('click', function(e) {
    // Custom functionality, like analytics tracking
    console.log('WhatsApp button clicked');
});

// "Read More" functionality for services
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-item').forEach(item => {
        const moreText = item.querySelector('.more-text');
        const dots = item.querySelector('.dots');
        const button = item.querySelector('.read-more');
        const applyNowButton = item.querySelector('.apply-now');

        // Initial state: hide the extra text, show the dots, and hide the Apply Now button
        moreText.style.display = 'none';
        dots.style.display = 'inline';
        button.textContent = 'Read More';
        if (applyNowButton) {
            applyNowButton.classList.add('hidden');
        }

        // Add event listener for the button
        button.addEventListener('click', function() {
            if (moreText.style.display === 'none') {
                moreText.style.display = 'inline';
                dots.style.display = 'none';
                button.textContent = 'Read Less';
                if (applyNowButton) {
                    applyNowButton.classList.remove('hidden');
                }
            } else {
                moreText.style.display = 'none';
                dots.style.display = 'inline';
                button.textContent = 'Read More';
                if (applyNowButton) {
                    applyNowButton.classList.add('hidden');
                }
            }
        });
    });
});

// Header background color change on scroll
document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

// Reveal text one word at a time in "About Me" section
document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('#about .word');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    words.forEach((word, index) => {
        observer.observe(word);
        // Optionally, you can add a delay to each word based on its index
        word.style.transitionDelay = `${index * 0.1}s`; // Adjust delay as needed
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const applyNowButton = document.querySelector('.apply-now');
    const modal = document.createElement('div'); // Create a modal container
    modal.classList.add('modal'); // Add modal class

    // Function to open modal
    const openModal = () => {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <form id="enquiryForm">
                    <h3>Apply for Part-Time Jobs</h3>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required><br><br>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required><br><br>
                    <label for="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" required><br><br>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal); // Append modal to the body
        modal.style.display = 'block'; // Display modal
    };

    // Function to close modal
    const closeModal = () => {
        modal.style.display = 'none'; // Hide modal
        modal.innerHTML = ''; // Clear modal content
    };

    // Event listener for "Apply Now" button click
    applyNowButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        openModal(); // Open the modal
    });

    // Event listener to close modal when close button (×) is clicked
    modal.addEventListener('click', function(event) {
        if (event.target.classList.contains('close')) {
            closeModal();
        }
    });

    // Handle form submission
    modal.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const enquiryForm = document.getElementById('enquiryForm');
        const formData = new FormData(enquiryForm);
        console.log('Form submitted:', formData); // Log form data (you can send it to server here)
        closeModal(); // Close modal after form submission
        // Optionally, you can show a success message or perform other actions
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.getElementById('loginToggle');
    const loginModal = document.getElementById('loginModal');
    const closeModalButton = loginModal.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Function to open login modal
    const openLoginModal = () => {
        loginModal.style.display = 'block';
        loginForm.style.display = 'block'; // Initially show login form
        signupForm.style.display = 'none';
    };

    // Function to close modal
    const closeModal = () => {
        loginModal.style.display = 'none';
    };

    // Event listener for loginToggle button
    loginToggle.addEventListener('click', function() {
        openLoginModal();
    });

    // Event listener for close button
    closeModalButton.addEventListener('click', function() {
        closeModal();
    });

    // Close modal if user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeModal();
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission for demo purposes
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login Form Submitted - Username:', username, 'Password:', password);
        // You can add AJAX fetch or XMLHttpRequest to send data to server
        // Example: fetch('your-api-endpoint', { method: 'POST', body: formData });
        closeModal(); // Close modal after submission
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission for demo purposes
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        console.log('Sign Up Form Submitted - Username:', username, 'Email:', email, 'Password:', password);
        // You can add AJAX fetch or XMLHttpRequest to send data to server
        // Example: fetch('your-api-endpoint', { method: 'POST', body: formData });
        closeModal(); // Close modal after submission
    });
});


var loader = document.getElementById("preloader");

window.addEventListener("load", function(){
    loader.style.display= "none";

})