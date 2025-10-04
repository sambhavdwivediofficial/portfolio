/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


 // ======================= Protection Script =======================

let attemptCounter = 0;
const maxAttempts = 2;

function showWarning() {
    alert("⚠️ Warning: View Source Code is disabled on this site!");
}

// Function to handle attempts
function handleAttempt(e) {
    attemptCounter++;
    if(attemptCounter > maxAttempts) showWarning();
    e.preventDefault();
}

// Right-click
document.addEventListener('contextmenu', handleAttempt);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if(e.key === "F12" || 
       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || 
       (e.ctrlKey && e.key === "U")) {
        handleAttempt(e);
    }
});

// Right mouse button drag
document.addEventListener('mousedown', e => {
    if(e.button === 2) handleAttempt(e);
});

// Optional: Disable text selection / copy / cut
document.addEventListener('selectstart', handleAttempt);
document.addEventListener('copy', handleAttempt);
document.addEventListener('cut', handleAttempt);

// Optional: Prevent dragging images / links
document.addEventListener('dragstart', handleAttempt);

/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector('.contact__form');
const submitButton = contactForm.querySelector('input[type="submit"]');

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault(); // Page reload nahi hoga

        submitButton.value = "Message Sent"; // Button text change
        submitButton.disabled = true; // Button ko temporarily disable karenge



        const formData = new FormData(contactForm);
        contactForm.reset();
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzuKSZGt9EqlOm6XLx0k6XLq-ht_oD1TbxTzl652iuRnKZTu4mPWQ-6B2_krPU-gJ2D1g/exec';

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.text())
            .then(data => {
                // Form 1 second me clear
                setTimeout(() => {
                    contactForm.reset();
                }, 0);

                // Button 2 second me wapas Send
                setTimeout(() => {
                    submitButton.value = "Send";
                    submitButton.disabled = false;
                }, 0);

            })
            .catch(err => {
                console.error(err);
                submitButton.value = "Send";
                submitButton.disabled = false;
                alert("⚠️ Something went wrong. Try again!");
            });
    });
}

const footerWord = document.querySelector('.footer__title');

footerWord.addEventListener('mouseenter', () => {
  footerWord.style.color = '#3469d3ff';
  });

footerWord.addEventListener('mouseleave', () => {
  footerWord.style.color = 'white';
  });


function animateSkillsBarsOnScroll() {
  const skillsBars = document.querySelectorAll('.skills__bar');

  skillsBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      if (bar.classList.contains('skills__html')) {
        bar.style.width = '95%';
      } else if (bar.classList.contains('skills__css')) {
        bar.style.width = '85%';
      } else if (bar.classList.contains('skills__js')) {
        bar.style.width = '70%';
      } else if (bar.classList.contains('skills__python')) {
        bar.style.width = '50%';
      }
    } else {
      bar.style.width = '0%';
    }
  });
}

window.addEventListener('scroll', animateSkillsBarsOnScroll);
window.addEventListener('load', animateSkillsBarsOnScroll);


// Skills image zoom effect
const skillsImg = document.querySelector('.skills__img');

if (skillsImg) {
  skillsImg.addEventListener('mouseenter', () => {
    skillsImg.style.transition = "transform 1s ease";
    skillsImg.style.transform = "scale(1.1)";
  });

  skillsImg.addEventListener('mouseleave', () => {
    skillsImg.style.transform = "scale(1)";
  });
}
// Smooth scroll without # in URL
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').replace('#','');
    const targetElement = document.getElementById(targetId);
    
    if(targetElement){
      targetElement.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, null, ' ');
    }
  });
});