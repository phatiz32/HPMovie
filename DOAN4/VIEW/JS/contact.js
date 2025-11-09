// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('contactForm');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const phoneInput = document.getElementById('phone');

    // Initialize
    setupEventListeners();

    function setupEventListeners() {
        // Contact form submission
        contactForm.addEventListener('submit', handleFormSubmit);

        // FAQ toggle
        faqQuestions.forEach(question => {
            question.addEventListener('click', toggleFAQ);
        });

        // Phone number validation
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value.length > 10) {
                    this.value = this.value.slice(0, 10);
                }
            });
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Submit form (simulated)
        submitContactForm(data);
    }

    function validateForm(data) {
        // Basic validation
        if (!data.name.trim()) {
            alert('Vui lòng nhập họ và tên');
            return false;
        }

        if (!data.phone.trim()) {
            alert('Vui lòng nhập số điện thoại');
            return false;
        }

        if (!isValidPhone(data.phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ');
            return false;
        }

        if (!data.email.trim()) {
            alert('Vui lòng nhập email');
            return false;
        }

        if (!isValidEmail(data.email)) {
            alert('Vui lòng nhập email hợp lệ');
            return false;
        }

        if (!data.subject) {
            alert('Vui lòng chọn chủ đề');
            return false;
        }

        if (!data.message.trim()) {
            alert('Vui lòng nhập nội dung tin nhắn');
            return false;
        }

        return true;
    }

    function submitContactForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // In real application, this would be an API call to your backend
            console.log('Contact form submission:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    function showSuccessMessage() {
        // Create success message element
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message show';
        successMsg.textContent = 'Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.';
        
        // Insert before form
        contactForm.parentNode.insertBefore(successMsg, contactForm);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
    }

    function toggleFAQ() {
        const answer = this.nextElementSibling;
        const toggle = this.querySelector('.faq-toggle');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
                item.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.faq-toggle').forEach(item => {
            if (item !== toggle) {
                item.textContent = '+';
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('active');
        toggle.textContent = answer.classList.contains('active') ? '−' : '+';
    }

    function isValidPhone(phone) {
        return /^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Initialize FAQ - close all answers by default
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('active');
    });
});