// Components
import './components';

// Styles
import 'normalize.css';
import './main.scss';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
import Observer from 'gsap/Observer';

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
            } else if (i === 5) {
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

