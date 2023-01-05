// Components
import './components';

// Styles
import 'normalize.css';
import './main.scss';
import '../node_modules/leaflet/dist/leaflet.css';

// Images
import './assets/img/up.png';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
import Observer from 'gsap/Observer';

let rtl = false;
const sections = document.querySelectorAll('section');
let width = window.innerWidth;
const header = (document.querySelector('.Header')) as HTMLElement;
const footer = (document.querySelector('.Footer')) as HTMLElement;

// Apply rtl
sections.forEach((section) => {
    rtl ? section.classList.add('rtl') : section.classList.remove('rtl');
});
rtl ? header.classList.add('rtl') : header.classList.remove('active');
rtl ? footer.classList.add('rtl') : footer.classList.remove('active');

//========================================= GSAP ===============================================
gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


export const scrolling = {
    enabled: true,
    events:  'scroll,touchmove,wheel'.split(','),
    prevent: (event: any) => event.preventDefault(),
    disable() {
        if (scrolling.enabled) {
            scrolling.enabled = false;
            window.addEventListener('scroll', gsap.ticker.tick, { passive: true });
            scrolling.events.forEach(
                (event, i) => (i ? document : window).addEventListener(event, scrolling.prevent, { passive: false }),
            );
        }
    },
    enable() {
        if (!scrolling.enabled) {
            scrolling.enabled = true;
            window.removeEventListener('scroll', gsap.ticker.tick);
            scrolling.events.forEach(
                (event: any, i) => (i ? document : window).removeEventListener(event, scrolling.prevent),
            );
        }
    },
};

export let videoEnded = false;

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const SixthSectionVideo = (document.querySelector('.map')) as HTMLVideoElement;
    let wasPlayed = false;

    function goToSection(section?: any, i?: any) {
        if (scrolling.enabled) {
            scrolling.disable();

            if (i === 2) {
                gsap.to(window, {
                    scrollTo:   { y: section, autoKill: false },
                    onComplete: scrolling.disable,
                    duration:   1,
                });
            } else if (i === 4) {
                gsap.to(window, {
                    scrollTo:   { y: section, autoKill: false },
                    onComplete: scrolling.disable,
                    duration:   1,
                });
                !wasPlayed && SixthSectionVideo.play();
                wasPlayed = true;
                SixthSectionVideo.addEventListener('ended', () => {
                    videoEnded = true;
                });
            } else {
                gsap.to(window, {
                    scrollTo:   { y: section, autoKill: false },
                    onComplete: scrolling.enable,
                    duration:   1,
                });
            }
        }
    }

    sections?.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start:   'top bottom',
            end:     'bottom top',
            markers: true,
            onEnter: () => {
                scrolling.enable();
                goToSection(section, i);
            },
            onEnterBack: () => {
                scrolling.enable();
                goToSection(section, i);
            },
        });
    });
});

//========================= Go to top ========================
const topBtn = (document.querySelector('.goup')) as HTMLElement;
const secondSection = (document.querySelector('.SecondSection')) as HTMLElement;
let offset = secondSection.offsetTop;
if (rtl) {
    topBtn.style.right = 'auto';
    topBtn.style.left = '58px';
} else {
    topBtn.style.right = '58px';
    topBtn.style.left = 'auto';
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= offset && width >= 1360) {
        topBtn.style.display = 'block';
    } else {
        topBtn.style.display = 'none';
    }
});

topBtn.addEventListener('click', () => {
    ScrollTrigger.disable();
    gsap.to(window, { duration: 2, scrollTo: '.FirstSection', ease: 'power4.inOut' });
    setTimeout(() => {
        scrolling.enable();
        ScrollTrigger.enable();
    }, 2000);
});

// ========= Disable Scroll ===============
const checkWidth = (width: number) => {
    topBtn.style.display = 'none';
    if (width <= 1360) {
        ScrollTrigger.disable();
        topBtn.style.display = 'none';
    } else {
        topBtn.style.display = 'block';
        ScrollTrigger.enable();
    }
};

checkWidth(width);
topBtn.style.display = 'none';
let timeout: ReturnType<typeof setTimeout> | null = null;
window.addEventListener('resize', () => {
    width = window.innerWidth;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
        checkWidth(width);
    }, 500);
});
