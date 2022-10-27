import '../../assets/img/1st-section-bg.png';
import '../../assets/img/1st-section-bg2.png';
import '../../assets/img/1st-section-bg3.png';
import '../../assets/img/arrow-right.png';


export const firstSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const firstSection = document.querySelector('.FirstSection');
        const wrapper = (firstSection?.querySelector('.FirstSection .slider .slides-wrapper')) as HTMLElement;
        const btns = firstSection?.querySelectorAll('.slider-button');
        const rightArrow = (firstSection?.querySelector('.arrow-right')) as HTMLElement;
        const leftArrow = (firstSection?.querySelector('.arrow-left')) as HTMLElement;
        const slide = (wrapper?.querySelector('.slide')) as HTMLElement;
        const width = slide.offsetWidth;
        let index = 0;
        const rtl = !!firstSection?.classList.contains('rtl');

        const btnsActiveClassHandler = () => {
            btns?.forEach((btn, i) => {
                index === i ?  btn.classList.add('active') : btn.classList.remove('active');
            });
        };

        const arrowNavigation = (operator: string) => {
            if (operator === '+') {
                index += 1;
                btns && index >= btns?.length - 1 ? index = btns?.length - 1 : index;
                wrapper?.setAttribute('style', `transform: translateX(-${index * width}px)`);
                btnsActiveClassHandler();
            } else {
                index -= 1;
                index < 0 ? index = 0 : index;
                wrapper?.setAttribute('style', `transform: translateX(-${index * width}px)`);
                btnsActiveClassHandler();
            }
            if (firstSection?.classList.contains('rtl')) {
                index > 0 ? rightArrow?.setAttribute('style', 'display: block') : rightArrow?.setAttribute('style', 'display: none');
                btns && index >= btns?.length - 1 ? leftArrow?.setAttribute('style', 'display: none') : leftArrow?.setAttribute('style', 'display: block');
            } else {
                index > 0 ? leftArrow?.setAttribute('style', 'display: block') : leftArrow?.setAttribute('style', 'display: none');
                btns && index >= btns?.length - 1 ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
            }
        };

        const slideImages = (idx: number) => {
            index = idx;
            if (width > 576) {
                index > 0 ? leftArrow?.setAttribute('style', 'display: block') : leftArrow?.setAttribute('style', 'display: none');
            } else {
                btns && btns?.length - 1 === index ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
            }

            btnsActiveClassHandler();

            idx === 0 ? wrapper?.setAttribute('style', 'transform: translateX(0px)') : wrapper?.setAttribute('style', `transform: translateX(-${idx * width}px)`);
        };

        btns?.forEach((btn, idx) => {
            btn.addEventListener('click', ()=> {
                slideImages(idx);
            });
        });

        if (rtl) {
            rightArrow?.addEventListener('click', () => {
                arrowNavigation('-');
            });
            leftArrow?.addEventListener('click', () => {
                arrowNavigation('+');
            });
        } else  {
            rightArrow?.addEventListener('click', () => {
                arrowNavigation('+');
            });
            leftArrow?.addEventListener('click', () => {
                arrowNavigation('-');
            });
        }
        // =========== Swipe Events =============
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let initialPosition = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let moving = false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let transform = 0;
        let diff = 0;
        let currentPosition = 0;

        wrapper?.addEventListener('touchstart', (event: any) => {
            initialPosition = event.touches[ 0 ].clientX;
            moving = true;
            const transformMatrix = window.getComputedStyle(wrapper).getPropertyValue('transform');
            if (transformMatrix !== 'none') {
                transform = Number(transformMatrix.split(',')[ 4 ].trim());
            }
        });
        wrapper?.addEventListener('touchmove', (event: any) => {
            if (moving) {
                currentPosition = event.touches[ 0 ].clientX;
                diff = currentPosition - initialPosition;

                if (diff < 0) {
                    if (btns && index < btns.length - 1) {
                        wrapper.style.transform = `translateX(${transform + diff}px)`;
                    }
                } else if (index > 0) {
                    wrapper.style.transform = `translateX(${transform + diff}px)`;
                }
            }
        });
        wrapper?.addEventListener('touchend', () => {
            moving = false;
            if (diff < 0) {
                index += 1;
                if (btns && index >= btns?.length - 1) {
                    index = btns.length - 1;
                }
                wrapper.style.transform = `translateX(-${width * index}px)`;
                btnsActiveClassHandler();
            } else {
                index -= 1;
                if (index < 0) {
                    index = 0;
                }
                wrapper.style.transform = `translateX(-${width * index}px)`;
                btnsActiveClassHandler();
            }
            if (index >= 0 && btns && index < btns.length - 1) {
                rightArrow.style.display = 'block';
            } else {
                rightArrow.style.display = 'none';
            }
            if (index > 0 && width > 576) {
                leftArrow.style.display = 'block';
            } else {
                leftArrow.style.display = 'none';
            }
        });
    });
};
firstSectionFunction();
