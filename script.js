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

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
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
              <i class="fa-solid fa-check spec-icon"></i>
              ${feature}
            </span>
          `).join('')}
        </div>
        <a href="contact.html?product=${product.id.split('-')[0]}" class="btn btn-primary btn-block" style="margin-top: var(--space-md);">Request Quote</a>
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
      <div class="section-header" style="text-align: left; margin-bottom: var(--space-xl);">
        <h2 class="section-title" style="margin-bottom: var(--space-xs);">${category.title}</h2>
        <p class="section-subtitle" style="margin-left: 0;">${category.description}</p>
      </div>
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
// Search Functionality
// ============================================

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const searchForm = document.getElementById('search-form');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }
    
    // Search across all categories
    const results = [];
    Object.keys(products).forEach(cat => {
      products[cat].forEach(product => {
        if (product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)) {
          results.push(product);
        }
      });
    });
    
    // Display results
    if (results.length > 0) {
      searchResults.innerHTML = results.map(product => `
        <a href="contact.html?product=${product.id.split('-')[0]}" class="search-result-item">
          <div class="search-result-img" style="background-image: url('${product.image}');"></div>
          <div class="search-result-info">
            <h4>${product.name}</h4>
            <p>${product.category}</p>
          </div>
        </a>
      `).join('');
      searchResults.classList.add('active');
    } else {
      searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
      searchResults.classList.add('active');
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });

  // Prevent form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

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
      productSelect.value = productParam;
    }
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    showNotification('Thank you! Your quote request has been received. We will contact you shortly.', 'success');
    
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
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#357ABD' : '#e74c3c'};
    color: white;
    padding: 15px 25px;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    font-weight: 600;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// ============================================
// Console Welcome Message
// ============================================

console.log('%c🌞 intelli | light', 'font-size: 20px; font-weight: bold; color: #357ABD;');
console.log('%cWebsite redesigned for a cleaner, modern experience.', 'font-size: 12px; color: #666;');
