function locomotiveSmoothScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#home"),
  smooth: true,
  smoothMobile: true,
  lerp: 0.065, // Lower value for smoother scroll
  multiplier: 0.85, // Lower multiplier for smoother scroll
  class: 'is-reveal', // Class to add when elements are revealed
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#home" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#home", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#home").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function valueSetters(){
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set("#home #row2 img", {  opacity: 0 });

    document.querySelectorAll("#Visual>g>g>path, #Visual>g>g>polyline").forEach(function (e) {
      var character = e
  
      character.style.strokeDasharray = character.getTotalLength() + "px";
      character.style.strokeDashoffset = character.getTotalLength() + "px";
  
    })
  
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
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Add leading zero to minutes if necessary
  minutes = minutes < 10 ? '0' + minutes : minutes;

  var timeString = hours + ":" + minutes;
  document.getElementById('time').textContent = timeString;
}
// Update clock every second
setInterval(updateClock, 1000);
function loaderAnimation() {

  function initialTLoader() {
    // Create a GSAP timeline for the initial animations
    var initialTl = gsap.timeline();

    // Initial animations that should run before the page is fully loaded
    initialTl.from("#loader .child span", {
      x: 200,
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
function revealSocial() {
  document.addEventListener("DOMContentLoaded", function() {
      // Get the social menu item and dropdown
      const socials = document.getElementById('socials');
      const dropdown = socials.querySelector('ul');
      let isMouseOverDropdown = false;
      let hideTimeout;

      // Function to show the dropdown
      function showDropdown() {
          clearTimeout(hideTimeout);
          gsap.to(dropdown, { duration: 0.5, display: 'block', opacity: 1, ease: 'power2.out' });
      }

      // Function to hide the dropdown with a delay
      function hideDropdown() {
          hideTimeout = setTimeout(() => {
              if (!isMouseOverDropdown) {
                  gsap.to(dropdown, { duration: 0.5, display: 'none', opacity: 0, ease: 'power2.in' });
              }
          }, 300);
      }

      // Function to handle mouse enter on socials or dropdown
      function handleMouseEnter() {
          isMouseOverDropdown = true;
          showDropdown();
      }

      // Function to handle mouse leave on socials or dropdown
      function handleMouseLeave() {
          isMouseOverDropdown = false;
          hideDropdown();
      }

      // Add event listeners for mouse interactions
      socials.addEventListener('mouseenter', handleMouseEnter);
      socials.addEventListener('mouseleave', handleMouseLeave);
      dropdown.addEventListener('mouseenter', handleMouseEnter);
      dropdown.addEventListener('mouseleave', handleMouseLeave);

      // Keyboard accessibility
      socials.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              if (dropdown.style.display === 'block') {
                  hideDropdown();
              } else {
                  showDropdown();
              }
          }
      });

      // Touch screen support
      socials.addEventListener('touchstart', (event) => {
        if (dropdown.style.display === 'block') {
            hideDropdown();
        } else {
            showDropdown();
        }
    }, { passive: true });
    

      // Add keyboard navigation within the dropdown
      const items = dropdown.querySelectorAll('a');
      dropdown.addEventListener('keydown', (event) => {
          const activeItem = document.activeElement;
          const index = Array.from(items).indexOf(activeItem);

          switch (event.key) {
              case 'ArrowDown':
                  event.preventDefault();
                  if (index < items.length - 1) items[index + 1].focus();
                  break;
              case 'ArrowUp':
                  event.preventDefault();
                  if (index > 0) items[index - 1].focus();
                  break;
              case 'Escape':
                  event.preventDefault();
                  hideDropdown();
                  socials.querySelector('a').focus();
                  break;
          }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (event) => {
          if (!socials.contains(event.target) && !dropdown.contains(event.target)) {
              isMouseOverDropdown = false;
              hideDropdown();
          }
      });
  });
}
function animateSvg(){
 
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline",{
    strokeDashoffset:0,
    stagger:0.25,
    duration:1.9,
    ease:Expo.easeInOut,
 
  })
}
function animateHomepage(){
    

     var tl = gsap.timeline();

     tl.to("#nav a", {
        y: 0,
        opacity:1,
        stagger:.05,  
        ease:Expo.easeInOut
     })

     tl.to("#home .parent .child", {
        y: 0,
        stagger:.3,  
        duration:2,
        ease:Expo.easeInOut
     })

     tl.to("#home #row1 h1" , {
        y: 0,
        stagger:2,  
        duration:0.1,
        ease:Expo.easeInOut
     })
     tl.to("#home #row2 img", {
      opacity:1,
      ease:Expo.easeInOut,
      onComplete:function(){
        animateSvg();
      }
   })
}
function heroCardsAnimation(){
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#elem1", {
      scrollTrigger: {
          trigger: "#elem1",
          scroller: "#home", 
          start: "top 80%",
          end: "top 1%",
          scrub: true,
          markers: false,
      },
      rotation: 0.5,
      ease: "none"
  });
  
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.to("#elem2", {
      scrollTrigger: {
          trigger: "#elem1",
          scroller: "#home", 
          start: "top 150%",
          end: "top 5%",
          scrub: true,
          markers: false,
      },
      rotation: 1,
      ease: "none"
  });
  
  
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.to("#elem3", {
      scrollTrigger: {
          trigger: "#elem1",
          scroller: "#home", 
          start: "top 130%",
          end: "top 5%",
          scrub: true,
          markers: false,
      },
      rotation: 2,
      ease: "none"
  });
  
}
function hoverAnimationCards() {
const cursor = document.querySelector("#cursor");
const images = document.querySelectorAll("#work1 img, #work2 img, #work3 img, #work4 img, #work5 img");

images.forEach(function(workss) {
  workss.addEventListener("mousemove", function(dets) {
    const imageIndex = dets.target.dataset.index;
    const cursorChild = cursor.children[imageIndex];

    // Set opacity and position using pageX and pageY
    workss.style.filter = "grayscale(1)";
    cursorChild.style.opacity = 1;

    // Adjust transform to correctly follow the mouse
    cursorChild.style.transform = `translate(${dets.pageX}px, ${dets.pageY}px) translate(-50%, -50%)`;

    // Attach the mouseleave event listener
    workss.addEventListener("mouseleave", handleMouseLeave);

    function handleMouseLeave() {
      workss.style.filter = "grayscale(0)";
      cursorChild.style.opacity = 0;
      workss.removeEventListener("mouseleave", handleMouseLeave);
    }
  });
});
}
function backgroundColorChange(){
document.querySelectorAll('#work1 img').forEach(img => {
  img.addEventListener('mouseover', () => {
      document.querySelector("#Works-info").style.backgroundColor = "#0A43E4";
  });
  img.addEventListener('mouseout', () => {
      // Optional: Reset the background color when not hovering
      document.querySelector("#Works-info").style.backgroundColor = "";
  });
});






document.querySelectorAll('#work2 img').forEach(img => {
  img.addEventListener('mouseover', () => {
      document.querySelector("#Works-info").style.backgroundColor = "#111111";
  });
  img.addEventListener('mouseout', () => {
      // Optional: Reset the background color when not hovering
      document.querySelector("#Works-info").style.backgroundColor = "";
  });
});






document.querySelectorAll('#work3 img').forEach(img => {
  img.addEventListener('mouseover', () => {
      document.querySelector("#Works-info").style.backgroundColor = "#cdea68";
  });
  img.addEventListener('mouseout', () => {
      // Optional: Reset the background color when not hovering
      document.querySelector("#Works-info").style.backgroundColor = "";
  });
});






document.querySelectorAll('#work4 img').forEach(img => {
  img.addEventListener('mouseover', () => {
      document.querySelector("#Works-info").style.backgroundColor = "#ff0000";
  });
  img.addEventListener('mouseout', () => {
      // Optional: Reset the background color when not hovering
      document.querySelector("#Works-info").style.backgroundColor = "";
  });
});







document.querySelectorAll('#work5 img').forEach(img => {
  img.addEventListener('mouseover', () => {
      document.querySelector("#Works-info").style.backgroundColor = "#18181B";
  });
  img.addEventListener('mouseout', () => {
      // Optional: Reset the background color when not hovering
      document.querySelector("#Works-info").style.backgroundColor = "";
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

function scrollAnimation(){
  const observer = new IntersectionObserver((entries)  => {
    entries.forEach((entry)  => {
      if (entry.isIntersecting){
        entry.target.classList.add("show");
      } 
  
    });
  });
  
  
  
  
  
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el))  ;
}

function formSlider() {
  const iframeContainer = document.querySelector('.iframe-container');
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

document.addEventListener('DOMContentLoaded', () => {
  locomotiveSmoothScroll();
});






locomotiveSmoothScroll();
revealToSpan ();
valueSetters();
updateClock();
loaderAnimation();
revealSocial();
heroCardsAnimation();
hoverAnimationCards();
backgroundColorChange();
creditsAnimationBtn();
scrollAnimation();
formSlider();







