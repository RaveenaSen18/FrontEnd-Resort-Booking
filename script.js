import { session } from './js/api.js';

// Simple carousel functionality for hero images and testimonials
let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;

function showNextImage() {
    images[currentImageIndex].classList.remove('visible');
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    images[currentImageIndex].classList.add('visible');
}

// Testimonials Carousel
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-carousel .testimonial');
const totalTestimonials = testimonials.length;

function showNextTestimonial() {
    testimonials[currentTestimonialIndex].classList.remove('visible');
    currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
    testimonials[currentTestimonialIndex].classList.add('visible');
}

// Automatically rotate the carousel every 5 seconds
setInterval(showNextImage, 5000);
setInterval(showNextTestimonial, 6000);



        // // Get the "Book Now" button element
        // const bookNowButton = document.getElementById('book-now-btn');

        // // Add an event listener for the button click
        // bookNowButton.addEventListener('click', function() {
        //     // Redirect to the booking page
        //     window.location.href = "book.html"; // Navigate to book.html
        // });
    


// Wait for the DOM to load before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const bookingForm = document.querySelector("form");  // Get the form
    const checkInDate = document.getElementById("check-in");
    const checkOutDate = document.getElementById("check-out");
    const guestsInput = document.getElementById("guests");

    // Function to check if check-out date is after check-in date
    function validateDates() {
        const checkIn = new Date(checkInDate.value);
        const checkOut = new Date(checkOutDate.value);

        if (checkOut <= checkIn) {
            alert("Check-out date must be later than check-in date!");
            return false; // Stop form submission
        }
        return true;
    }

    // Function to validate the form
    function validateForm(event) {
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const roomType = document.getElementById("room-type").value.trim();
        const checkIn = checkInDate.value.trim();
        const checkOut = checkOutDate.value.trim();
        const guests = guestsInput.value.trim();
        const specialRequests = document.getElementById("requests").value.trim();

        // Basic validation
        if (!fullName || !email || !roomType || !checkIn || !checkOut || !guests) {
            alert("Please fill in all required fields!");
            event.preventDefault();  // Prevent form submission
            return false;
        }

        // Validate that the number of guests is a valid number
        if (isNaN(guests) || guests <= 0) {
            alert("Please enter a valid number of guests.");
            event.preventDefault();
            return false;
        }

        // Check if the dates are valid
        if (!validateDates()) {
            event.preventDefault(); // Prevent form submission if dates are invalid
            return false;
        }

        // Optionally validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
            return false;
        }

        // All validations passed, allow form submission
        return true;
    }

    // Add event listener for form submission
    bookingForm.addEventListener("submit", function(event) {
        // Validate form before submitting
        if (!validateForm(event)) {
            event.preventDefault();  // Prevent form submission if invalid
        }
    });

    // Optional: Provide real-time feedback on number of guests
    guestsInput.addEventListener("input", function() {
        const guestsValue = guestsInput.value;
        if (guestsValue < 1) {
            guestsInput.setCustomValidity("The number of guests cannot be less than 1.");
        } else {
            guestsInput.setCustomValidity("");  // Reset validation message
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Add 'active' class to the third slide on page load
    const slides = document.querySelectorAll('.carousel-slide');
    slides[2].classList.add('default-slide');
});





function submitBooking(event) {
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const roomType = document.getElementById('room-type').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;
    const requests = document.getElementById('requests').value;

    // Build the URL for the summary page with query parameters
    const queryString = `booksummary.html?fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&roomType=${encodeURIComponent(roomType)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&guests=${encodeURIComponent(guests)}&requests=${encodeURIComponent(requests)}`;

    // Redirect to the booking summary page
    window.location.href = queryString;
}


// Function to get the query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        fullName: params.get('fullName'),
        email: params.get('email'),
        roomType: params.get('roomType'),
        checkIn: params.get('checkIn'),
        checkOut: params.get('checkOut'),
        guests: params.get('guests'),
        requests: params.get('requests')
    };
}

