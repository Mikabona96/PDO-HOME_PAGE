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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// =============================== Dots on Map ===============================

const dots = [
    {
        title:        'FAHUD0',
        description1: '000 has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: '000 operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '35.2%',
        bottom:       '59.2%',
        rightActive:  '33.6%',
        bottomActive: '61.5%',
    },
    {
        title:        'FAHUD',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '30.8%',
        bottom:       '56%',
        rightActive:  '29.4%',
        bottomActive: '58.5%',
    },
    {
        title:        'FAHUD2',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'green',
        right:        '30.5%',
        bottom:       '48%',
        rightActive:  '29.20%',
        bottomActive: '50.5%',
    },
    {
        title:        'FAHUD3',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '31.5%',
        bottom:       '44.3%',
        rightActive:  '30.25%',
        bottomActive: '46.8%',
    },
    {
        title:        'FAHUD4',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '28.6%',
        bottom:       '36.6%',
        rightActive:  '27.20%',
        bottomActive: '39%',
    },
    {
        title:        'FAHUD5',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '29.4%',
        bottom:       '33.6%',
        rightActive:  '28%',
        bottomActive: '36.2%',
    },
    {
        title:        'FAHUD6',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '32.5%',
        bottom:       '28.8%',
        rightActive:  '31.2%',
        bottomActive: '31.2%',
    },
    {
        title:        'FAHUD7',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '31.5%',
        bottom:       '26%',
        rightActive:  '30.2%',
        bottomActive: '28.4%',
    },
    {
        title:        'FAHUD8',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '35.5%',
        bottom:       '25%',
        rightActive:  '34.2%',
        bottomActive: '27.4%',
    },
    {
        title:        'FAHUD9',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '33.5%',
        bottom:       '22.2%',
        rightActive:  '32%',
        bottomActive: '25%',
    },
    {
        title:        'FAHUD10',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '34.7%',
        bottom:       '20%',
        rightActive:  '33.2%',
        bottomActive: '22.3%',
    },
    {
        title:        'FAHUD11',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'green',
        right:        '36%',
        bottom:       '19%',
        rightActive:  '34.45%',
        bottomActive: '21.7%',
    },
    {
        title:        'FAHUD12',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '37%',
        bottom:       '16.5%',
        rightActive:  '35.4%',
        bottomActive: '19%',
    },
    {
        title:        'FAHUD13',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'red',
        right:        '38.5%',
        bottom:       '19%',
        rightActive:  '36.9%',
        bottomActive: '21.9%',
    },
    {
        title:        'FAHUD14',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'green',
        right:        '39.2%',
        bottom:       '15.5%',
        rightActive:  '37.6%',
        bottomActive: '18%',
    },
    {
        title:        'FAHUD15',
        description1: 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.',
        description2: 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.',
        color:        'green',
        right:        '42.6%',
        bottom:       '15%',
        rightActive:  '41.1%',
        bottomActive: '17.5%',
    },
];

const pointsArea = (document.querySelector('.points-area')) as HTMLElement;

dots.forEach((dotI) => {
    const dot = document.createElement('div');
    dot.classList.add('drop');
    dot.classList.add(`${dotI.color}`);

    const dotTitle = document.createElement('h5');
    dotTitle.classList.add('title');
    dotTitle.innerHTML = dotI.title;

    const description1 = document.createElement('div');
    description1.classList.add('description1');
    description1.innerHTML = dotI.description1;

    const description2 = document.createElement('div');
    description2.classList.add('description2');
    description2.innerHTML = dotI.description2;

    dot.append(dotTitle);
    dot.append(description1);
    dot.append(description2);

    dot.style.right = dotI.right;
    dot.style.bottom = dotI.bottom;

    pointsArea.append(dot);

    dot.addEventListener('click', () => {
        dot.classList.toggle('active');
        if (dot.classList.contains('active')) {
            dot.style.right = dotI.rightActive;
            dot.style.bottom = dotI.bottomActive;
        } else {
            dot.style.right = dotI.right;
            dot.style.bottom = dotI.bottom;
        }
    });
});

