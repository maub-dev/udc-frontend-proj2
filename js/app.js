/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('[data-nav]');
const navContainer = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Functions
 * 
*/
function buildNav() {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const element = document.createElement('li');
        element.classList.add('menu__link');

        const scrollToID = section.id;
        element.setAttribute('scroll-to', scrollToID);
        const dataNav = section.getAttribute('data-nav');
        element.textContent = dataNav;
        fragment.append(element);
    }
    navContainer.appendChild(fragment);
}

function scrollToSection(id) {
    const elementToScroll = document.getElementById(id);
    elementToScroll.scrollIntoView({ behavior: 'smooth' });
}

/**
 * End Functions
 * Begin Events
 * 
*/

// build the nav
buildNav();

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', function(e) {
    for (const section of sections) {
        const { y } = section.getBoundingClientRect();
        // Estimated value to have a good toggle between section activation
        if (y > -70 && y < 300) {
            const navItemToDisable = document.querySelector('.menu__link.section-active');
            if (navItemToDisable && navItemToDisable.classList.contains('section-active')) {
                navItemToDisable.classList.remove('section-active');
            }
            const navItemToHighlight = document.querySelector(`[scroll-to="${section.id}"]`);
            navItemToHighlight.classList.add('section-active');
            section.classList.add('section-active');
        } else {
            section.classList.remove('section-active');
        }
    }
});

// Scroll to anchor ID using scrollTO event
navContainer.addEventListener('click', function(e) {
    if (e.target.nodeName === 'LI') {
        scrollToSection(e.target.getAttribute('scroll-to'));
    }
});

/**
 * End Events
 * 
*/