// Initialize fullPage.js
new fullpage('#fullpage', {
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Intro', 'About', 'Skills', 'Projects', 'Contact'],
    showActiveTooltip: true,
    scrollingSpeed: 1000,
    responsiveWidth: 768,
    afterLoad: function(origin, destination, direction) {
        updateSectionTitle();
    },
    onLeave: function(origin, destination, direction) {
        const titles = document.querySelectorAll('.typing');
        if (destination.index === 0) {
            // When returning to intro section
            titles[0].classList.remove('hidden');
            titles[0].classList.add('visible');
            titles[1].classList.add('hidden');
            titles[1].classList.remove('visible');
        } else if (origin.index === 0) {
            // When leaving intro section
            titles[0].classList.add('hidden');
            titles[0].classList.remove('visible');
            titles[1].classList.remove('hidden');
            titles[1].classList.add('visible');
        }
        
        // Update section title
        updateSectionTitle(destination.index);
    }
});

// Typing animation for intro section
const typingText = document.querySelector('.typing');
const text = typingText.textContent;
typingText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when intro section is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-level');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-width', width);
    observer.observe(bar);
});

// Copy email to clipboard
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            alert('Email copied to clipboard!');
        });
    });
}

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Showcase Section Animation
const showcaseSection = document.querySelector('#showcase');
const imageContainers = document.querySelectorAll('.image-container');
const showcaseText = document.querySelector('.showcase-text');

// Initial animation for showcase text
gsap.from(showcaseText, {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: showcaseSection,
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none reverse"
  }
});

// Image container animations
imageContainers.forEach((container, index) => {
  const image = container.querySelector('.showcase-image');
  const text = container.querySelector('.image-text');
  
  // Create a timeline for each container
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      pin: true,
      pinSpacing: true
    }
  });
  
  // Add animations to the timeline
  tl.fromTo(container,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1 }
  )
  .fromTo(image,
    { scale: 1.2 },
    { scale: 1, duration: 1 },
    "-=0.5"
  )
  .fromTo(text,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    "-=0.5"
  );
  
  // Add class when container is active
  ScrollTrigger.create({
    trigger: container,
    start: "top center",
    end: "bottom center",
    onEnter: () => container.classList.add('active'),
    onLeaveBack: () => container.classList.remove('active')
  });
});

// Section titles
const sectionTitles = {
    'intro': 'Home',
    'about': 'About Me',
    'skills': 'Skills',
    'projects': 'Projects',
    'contact': 'Contact'
};

// Function to update section title
function updateSectionTitle(sectionIndex) {
    const sectionTitles = ['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'];
    const titleElement = document.querySelector('.section-title');
    if (titleElement) {
        titleElement.textContent = sectionTitles[sectionIndex];
    }
}

// Add scroll event listener for smooth text swap
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const introSection = document.getElementById('intro');
    const rect = introSection.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const titles = document.querySelectorAll('.typing');
    
    if (rect.top >= 0) {
        // When intro section is fully visible
        titles[0].classList.remove('hidden');
        titles[0].classList.add('visible');
        titles[1].classList.add('hidden');
        titles[1].classList.remove('visible');
    } else {
        // When scrolling past intro section
        titles[0].classList.add('hidden');
        titles[0].classList.remove('visible');
        titles[1].classList.remove('hidden');
        titles[1].classList.add('visible');
    }
    
    lastScrollTop = scrollTop;
});

// Initial title update
updateSectionTitle(0);
