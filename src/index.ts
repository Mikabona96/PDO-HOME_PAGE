// Components
import './components';

// Styles
import 'normalize.css';
import './main.scss';

// Images
import './assets/img/up.png';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
import Observer from 'gsap/Observer';

let rtl = false;
const sections = document.querySelectorAll('section');

sections.forEach((section) => {
    rtl ? section.classList.add('rtl') : section.classList.remove('rtl');
});

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


export const scrolling = {
    enabled: true,
    events:  'scroll,wheel,touchmove,pointermove'.split(','),
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
        if (scrolling.enabled) { // skip if a scroll tween is in progress
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
        // const intoAnim = gsap.from(section.querySelector('.right-col'), { yPercent: 50, duration: 1, paused: true });
        ScrollTrigger.create({
            trigger: section,
            start:   'top bottom',
            end:     '99% top',
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

const body = document.querySelector('body');

window.addEventListener('resize', () => {
    if (body && body.clientWidth < 1400) {
        ScrollTrigger.disable();
    } else {
        ScrollTrigger.enable();
    }
});

// Go to top

const topBtn = (document.querySelector('.goup')) as HTMLElement;
if (rtl) {
    topBtn.style.right = 'auto';
    topBtn.style.left = '58px';
} else {
    topBtn.style.right = '58px';
    topBtn.style.left = 'auto';
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 1000) {
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
