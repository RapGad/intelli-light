// ============================================
// intelli | light - Interactive JavaScript
// ============================================

// Product Data
const products = {
  garden: [
    {
      id: 'garden-1',
      name: 'Classic Garden Light',
      category: 'Garden Lights',
      description: 'Elegant solar garden light with warm white LED. Perfect for pathways, gardens, and outdoor decorative lighting.',
      image: 'images/solar-garden-light.png',
      features: ['300 Lumens', '8-10h Runtime', 'IP65 Waterproof', 'Auto On/Off'],
      badge: 'Popular'
    },
    {
      id: 'garden-2',
      name: 'Premium Garden Post',
      category: 'Garden Lights',
      description: 'High-end solar garden post light with adjustable height and enhanced brightness for larger outdoor spaces.',
      image: 'images/solar-garden-light.png',
      features: ['400 Lumens', '10-12h Runtime', 'IP65 Waterproof', 'Adjustable'],
      badge: 'Premium'
    }
  ],
  wall: [
    {
      id: 'wall-1',
      name: 'Motion Sensor Wall Light',
      category: 'Wall Lights',
      description: 'Smart solar wall light with PIR motion sensor. Ideal for entryways, patios, and security lighting.',
      image: 'images/solar-wall-light.png',
      features: ['500 Lumens', 'Motion Sensor', 'IP65 Waterproof', '3 Modes'],
      badge: 'Smart'
    },
    {
      id: 'wall-2',
      name: 'Decorative Wall Sconce',
      category: 'Wall Lights',
      description: 'Elegant solar wall sconce with modern design. Perfect for architectural accent and ambient lighting.',
      image: 'images/solar-wall-light.png',
      features: ['400 Lumens', '12h Runtime', 'IP65 Waterproof', 'Elegant Design'],
      badge: 'New'
    }
  ],
  street: [
    {
      id: 'street-1',
      name: 'Residential Street Light',
      category: 'Street Lights',
      description: 'Powerful solar street light for residential areas, driveways, and parking lots. Professional-grade illumination.',
      image: 'images/solar-street-light.png',
      features: ['3000 Lumens', '15h Runtime', 'IP66 Waterproof', 'Auto Sensor'],
      badge: 'Professional'
    },
    {
      id: 'street-2',
      name: 'Commercial Street Light',
      category: 'Street Lights',
      description: 'High-power solar street light for commercial applications. Maximum brightness and extended runtime.',
      image: 'images/solar-street-light.png',
      features: ['4000 Lumens', '18h Runtime', 'IP66 Waterproof', 'Heavy Duty'],
      badge: 'Commercial'
    }
  ],
  flood: [
    {
      id: 'flood-1',
      name: 'Security Flood Light',
      category: 'Flood Lights',
      description: 'High-intensity solar flood light with motion detection. Perfect for security and landscape lighting.',
      image: 'images/solar-flood-light.png',
      features: ['2000 Lumens', 'Motion Sensor', 'IP66 Waterproof', '120° Beam'],
      badge: 'Security'
    },
    {
      id: 'flood-2',
      name: 'Landscape Flood Light',
      category: 'Flood Lights',
      description: 'Adjustable solar flood light for landscape and architectural lighting. Wide-angle illumination.',
      image: 'images/solar-flood-light.png',
      features: ['1800 Lumens', 'Adjustable', 'IP66 Waterproof', 'Wide Angle'],
      badge: 'Versatile'
    }
  ]
};

// ============================================
// Navigation & Scroll Effects
// ============================================

// ============================================
// Navigation & Scroll Effects
// ============================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  lastScroll = currentScroll;
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

// ============================================
// Dynamic Product Loading
// ============================================

function createProductCard(product) {
  return `
    <div class="product-card fade-in">
      <div class="product-image" style="background-image: url('${product.image}');">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-specs">
          ${product.features.map(feature => `
            <span class="spec-item">
              <span class="spec-icon">✓</span>
              ${feature}
            </span>
          `).join('')}
        </div>
        <a href="contact.html?product=${product.category.toLowerCase().includes('garden') ? 'garden' : product.category.toLowerCase().includes('wall') ? 'wall' : product.category.toLowerCase().includes('street') ? 'street' : 'flood'}" class="btn btn-secondary btn-sm" style="width: 100%; margin-top: var(--space-md); justify-content: center;">Request Quote</a>
      </div>
    </div>
  `;
}

function loadProducts() {
  const container = document.getElementById('products-container');
  
  // Only load products if the container exists (i.e., on the products page)
  if (!container) return;
  
  // Create category sections
  const categories = [
    { key: 'garden', title: 'Solar Garden Lights', description: 'Elegant pathway and decorative lighting for gardens and outdoor spaces' },
    { key: 'wall', title: 'Solar Wall Lights', description: 'Smart wall-mounted lights for entryways, patios, and security' },
    { key: 'street', title: 'Solar Street Lights', description: 'Professional-grade lighting for streets, driveways, and parking areas' },
    { key: 'flood', title: 'Solar Flood Lights', description: 'High-intensity lighting for security and landscape illumination' }
  ];
  
  categories.forEach(category => {
    const categorySection = document.createElement('div');
    categorySection.className = 'fade-in';
    categorySection.style.marginBottom = 'var(--space-3xl)';
    
    categorySection.innerHTML = `
      <h3 class="mt-xl mb-md" style="font-size: var(--font-size-3xl); color: var(--color-primary);">${category.title}</h3>
      <p class="mb-lg" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">${category.description}</p>
      <div class="products-grid">
        ${products[category.key].map(product => createProductCard(product)).join('')}
      </div>
    `;
    
    container.appendChild(categorySection);
  });
  
  // Re-observe new fade-in elements
  const newFadeElements = container.querySelectorAll('.fade-in');
  newFadeElements.forEach(el => observer.observe(el));
}

// Load products when DOM is ready
document.addEventListener('DOMContentLoaded', loadProducts);

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contact-form');

// Handle URL parameters for pre-selecting product
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get('product');
  
  if (productParam) {
    const productSelect = document.getElementById('product');
    if (productSelect) {
      // Find the option with the matching value
      const option = productSelect.querySelector(`option[value="${productParam}"]`);
      if (option) {
        productSelect.value = productParam;
      }
    }
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      product: document.getElementById('product').value,
      message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission (in production, this would send to a server)
    console.log('Form submitted:', formData);
    
    // Show success message
    showNotification('Thank you for your inquiry! We\'ll get back to you within 24 hours.', 'success');
    
    // Reset form
    contactForm.reset();
  });
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'success') {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'var(--gradient-primary)' : 'var(--color-error)'};
    color: var(--color-bg-primary);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-xl);
    z-index: var(--z-tooltip);
    font-weight: 600;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// Performance Optimizations
// ============================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Debounce scroll events for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
  // Any additional scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// Console Welcome Message
// ============================================

console.log('%c🌞 intelli | light', 'font-size: 24px; font-weight: bold; color: #00ff88;');
console.log('%cIlluminating the future with sustainable solar energy', 'font-size: 14px; color: #b8c5d6;');
console.log('%cWebsite loaded successfully ✓', 'font-size: 12px; color: #00ff88;');
