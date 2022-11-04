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
// console.log(slides);

const ScrollTriggerCreateForEachSlide = () => {
    let currentIndex = 0;
    function gotoPanel(index: number) {
        animating = true;
        console.log(videoEnded, 'videoeded');

        if (videoEnded) {
            gsap.to('.slides-wrapper', {
                duration:   1,
                scrollTo:   slides[ index ],
                onComplete: () => {
                    if (index === slides.length - 1 || index === 0) {
                        if (index <= 0) {
                            currentIndex = 0;
                        } else if (index >= slides.length - 1) {
                            currentIndex = slides.length - 1;
                        }

                        // console.log(`currentindex from complete ${currentIndex}`);
                        scrolling.enable();
                    }
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
                currentIndex <= 0 ? currentIndex = 0 : currentIndex -= 1;
                console.log(`up, currentIndex ${currentIndex}`);
                gotoPanel(currentIndex);
            }
        },
        onDown: () => {
            if (!animating) {
                currentIndex >= slides.length - 1 ? currentIndex = slides.length - 1 : currentIndex += 1;
                console.log(`dow, currentIndex ${currentIndex}`);
                gotoPanel(currentIndex);
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
});

setInterval(() => {
    console.log(scrolling.enabled);
}, 1000);

export const sixthSectionFunction = () => {
    console.log('SixthSection');
};

sixthSectionFunction();
