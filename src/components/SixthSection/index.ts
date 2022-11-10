import '../../assets/map.webm';
import '../../assets/img/points-area.png';

import leaflet, { LatLngExpression } from 'leaflet';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Observer from 'gsap/Observer';

import { scrolling, videoEnded } from '../..';

import { mapCoords } from './map';
import { markers } from './markers';

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let animating = false;
const slides = document.querySelectorAll('.SixthSection .slides-wrapper .slide');

let width = document.querySelector('body')!.clientWidth;

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
                if (videoEnded) {
                    currentIndex -= 1;
                } else {
                    currentIndex = 0;
                }

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
                if (videoEnded) {
                    currentIndex += 1;
                } else {
                    currentIndex = 0;
                }

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
    trigger: document.querySelector('.SixthSection'),
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


document.addEventListener('DOMContentLoaded', () => {
    const defineWidth = () => {
        let zoom = 7.4;
        if (width >= 1360) {
            zoom = 7.4;
        } else {
            zoom = 6;
        }

        return zoom;
    };

    const map = leaflet.map('mapL', { scrollWheelZoom: false, dragging: false, zoomControl: false }).setView([ 20.7061398, 55.4904372 ], defineWidth());
    map.doubleClickZoom.disable();

    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    const black = leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains:  'abcd',
        maxZoom:     20,
    });
    black.addTo(map);

    const latLngs = leaflet.GeoJSON.coordsToLatLngs(mapCoords.geometry.coordinates, 2);
    leaflet.polyline(latLngs, {
        color:   '#019748',
        weight:  3,
        opacity: 1,
    }).addTo(map);

    // ================ Markers ==================

    const info = (document.querySelector('.SixthSection .info')) as HTMLElement;
    const title = info.querySelector('.title');
    const description1 = info.querySelector('.description.first');
    const description2 = info.querySelector('.description.second');

    // eslint-disable-next-line no-undef

    type ElementType = {
        coords: number[];
        title: string;
        description1: string;
        description2: string;
        color: string;
    }
    const removeActivePointers = (pointers: NodeListOf<Element>, idx: number, element: ElementType) => {
        pointers.forEach((pointer, i) => {
            if (i === idx) {
                if (!pointer.classList.contains('active')) {
                    pointer.classList.add('active');
                    title!.textContent = element.title;
                    description1!.textContent = element.description1;
                    description2!.textContent = element.description2;
                } else {
                    pointer.classList.remove('active');
                    title!.textContent = '';
                    title!.insertAdjacentHTML('afterbegin', '85 years of <br />experience');
                    description1!.textContent = 'PDO has 8,853 staff and over 52,000 contracting employees, a combined workforce made up of over 60 nationalities.';
                    description2!.textContent = 'We operate 202 producing oil fields, 43 gas fields, 29 production stations, more than 9,400 active wells, more than 33,000 kilometres of pipelines and flowlines and 230 operating units in our well engineering fleet.';
                }
            } else {
                pointer.classList.remove('active');
            }
        });
    };

    markers.forEach((element, currentIndex) => {
        const markerIcon = leaflet.divIcon({
            iconSize:   [ 32, 37 ],
            iconAnchor: [ 16, 37 ],
            html:       `<div class="icon drop ${element.color}"><h5 class="title">${element.title}</h5></div>`,
        });
        leaflet.marker(element.coords as LatLngExpression, { icon: markerIcon }).addTo(map)
            .on('click', () => {
                const pointers = document.querySelectorAll('.icon.drop');
                removeActivePointers(pointers, currentIndex, element);
            });
    });
    window.addEventListener('resize', () => {
        width = document.querySelector('body')!.clientWidth;
        defineWidth();
    });
});
