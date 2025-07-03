// Validation utility functions
const validation = {
    // Email validation
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Password validation
    isValidPassword: (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    },

    // Name validation
    isValidName: (name) => {
        return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
    },

    // Get password requirements message
    getPasswordRequirements: () => {
        return [
            'At least 8 characters',
            'At least one uppercase letter',
            'At least one lowercase letter',
            'At least one number',
            'At least one special character (@$!%*?&)'
        ];
    },

    // Show error message
    showError: (element, message) => {
        element.textContent = message;
        element.style.display = 'block';
    },

    // Hide error message
    hideError: (element) => {
        element.textContent = '';
        element.style.display = 'none';
    },

    // Validate signup form
    validateSignupForm: (formData) => {
        const errors = [];

        // Name validation
        if (!validation.isValidName(formData.name)) {
            errors.push('Please enter a valid name (letters and spaces only)');
        }

        // Email validation
        if (!validation.isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        // Password validation
        if (!validation.isValidPassword(formData.password)) {
            errors.push('Password does not meet requirements');
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            errors.push('Passwords do not match');
        }

        return errors;
    },

    // Validate login form
    validateLoginForm: (formData) => {
        const errors = [];

        // Email validation
        if (!validation.isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        // Password validation
        if (!formData.password) {
            errors.push('Password is required');
        }

        return errors;
    },

    // Real-time password validation
    validatePasswordStrength: (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[@$!%*?&]/.test(password)
        };

        return {
            isValid: Object.values(requirements).every(Boolean),
            requirements
        };
    }
};

export default validation; 