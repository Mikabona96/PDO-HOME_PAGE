import '../../assets/map.webm';
import '../../assets/img/points-area.png';


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Observer from 'gsap/Observer';
import { scrolling, videoEnded } from '../..';

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let animating = false;
const slides = document.querySelectorAll('.SixthSection .slides-wrapper .slide');
const slidesWrapper = (document.querySelector('.SixthSection .slides-wrapper')) as HTMLElement;
let currentIndex = 0;

const ScrollTriggerCreateForEachSlide = () => {
    let currentIndex = 0;
    function gotoPanel(index: number) {
        animating = true;

        if (videoEnded) {
            gsap.to('.slides-wrapper', {
                duration:   1,
                scrollTo:   slides[ index ],
                onComplete: () => {
                    animating = false;
                },
            });
        } else {
            animating = false;
            scrolling.enable();
        }
    }
    ScrollTrigger.observe({
        target: '.SixthSection',
        type:   scrolling.events.join(','),
        onUp:   () => {
            if (!animating) {
                currentIndex -= 1;

                if (currentIndex >= 0) {
                    gotoPanel(currentIndex);
                }
                if (currentIndex < 0) {
                    scrolling.enable();
                    currentIndex = 0;
                }
            }
        },
        onDown: () => {
            if (!animating) {
                currentIndex += 1;

                if (currentIndex <= slides.length - 1) {
                    gotoPanel(currentIndex);
                }
                if (currentIndex > slides.length - 1) {
                    scrolling.enable();
                    currentIndex = slides.length - 1;
                }
            }
        },
    });
};

ScrollTrigger.create({
    trigger: document.querySelector('.ThirdSection'),
    start:   'top bottom',
    end:     '99% top',
    onEnter: () => {
        ScrollTriggerCreateForEachSlide();
    },
    onEnterBack: () => {
        ScrollTriggerCreateForEachSlide();
    },
    onLeave: () => {
        scrolling.enable();
    },
    onLeaveBack: () => {
        scrolling.enable();
    },
});

setInterval(() => {
    console.log(scrolling.enabled);
}, 1000);

export const sixthSectionFunction = () => {
    console.log('SixthSection');
};

sixthSectionFunction();

// =============================== Dots ===============================

const drop = document.querySelector('.drop');

drop?.addEventListener('click', () => {
    drop.classList.toggle('active');
});
