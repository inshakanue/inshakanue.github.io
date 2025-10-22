/* 
  MAIN JAVASCRIPT APPLICATION
  ===========================
  This file contains all the JavaScript functionality for the portfolio website.
  It handles:
  - Smooth scrolling initialization
  - Dynamic year display in footer
  - Particles.js background animation configuration
  
  Dependencies:
  - SweetScroll library (for smooth scrolling)
  - particles.js library (for animated background)
  
  This file is compiled and minified by Gulp to assets/js/main.js
*/

/* 
  INITIALIZATION
  ==============
  Wait for the DOM to be fully loaded before initializing any functionality.
  This ensures all HTML elements are available for manipulation.
*/
document.addEventListener("DOMContentLoaded", function () {
  
  /* 
    SMOOTH SCROLLING INITIALIZATION
    ===============================
    Initialize SweetScroll library for smooth scrolling animations.
    This enables the smooth scroll effect when clicking the down arrow.
  */
  const sweetScroll = new SweetScroll({
    /* Default options are used - can be customized here if needed */
  });

  /* 
    DYNAMIC YEAR DISPLAY
    ====================
    Set the current year in the footer dynamically.
    This ensures the copyright year is always current without manual updates.
  */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* 
    PARTICLES.JS CONFIGURATION
    ===========================
    Initialize the animated particles background effect.
    This creates an interactive starfield background that responds to user interaction.
  */
  particlesJS('particles-js', {
    
    /* 
      PARTICLE CONFIGURATION
      ======================
      Defines the appearance and behavior of individual particles
    */
    "particles": {
      
      /* Number of particles and density */
      "number": {
        "value": 40,                        // Total number of particles
        "density": {
          "enable": true,                   // Enable density-based scaling
          "value_area": 400                 // Area per particle (smaller = more dense)
        }
      },
      
      /* Particle color scheme */
      "color": {
        "value": "#b8d853"                  // Brand green color for particles
      },
      
      /* Particle shape configuration */
      "shape": {
        "type": "star",                     // Use star shapes for particles
        "stroke": {
          "width": 1,                       // Border width
          "color": "#000000"                // Black border color
        },
        "star": {
          "nb_sides": 5                     // 5-pointed stars
        }
      },
      
      /* Opacity settings */
      "opacity": {
        "value": 0.5,                       // Base opacity (50%)
        "random": false,                    // Don't randomize opacity
        "anim": {
          "enable": false,                  // Disable opacity animation
          "speed": 1,                       // Animation speed (if enabled)
          "opacity_min": 0.1,               // Minimum opacity
          "sync": false                     // Don't sync animations
        }
      },
      
      /* Size settings */
      "size": {
        "value": 3,                         // Base particle size
        "random": true,                     // Randomize particle sizes
        "anim": {
          "enable": false,                  // Disable size animation
          "speed": 19.18081918081918,       // Animation speed (if enabled)
          "size_min": 0.1,                  // Minimum size
          "sync": false                     // Don't sync animations
        }
      },
      
      /* Connection lines between particles */
      "line_linked": {
        "enable": true,                     // Enable connecting lines
        "distance": 150,                    // Maximum distance for connections
        "color": "#6c48ab",                 // Purple color for lines
        "opacity": 0.4,                     // Line opacity (40%)
        "width": 2                          // Line width
      },
      
      /* Movement configuration */
      "move": {
        "enable": true,                     // Enable particle movement
        "speed": 5,                         // Movement speed
        "direction": "none",                // No specific direction
        "random": true,                     // Randomize movement
        "straight": false,                  // Don't move in straight lines
        "out_mode": "out",                  // Remove particles that go off-screen
        "bounce": false,                    // Don't bounce off edges
        "attract": {
          "enable": false,                  // Disable attraction effects
          "rotateX": 600,                   // X-axis rotation (if enabled)
          "rotateY": 1200                   // Y-axis rotation (if enabled)
        }
      },
      
      "nb": 80                              // Additional particle count
    },
    
    /* 
      INTERACTIVITY CONFIGURATION
      ===========================
      Defines how particles respond to user interaction
    */
    "interactivity": {
      "detect_on": "window",                // Detect interaction on entire window
      "events": {
        
        /* Mouse hover effects */
        "onhover": {
          "enable": true,                   // Enable hover effects
          "mode": "repulse"                 // Push particles away on hover
        },
        
        /* Mouse click effects */
        "onclick": {
          "enable": true,                   // Enable click effects
          "mode": "push"                    // Add new particles on click
        },
        
        "resize": true                      // Redraw on window resize
      },
      
      /* Interaction mode configurations */
      "modes": {
        
        /* Grab mode (not used but configured) */
        "grab": {
          "distance": 400,                  // Grab distance
          "line_linked": {
            "opacity": 1                    // Full opacity for grabbed lines
          }
        },
        
        /* Bubble mode (not used but configured) */
        "bubble": {
          "distance": 400,                  // Bubble effect distance
          "size": 40,                       // Bubble size
          "duration": 2,                    // Animation duration
          "opacity": 8,                     // Bubble opacity
          "speed": 3                        // Animation speed
        },
        
        /* Repulse mode (used on hover) */
        "repulse": {
          "distance": 200,                  // Repulsion distance
          "duration": 0.4                   // Animation duration
        },
        
        /* Push mode (used on click) */
        "push": {
          "particles_nb": 4                 // Number of particles to add
        },
        
        /* Remove mode (not used but configured) */
        "remove": {
          "particles_nb": 2                 // Number of particles to remove
        }
      }
    },
    
    "retina_detect": true                   // Enable retina display detection
  });

}, false); // End of DOMContentLoaded event listener