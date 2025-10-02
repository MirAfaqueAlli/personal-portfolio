
    // Your EmailJS Credentials
    const EMAILJS_CONFIG = {
        publicKey: "KJeAsXc6VDwugq8f7",
        serviceID: "service_xhmghbu",
        templateID: "template_lkw67ci"
    };

    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // Contact form handler
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.querySelector('.contact-form');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submit');
            const originalHTML = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form values
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email
            emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                formData
            )
            .then(function(response) {
                console.log('SUCCESS!', response);
                
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Clear form
                contactForm.reset();
                
                // Show notification
                showNotification('Thank you! Your message has been sent successfully. I will get back to you soon!', 'success');
                
                // Reset button
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            })
            .catch(function(error) {
                console.error('FAILED:', error);
                
                // Error state
                submitBtn.innerHTML = '<i class="fas fa-times-circle"></i> Failed to Send';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                
                // Show error
                showNotification('Failed to send message. Please email me directly at mirafaquealli9@gmail.com', 'error');
                
                // Reset button
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            });
        });
    });

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 18px 24px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            z-index: 10000;
            max-width: 400px;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.5;
            animation: slideIn 0.4s ease;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" style="margin-right: 10px;"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    // Animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(450px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(450px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
