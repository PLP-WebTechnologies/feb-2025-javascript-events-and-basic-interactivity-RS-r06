document.addEventListener('DOMContentLoaded', function() {
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickBtn.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            clickBtn.style.backgroundColor = '#3498db';
        }, 1000);
    });
    const hoverBox = document.getElementById('hover-box');
    const hoverOutput = document.getElementById('hover-output');
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Hover detected!';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Hover ended';
        this.style.boxShadow = 'none';
    });
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    keyInput.addEventListener('keydown', function(e) {
        keyOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
    });
    const secretBox = document.getElementById('secret-box');

    secretBox.addEventListener('dblclick', function() {

        this.classList.add('activated');

        this.innerHTML = '<p>🎉 SURPRISEEEEEEEEE! 🎉</p>';
        setTimeout(() => {
            this.classList.remove('activated');
        }, 2000);
    });
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
    });
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    prevBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = galleryImages.length - 1;

        showImage(newIndex);

    });

    nextBtn.addEventListener('click', function() {

        let newIndex = currentImageIndex + 1;

        if (newIndex >= galleryImages.length) newIndex = 0;

        showImage(newIndex);

    });


    setInterval(() => {

        let newIndex = currentImageIndex + 1;

        if (newIndex >= galleryImages.length) newIndex = 0;

        showImage(newIndex);

    }, 3000);


    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {

        btn.addEventListener('click', function() {

            const content = this.nextElementSibling;

            const isActive = content.classList.contains('active');

            document.querySelectorAll('.accordion-content').forEach(item => {

                item.classList.remove('active');

            });

            if (!isActive) {

                content.classList.add('active');

            }

        });

    });

    const form = document.getElementById('validation-form');

    const nameInput = document.getElementById('name');

    const emailInput = document.getElementById('email');

    const passwordInput = document.getElementById('password');

    const nameError = document.getElementById('name-error');

    const emailError = document.getElementById('email-error');

    const passwordError = document.getElementById('password-error');

    const strengthMeter = document.getElementById('strength-meter');
    nameInput.addEventListener('input', validateName);

    emailInput.addEventListener('input', validateEmail);

    passwordInput.addEventListener('input', validatePassword);

    function validateName() {

        if (nameInput.value.trim() === '') {

            nameError.textContent = 'Name is required';

            nameInput.classList.add('invalid');

            nameInput.classList.remove('valid');

            return false;

        } else {

            nameError.textContent = '';

            nameInput.classList.remove('invalid');

            nameInput.classList.add('valid');

            return true;

        }

    }

    function validateEmail() {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === '') {

            emailError.textContent = '';

            emailInput.classList.remove('invalid');

            emailInput.classList.remove('valid');

            return false;

        } else if (!emailRegex.test(emailInput.value)) {

            emailError.textContent = 'Please enter a valid email address';

            emailInput.classList.add('invalid');

            emailInput.classList.remove('valid');

            return false;

        } else {

            emailError.textContent = '';

            emailInput.classList.remove('invalid');

            emailInput.classList.add('valid');

            return true;

        }

    }

    function validatePassword() {

        if (passwordInput.value.trim() === '') {

            passwordError.textContent = '';

            passwordInput.classList.remove('invalid');

            passwordInput.classList.remove('valid');

            strengthMeter.style.width = '0';

            strengthMeter.style.backgroundColor = 'transparent';

            return false;

        } else if (passwordInput.value.length < 8) {

            passwordError.textContent = 'Password must be at least 8 characters';

            passwordInput.classList.add('invalid');

            passwordInput.classList.remove('valid');

            strengthMeter.style.width = '30%';

            strengthMeter.style.backgroundColor = '#e74c3c';

            return false;

        } else {

            passwordError.textContent = '';

            passwordInput.classList.remove('invalid');

            passwordInput.classList.add('valid');
            let strength = 0;
            if (passwordInput.value.length >= 8) strength += 30;
            if (/[A-Z]/.test(passwordInput.value)) strength += 20;
            if (/[0-9]/.test(passwordInput.value)) strength += 20;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength += 30;
            strengthMeter.style.width = `${strength}%`;
            if (strength < 50) {
                strengthMeter.style.backgroundColor = '#e74c3c';
            } else if (strength < 80) {
                strengthMeter.style.backgroundColor = '#f39c12';
            } else {
                strengthMeter.style.backgroundColor = '#2ecc71';
            }
            return true;
        }
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            strengthMeter.style.width = '0';
        } else {
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 400);
        }
    });
});
