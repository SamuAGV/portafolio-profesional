// Enhanced JavaScript with modern syntax, better performance, and improved organization
document.addEventListener("DOMContentLoaded", () => {
    // Organized into modules for better maintainability
    const UI = {
      // DOM Elements
      elements: {
        preloader: document.getElementById("preloader"),
        themeToggle: document.querySelector(".theme-toggle"),
        body: document.body,
        hamburger: document.querySelector(".hamburger"),
        navLinks: document.querySelector(".nav-links"),
        navbar: document.getElementById("navbar"),
        backToTopButton: document.querySelector(".back-to-top"),
        sections: document.querySelectorAll("section"),
        navItems: document.querySelectorAll(".nav-link"),
        tabButtons: document.querySelectorAll(".tab-btn"),
        tabContents: document.querySelectorAll(".tab-content"),
        filterButtons: document.querySelectorAll(".filter-btn"),
        projects: document.querySelectorAll(".project"),
        contactForm: document.getElementById("contact-form"),
        modal: document.getElementById("imageModal"),
        modalImg: document.getElementById("modalImage"),
        modalCaption: document.getElementById("modalCaption"),
        closeBtn: document.querySelector(".close"),
        currentYear: document.getElementById("current-year")
      },
      
      // Initialize UI components
      init() {
        this.setupPreloader();
        this.setupThemeToggle();
        this.setupMobileNavigation();
        this.setupScrollEvents();
        this.setupSkillsTabs();
        this.setupProjectsFilter();
        this.setupFormSubmission();
        this.setupModal();
        this.setupTypedText();
        this.setupParticles();
        this.setCurrentYear();
        
        // Run animations on initial load
        setTimeout(() => {
          Animations.animateOnScroll();
        }, 500);
      },
      
      // Preloader setup
      setupPreloader() {
        window.addEventListener("load", () => {
          this.elements.preloader.style.opacity = "0";
          setTimeout(() => {
            this.elements.preloader.style.display = "none";
          }, 500);
        });
      },
      
      // Theme toggle functionality with localStorage
      setupThemeToggle() {
        const { themeToggle, body } = this.elements;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
          body.classList.add("light-mode");
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener("click", () => {
          body.classList.toggle("light-mode");
          
          if (body.classList.contains("light-mode")) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "light");
          } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "dark");
          }
        });
      },
      
      // Mobile navigation with improved accessibility
      setupMobileNavigation() {
        const { hamburger, navLinks } = this.elements;
        
        hamburger.addEventListener("click", () => {
          hamburger.classList.toggle("active");
          navLinks.classList.toggle("active");
          
          // Improve accessibility
          const isExpanded = hamburger.classList.contains("active");
          hamburger.setAttribute("aria-expanded", isExpanded);
          navLinks.setAttribute("aria-hidden", !isExpanded);
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", false);
            navLinks.setAttribute("aria-hidden", true);
          });
        });
      },
      
      // Scroll-related events (sticky nav, back-to-top, active nav)
      setupScrollEvents() {
        const { navbar, backToTopButton, sections, navItems } = this.elements;
        
        // Throttle scroll events for better performance
        let scrollTimeout;
        window.addEventListener("scroll", () => {
          if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
              // Sticky navigation
              if (window.scrollY > 100) {
                navbar.classList.add("scrolled");
              } else {
                navbar.classList.remove("scrolled");
              }
              
              // Back to top button visibility
              if (window.scrollY > 300) {
                backToTopButton.classList.add("visible");
              } else {
                backToTopButton.classList.remove("visible");
              }
              
              // Active navigation based on scroll position
              this.setActiveNavItem();
              
              // Run animations on scroll
              Animations.animateOnScroll();
              
              scrollTimeout = null;
            }, 20); // 50fps throttle
          }
        });
        
        // Smooth scrolling with improved behavior
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              const navHeight = document.querySelector("nav").offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
              
              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            }
          });
        });
      },
      
      // Set active navigation item based on scroll position
      setActiveNavItem() {
        const { sections, navItems } = this.elements;
        let current = "";
        
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
          }
        });
        
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
            // Improve accessibility
            item.setAttribute("aria-current", "page");
          } else {
            item.removeAttribute("aria-current");
          }
        });
      },
      
      // Skills tabs functionality
      setupSkillsTabs() {
        const { tabButtons, tabContents } = this.elements;
        
        tabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const target = button.dataset.target;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach((btn) => {
              btn.classList.remove("active");
              btn.setAttribute("aria-selected", "false");
            });
            
            tabContents.forEach((content) => {
              content.classList.remove("active");
              content.setAttribute("aria-hidden", "true");
            });
            
            // Add active class to clicked button and corresponding content
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            
            const targetContent = document.getElementById(target);
            targetContent.classList.add("active");
            targetContent.setAttribute("aria-hidden", "false");
            
            // Animate skill bars in the active tab
            Animations.animateSkillBars();
          });
        });
      },
      
      // Projects filter with improved animations
      setupProjectsFilter() {
        const { filterButtons, projects } = this.elements;
        
        filterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            
            // Remove active class from all buttons
            filterButtons.forEach((btn) => {
              btn.classList.remove("active");
              btn.setAttribute("aria-pressed", "false");
            });
            
            // Add active class to clicked button
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            
            // Filter projects with staggered animations
            projects.forEach((project, index) => {
              // Use setTimeout for staggered effect
              setTimeout(() => {
                if (filter === "all" || project.dataset.category === filter) {
                  project.style.display = "block";
                  setTimeout(() => {
                    project.style.opacity = "1";
                    project.style.transform = "scale(1)";
                  }, 50);
                } else {
                  project.style.opacity = "0";
                  project.style.transform = "scale(0.8)";
                  setTimeout(() => {
                    project.style.display = "none";
                  }, 300);
                }
              }, index * 50); // Stagger the animations
            });
          });
        });
      },
      
      // Form submission with validation and feedback
      setupFormSubmission() {
        const { contactForm } = this.elements;
        
        if (contactForm) {
          contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            const { name, email, subject = "Contacto desde Portfolio", message } = formValues;
            
            // Validate form data
            if (!this.validateForm(formValues)) {
              return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector(".btn-submit");
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            try {
              // Send data to server or email service
              const response = await fetch("https://formspree.io/f/your-form-id", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, subject, message }),
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.message || "Error en el envío del formulario");
              }
              
              // Reset form
              contactForm.reset();
              
              // Show success message with custom toast
              this.showToast("¡Gracias por tu mensaje! Te contactaré pronto.", "success");
            } catch (error) {
              console.error("Error:", error);
              
              // Show error message
              this.showToast("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.", "error");
            } finally {
              // Reset button
              submitButton.innerHTML = originalButtonText;
              submitButton.disabled = false;
            }
          });
        }
      },
      
      // Form validation
      validateForm(formValues) {
        const { name, email, message } = formValues;
        
        if (!name || !email || !message) {
          this.showToast("Por favor, completa todos los campos requeridos.", "error");
          return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          this.showToast("Por favor, introduce un correo electrónico válido.", "error");
          return false;
        }
        
        return true;
      },
      
      // Custom toast notification
      showToast(message, type = "info") {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
          toastContainer = document.createElement("div");
          toastContainer.className = "toast-container";
          document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
          <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
          </div>
          <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
          toast.classList.add("show");
        }, 10);
        
        // Close button functionality
        toast.querySelector(".toast-close").addEventListener("click", () => {
          toast.classList.remove("show");
          setTimeout(() => {
            toast.remove();
          }, 300);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
          if (toast.parentNode) {
            toast.classList.remove("show");
            setTimeout(() => {
              if (toast.parentNode) {
                toast.remove();
              }
            }, 300);
          }
        }, 5000);
      },
      
      // Modal for project images
      setupModal() {
        const { modal, modalImg, modalCaption, closeBtn } = this.elements;
        
        // Function to open modal (exposed globally)
        window.openModal = (imageSrc, caption) => {
          modal.style.display = "block";
          modalImg.src = imageSrc;
          modalCaption.innerHTML = caption || "";
          document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
          
          // Improve accessibility
          modal.setAttribute("aria-hidden", "false");
          document.querySelector("main")?.setAttribute("aria-hidden", "true");
          
          // Set focus to close button
          setTimeout(() => {
            closeBtn.focus();
          }, 100);
        };
        
        // Close modal function
        const closeModal = () => {
          modal.style.display = "none";
          document.body.style.overflow = "auto"; // Re-enable scrolling
          
          // Improve accessibility
          modal.setAttribute("aria-hidden", "true");
          document.querySelector("main")?.setAttribute("aria-hidden", "false");
        };
        
        // Close modal when clicking on X
        closeBtn.addEventListener("click", closeModal);
        
        // Close modal when clicking outside the image
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            closeModal();
          }
        });
        
        // Close modal with Escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && modal.style.display === "block") {
            closeModal();
          }
        });
      },
      
      // Typed.js for header text animation
      setupTypedText() {
        if (document.getElementById("typed")) {
          // Check if Typed is available globally
          if (typeof Typed !== 'undefined') {
            new Typed("#typed", {
              strings: ["Desarrollador Web", "Desarrollador Móvil", "Programador Laravel", "Full Stack Junior", "Cloud Developer (AWS)", "Freelancer"],
              typeSpeed: 50,
              backSpeed: 30,
              backDelay: 2000,
              loop: true,
              showCursor: true,
              cursorChar: "|",
            });
          } else {
            console.warn("Typed.js is not loaded");
          }
        }
      },
      
      // Particles.js for header background
      setupParticles() {
        if (document.getElementById("particles-js")) {
          // Check if particlesJS is available globally
          if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", {
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: "#4a8eff",
                },
                shape: {
                  type: "circle",
                },
                opacity: {
                  value: 0.5,
                  random: false,
                },
                size: {
                  value: 3,
                  random: true,
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#4a8eff",
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab",
                  },
                  onclick: {
                    enable: true,
                    mode: "push",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 140,
                    line_linked: {
                      opacity: 1,
                    },
                  },
                  push: {
                    particles_nb: 4,
                  },
                },
              },
              retina_detect: true,
            });
          } else {
            console.warn("particles.js is not loaded");
          }
        }
      },
      
      // Set current year in footer
      setCurrentYear() {
        if (this.elements.currentYear) {
          this.elements.currentYear.textContent = new Date().getFullYear();
        }
      }
    };
    
    // Animations module
    const Animations = {
      // Check if element is in viewport
      isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && 
          rect.bottom >= 0
        );
      },
      
      // Animate skill bars
      animateSkillBars() {
        const skillBars = document.querySelectorAll(".skill-progress");
        
        skillBars.forEach((bar) => {
          if (this.isInViewport(bar) && !bar.classList.contains("animated")) {
            bar.classList.add("animated");
            const progress = bar.getAttribute("data-progress");
            bar.style.width = progress;
          }
        });
      },
      
      // Animate counter with improved performance
      animateCounter() {
        const counters = document.querySelectorAll(".stat-number");
        
        counters.forEach((counter) => {
          if (this.isInViewport(counter) && !counter.classList.contains("animated")) {
            counter.classList.add("animated");
            
            const target = parseInt(counter.getAttribute("data-count"), 10);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              
              // Easing function for smoother animation
              const easeOutQuad = t => t * (2 - t);
              const easedProgress = easeOutQuad(progress);
              
              const currentCount = Math.floor(easedProgress * target);
              counter.textContent = currentCount.toLocaleString();
              
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target.toLocaleString();
              }
            };
            
            requestAnimationFrame(updateCounter);
          }
        });
      },
      
      // Animate elements on scroll
      animateOnScroll() {
        // Fade in elements
        const fadeElements = document.querySelectorAll(".fade-in:not(.appeared)");
        
        fadeElements.forEach((element) => {
          if (this.isInViewport(element)) {
            element.classList.add("appeared");
          }
        });
        
        // Animate skill bars and counters
        this.animateSkillBars();
        this.animateCounter();
      }
    };
    
    // Initialize the UI
    UI.init();
    
    // Add CSS for toast notifications
    const style = document.createElement('style');
    style.textContent = `
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .toast {
        background-color: var(--card-bg);
        color: var(--text);
        border-radius: var(--border-radius);
        padding: 12px 15px;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      
      .toast.show {
        transform: translateX(0);
        opacity: 1;
      }
      
      .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .toast-success {
        border-left: 4px solid var(--success);
      }
      
      .toast-error {
        border-left: 4px solid var(--danger);
      }
      
      .toast-info {
        border-left: 4px solid var(--info);
      }
      
      .toast-success i {
        color: var(--success);
      }
      
      .toast-error i {
        color: var(--danger);
      }
      
      .toast-info i {
        color: var(--info);
      }
      
      .toast-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0;
        margin-left: 10px;
        transition: color 0.3s ease;
      }
      
      .toast-close:hover {
        color: var(--text);
      }
    `;
    document.head.appendChild(style);
  });
  /*
  // Mejorar la función openModal
  function openModal(imageSrc, captionText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Mostrar el modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Deshabilitar scroll
    
    // Establecer la imagen y el caption
    modalImg.src = imageSrc;
    modalCaption.textContent = captionText || '';
    
    // Forzar el repintado para que la transición funcione
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    
    // Cerrar al hacer clic fuera de la imagen
    modal.onclick = function(e) {
      if (e.target === modal) {
        closeModal();
      }
    };
    
    // Cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }
  
  // Función para cerrar el modal
  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Habilitar scroll
    }, 300);
  }
  
  // Asignar el evento de cerrar al botón
  document.querySelector('.close').onclick = closeModal;*/