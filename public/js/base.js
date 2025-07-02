// Common utility functions
const utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    // Handle form submission
    handleFormSubmit: async (form, endpoint, options = {}) => {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                ...options
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            return result;
        } catch (error) {
            utils.showNotification(error.message, 'error');
            throw error;
        }
    },

    // Validate form fields
    validateForm: (form, rules) => {
        const errors = {};
        const formData = new FormData(form);

        for (const [field, rule] of Object.entries(rules)) {
            const value = formData.get(field);
            
            if (rule.required && !value) {
                errors[field] = 'This field is required';
                continue;
            }

            if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors[field] = 'Please enter a valid email address';
            }

            if (rule.minLength && value.length < rule.minLength) {
                errors[field] = `Must be at least ${rule.minLength} characters`;
            }

            if (rule.maxLength && value.length > rule.maxLength) {
                errors[field] = `Must be no more than ${rule.maxLength} characters`;
            }
        }

        return errors;
    },

    // Show form errors
    showFormErrors: (form, errors) => {
        for (const [field, message] of Object.entries(errors)) {
            const input = form.querySelector(`[name="${field}"]`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            input.classList.add('error');
            input.parentNode.appendChild(errorDiv);
        }
    },

    // Clear form errors
    clearFormErrors: (form) => {
        form.querySelectorAll('.error-message').forEach(error => error.remove());
        form.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background-color: var(--success-color);
        }
        
        .notification.error {
            background-color: var(--error-color);
        }
        
        .notification.info {
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);

    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const endpoint = form.dataset.endpoint;
            if (!endpoint) return;

            try {
                await utils.handleFormSubmit(form, endpoint);
                utils.showNotification('Form submitted successfully', 'success');
                form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
            }
        });
    });
}); 