const API_URL = 'http://localhost:5000/api';

// Auth API functions
const auth = {
    async register(userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    async login(credentials) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }
};

// Booking API functions
const bookings = {
    async createBooking(bookingData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });
        return response.json();
    },

    async getMyBookings() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings/my-bookings`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    async updateBookingStatus(bookingId, status) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        return response.json();
    }
};

// User session management
const session = {
    setUser(userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    setToken(token) {
        localStorage.setItem('token', token);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    clear() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};

export { auth, bookings, session }; 