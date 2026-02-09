// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Full Stack Developer", "Web Designer", "Problem Solver", "Tech Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animation for Skills Progress Bars
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Load Projects Dynamically
const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with payment integration",
        image: "https://via.placeholder.com/400x250",
        tags: ["React", "Node.js", "MongoDB"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        image: "https://via.placeholder.com/400x250",
        tags: ["Vue.js", "Firebase", "Tailwind"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media management",
        image: "https://via.placeholder.com/400x250",
        tags: ["React", "Chart.js", "Express"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        title: "Portfolio Website",
        description: "Personal portfolio website with modern design",
        image: "https://via.placeholder.com/400x250",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        title: "Weather App",
        description: "Real-time weather application with location tracking",
        image: "https://via.placeholder.com/400x250",
        tags: ["React", "API", "CSS3"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        title: "Blog Platform",
        description: "Full-featured blogging platform with CMS",
        image: "https://via.placeholder.com/400x250",
        tags: ["Next.js", "Prisma", "PostgreSQL"],
        github: "https://github.com",
        demo: "https://demo.com"
    }
];

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank">GitHub</a>
                    <a href="${project.demo}" target="_blank">Live Demo</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value
    };

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .about-img, .about-text');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial styles for reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .about-img, .about-text');
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
    });
});

window.addEventListener('scroll', reveal);
reveal(); // Call once on load