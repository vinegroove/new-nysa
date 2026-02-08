// Nysa - Static Site JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu && !event.target.closest('.nav-container')) {
      mobileMenu.classList.remove('active');
    }
  });
  
  // Article filtering on Learn More page
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const topic = this.getAttribute('data-topic');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter articles
        articleCards.forEach(card => {
          const cardTopic = card.getAttribute('data-topic');
          if (topic === 'all' || cardTopic === topic) {
            card.style.display = '';
            card.classList.add('fade-in');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Set first button as active by default
    if (filterButtons.length > 0) {
      filterButtons[0].classList.add('active');
    }
  }
});

// Add fade-in animation for filtered items
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }
`;
document.head.appendChild(style);
