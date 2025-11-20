document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) {
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        await simulateFormSubmission();

        submitButton.classList.remove('loading');
        submitButton.disabled = false;

        formSuccess.classList.add('show');
        form.reset();
        clearErrors(form);

        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    });

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;

    if (!value) {
        showError(field, errorElement, 'This field is required');
        return false;
    }

    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, errorElement, 'Please enter a valid email address');
            return false;
        }
    }

    if (field.id === 'message' && value.length < 10) {
        showError(field, errorElement, 'Message must be at least 10 characters');
        return false;
    }

    clearError(field, errorElement);
    return true;
}

function showError(field, errorElement, message) {
    field.classList.add('error');
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    }
}

function clearError(field, errorElement) {
    field.classList.remove('error');
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
    }
}

function clearErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });

    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
    });
}

function simulateFormSubmission() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}
