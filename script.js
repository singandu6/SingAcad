// ========================================
// FONCTIONS PRINCIPALES
// ========================================

// Afficher/Masquer les onglets
function showTab(tabName) {
    // Masquer tous les onglets
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Désactiver tous les boutons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Afficher l'onglet sélectionné
    document.getElementById(tabName).classList.add('active');
    
    // Activer le bouton correspondant
    event.target.classList.add('active');
}

// Scroll vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// GESTION DU FORMULAIRE
// ========================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const domaine = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        if (nom.trim() === '' || email.trim() === '' || message.trim() === '') {
            showNotification('Veuillez remplir tous les champs!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Email invalide!', 'error');
            return;
        }
        
        showNotification('Inscription confirmée! Vérifiez votre email.', 'success');
        this.reset();
    });
}

// Validation email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1.2rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.4s ease-out;
                max-width: 400px;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .notification i {
                font-size: 1.5rem;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ========================================
// NAVIGATION MOBILE
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navToggle.classList.toggle('active');
    });
}

// ========================================
// ANIMATIONS AU SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.formation-card, .domaine-card, .cert-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Ajouter l'animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INITIALISATION
// ========================================

console.log('%c🎓 SingAcad', 'font-size: 20px; font-weight: bold; color: #0052cc;');
console.log('%cPlateforme de formations professionnelles en informatique', 'font-size: 12px; color: #666;');