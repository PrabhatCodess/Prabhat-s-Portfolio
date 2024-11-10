function locomotiveSmoothScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#home_playbook"),
  smooth: true,
  lerp: 0.065, // Lower value for smoother scroll
  multiplier: 0.85, // Lower multiplier for smoother scroll
  class: 'is-reveal', // Class to add when elements are revealed
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#home_playbook" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#home_playbook", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#home_playbook").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function revealToSpan (){
  document.querySelectorAll(".reveal")
.forEach(function(elem){
  // create two spans
 var parent = document.createElement("span")
 var child = document.createElement("span")
   
   // parent and child both sets thier respective classes
   parent.classList.add("parent")
   child.classList.add("child")

  //span parent gets child and child gets elem details 
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child)

  // elem replaces its value with parent spans
  elem.innerHTML = "";
  elem.appendChild(parent)
});
}
function valueSetters(){
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set(".phead  img", {  opacity: 0 });
  
}
function loaderAnimation() {

  function initialTLoader() {
    // Create a GSAP timeline for the initial animations
    var initialTl = gsap.timeline();

    // Initial animations that should run before the page is fully loaded
    initialTl.from("#loader .child span", {
      x: -200,
      duration: 1,
      ease: Power3.easeInOut,
      stagger: 0.1
    });
  }

  initialTLoader();

  // Wait for the page to fully load
  window.onload = function () {
    // Hide the loader-logo when the page fully loads


    // Add a 3-second delay before the remaining animations start
    setTimeout(function () {
      // Create a separate GSAP timeline for the remaining animations
      var remainingTl = gsap.timeline();

      var loaderLogo = document.querySelector(".loader-logo");
      loaderLogo.style.display = "none";

      // Rest of the animations after the page is fully loaded
      remainingTl.to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        ease: "power3.out", 
        stagger: 0.05
      })
      .to("#loader", {
        height: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.65")
      .to("#green", {
        height: "100%",
        top: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to("#green", {
        height: 0,
        top: 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: function () {
          animateHomepage(); // Your homepage animation
        }
      }, "-=0.6");
      
    }, 1700); // Add a 3-second delay (3000 milliseconds)
  };
}
function animateHomepage(){
    

     var tl = gsap.timeline();

     tl.to("#nav a", {
        y: 0,
        opacity:1,
        stagger:.05,  
        ease:Expo.easeInOut
     })

     tl.to("#home_playbook .playbook_header img", {
      opacity:1,
      ease:Expo.easeInOut,
   })
}
function revealSocial() {
  document.addEventListener("DOMContentLoaded", function() {
      // Get the social menu item and dropdown
      const socials = document.getElementById('socials');
      const dropdown = socials.querySelector('ul');

      // Function to show the dropdown
      function showDropdown() {
          gsap.to(dropdown, { duration: 1, display: 'block', opacity: 1, ease: 'power1.out' });
      }

      // Function to hide the dropdown
      function hideDropdown() {
          gsap.to(dropdown, { duration: 1, display: 'none', opacity: 0, ease: 'power1.out' });
      }

      // Add event listeners for hover on socials
      socials.addEventListener('mouseenter', showDropdown);

      // Handle when mouse leaves the dropdown or socials
      socials.addEventListener('mouseleave', function(event) {
          // Set a small timeout to allow moving from socials to dropdown
          setTimeout(function() {
              if (!socials.contains(event.relatedTarget)) {
                  hideDropdown();
              }
          }, 200);
      });

      dropdown.addEventListener('mouseenter', showDropdown);
      dropdown.addEventListener('mouseleave', function(event) {
          // Set a small timeout to allow moving from dropdown to socials
          setTimeout(function() {
              if (!dropdown.contains(event.relatedTarget) && !socials.contains(event.relatedTarget)) {
                  hideDropdown();
              }
          }, 200);
      });
  });
}
function creditsAnimationBtn(){
  document.getElementById('click_me').addEventListener('click', function() {
    const creditsTech = document.querySelector('.credits_tech');
    
    // Remove the class first to reset the animation
    creditsTech.classList.remove('animate-tech');
    
    // Trigger reflow to restart the animation
    void creditsTech.offsetWidth;
    
    // Add the class to trigger the animation
    creditsTech.classList.add('animate-tech');
    
    creditsTech.style.display = 'flex';
  });
  
  document.querySelector('.credits_close_btn').addEventListener('click', function() {
    const creditsTech = document.querySelector('.credits_tech');
    creditsTech.style.display = 'none';
    
    // Remove the animation class so it can be reapplied on next click
    creditsTech.classList.remove('animate-tech');
  });
  
}
function formSlider() {
  const iframeContainer = document.querySelector('.iframe-container_playbook');
  const openButton = document.querySelector('.btn2');
  const nav = document.querySelector('#nav');
  const footer = document.querySelector('footer');


  if (openButton && iframeContainer && nav) {
    // Button to open iframe
    openButton.addEventListener('click', function() {
      iframeContainer.classList.add('active'); // Slide in the iframe
      nav.style.display = 'none'; // Hide the navbar
    });
  }

  // Event listener for the iframe close button
  document.addEventListener('click', function(event) {
    const closeButton = event.target.closest('.iframe-close_btn');
    if (closeButton && iframeContainer.classList.contains('active')) {
      iframeContainer.classList.remove('active'); // Slide the iframe back out
      nav.style.display = 'flex'; // Restore the navbar
    }
  });
}


locomotiveSmoothScroll();
revealToSpan ();
valueSetters();
loaderAnimation();
revealSocial();
creditsAnimationBtn();
formSlider();
