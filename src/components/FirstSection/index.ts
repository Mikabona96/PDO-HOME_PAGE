import '../../assets/img/1st-section-bg.png';
import '../../assets/img/1st-section-bg2.png';
import '../../assets/img/1st-section-bg3.png';
import '../../assets/img/arrow-right.png';


export const firstSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const firstSection = document.querySelector('.FirstSection');
        const wrapper = firstSection?.querySelector('.FirstSection .slider .slides-wrapper');
        const btns = firstSection?.querySelectorAll('.slider-button');
        const rightArrow = firstSection?.querySelector('.arrow-right');
        const leftArrow = firstSection?.querySelector('.arrow-left');
        const figure = (wrapper?.querySelector('.slide figure')) as HTMLElement;
        const width = figure.offsetWidth;
        let index = 0;
        const rtl = !!firstSection?.classList.contains('rtl');

        const arrowNavigation = (operator: string) => {
            if (operator === '+') {
                index += 1;
                btns && btns?.length - 1 <= index ? index = btns?.length - 1 : index;
                btns && index >= btns?.length - 1 ? index = btns?.length - 1 : index;
                wrapper?.setAttribute('style', `transform: translateX(${rtl ? '' : '-'}${index * width}px)`);
                btns?.forEach((btn, i) => {
                    index === i ?  btn.classList.add('active') : btn.classList.remove('active');
                });
                console.log(index);
            } else {
                index -= 1;
                index < 0 ? index = 0 : index;
                wrapper?.setAttribute('style', `transform: translateX(${rtl ? '' : '-'}${index * width}px)`);
                btns?.forEach((btn, i) => {
                    index === i ?  btn.classList.add('active') : btn.classList.remove('active');
                });
                console.log('here');
            }
            if (firstSection?.classList.contains('rtl')) {
                index > 0 ? rightArrow?.setAttribute('style', 'display: block') : rightArrow?.setAttribute('style', 'display: none');
                btns && index >= btns?.length - 1 ? leftArrow?.setAttribute('style', 'display: none') : leftArrow?.setAttribute('style', 'display: block');
            } else {
                index > 0 ? leftArrow?.setAttribute('style', 'display: block') : leftArrow?.setAttribute('style', 'display: none');
                btns && index >= btns?.length - 1 ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
            }
            console.log(index);
        };

        const slideImages = (idx: number) => {
            index = idx;
            console.log(index, idx);
            if (width > 576) {
                index > 0 ? leftArrow?.setAttribute('style', 'display: block') : leftArrow?.setAttribute('style', 'display: none');
            }
            if (rtl) {
                btns && btns?.length - 1 === index ? leftArrow?.setAttribute('style', 'display: none') : leftArrow?.setAttribute('style', 'display: block');
                btns && btns?.length - 1 === index ? rightArrow?.setAttribute('style', 'display: block') : rightArrow?.setAttribute('style', 'display: none');
                index === 0 ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
            } else {
                btns && btns?.length - 1 === index ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
            }

            btns?.forEach((btn, i) => {
                idx === i ?  btn.classList.add('active') : btn.classList.remove('active');
            });

            idx === 0 ? wrapper?.setAttribute('style', 'transform: translateX(0px)') : wrapper?.setAttribute('style', `transform: translateX(${rtl ? '' : '-'}${idx * width}px)`);
            console.log(index);
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
    });
};
firstSectionFunction();