// Function to display the booking details
function displayBookingDetails() {
    const details = getQueryParams();

    const bookingDetailsDiv = document.getElementById('bookingDetails');
    bookingDetailsDiv.innerHTML = `
        <p><strong>Full Name:</strong> ${details.fullName}</p>
        <p><strong>Email Address:</strong> ${details.email}</p>
        <p><strong>Room Type:</strong> ${details.roomType}</p>
        <p><strong>Check-in Date:</strong> ${details.checkIn}</p>
        <p><strong>Check-out Date:</strong> ${details.checkOut}</p>
        <p><strong>Number of Guests:</strong> ${details.guests}</p>
        <p><strong>Special Requests:</strong> ${details.requests}</p>
    `;
}

// Run the displayBookingDetails function when the page loads
window.onload = displayBookingDetails;









 // Function to submit the contact form and redirect to confirmation page
 function submitContactForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Build the URL for the confirmation page with query parameters
    const queryString = `confirmation.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;

    // Redirect to the confirmation page with the data
    window.location.href = queryString;
}

 // Function to get the query parameters from the URL
 function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('fullName'),
        email: params.get('email'),
        subject: params.get('subject'),
        message: params.get('message'),
        
    };
}

// Function to display the booking confirmation details
function displayConfirmationDetails() {
    const details = getQueryParams(); // Get the booking details from the query string

    // Find the confirmation details container
    const confirmationDetailsDiv = document.getElementById('confirmationDetails');

    // Insert the booking details into the page
    confirmationDetailsDiv.innerHTML = `
        <p><strong>Full Name:</strong> ${details.fullName}</p>
        <p><strong>Email Address:</strong> ${details.email}</p>
        <p><strong>Subject:</strong> ${details.subject}</p>
        <p><strong>Message:</strong> ${details.message}</p>
    `;

        
}

// Run the displayConfirmationDetails function when the page loads
window.onload = displayConfirmationDetails;

// Check authentication status and update UI
function updateAuthUI() {
    const user = session.getUser();
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const userMenu = document.querySelector('.user-menu');

    if (user) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            const userName = userMenu.querySelector('.user-name');
            if (userName) userName.textContent = user.name;
        }
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'block';
        if (signupBtn) signupBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    session.clear();
    window.location.href = 'index.html';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // Add logout event listener
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!session.isAuthenticated()) {
                window.location.href = 'login.html';
                return;
            }

            const formData = {
                roomType: document.getElementById('roomType').value,
                checkIn: document.getElementById('checkIn').value,
                checkOut: document.getElementById('checkOut').value,
                guests: {
                    adults: parseInt(document.getElementById('adults').value),
                    children: parseInt(document.getElementById('children').value)
                },
                specialRequests: document.getElementById('specialRequests').value,
                totalPrice: calculateTotalPrice()
            };

            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.getToken()}`
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (data._id) {
                    sessionStorage.setItem('lastBooking', JSON.stringify(data));
                    window.location.href = 'confirmation.html';
                } else {
                    const errorMessage = document.getElementById('errorMessage');
                    if (errorMessage) {
                        errorMessage.textContent = data.message || 'Booking failed';
                    }
                }
            } catch (error) {
                console.error('Booking error:', error);
                const errorMessage = document.getElementById('errorMessage');
                if (errorMessage) {
                    errorMessage.textContent = 'An error occurred. Please try again.';
                }
            }
        });
    }
});

// Calculate total price for booking
function calculateTotalPrice() {
    const roomType = document.getElementById('roomType')?.value;
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    
    if (!roomType || !checkIn || !checkOut) return 0;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    const prices = {
        'Standard': 100,
        'Deluxe': 200,
        'Suite': 300,
        'Presidential': 500
    };

    return nights * prices[roomType];
}

// Update price display when dates or room type changes
function updatePriceDisplay() {
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceDisplay) {
        const totalPrice = calculateTotalPrice();
        priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

// Add event listeners for price updates
document.getElementById('roomType')?.addEventListener('change', updatePriceDisplay);
document.getElementById('checkIn')?.addEventListener('change', updatePriceDisplay);
document.getElementById('checkOut')?.addEventListener('change', updatePriceDisplay);




