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
        const arrowNavigation = (operator: string) => {
            if (operator === '+') {
                index += 1;
                btns && index >= btns?.length - 1 ? index = btns?.length - 1 : index;
                wrapper?.setAttribute('style', `transform: translateX(-${index * width}px)`);
                btns?.forEach((btn, i) => {
                    index === i ?  btn.classList.add('active') : btn.classList.remove('active');
                });
            } else {
                index -= 1;
                index < 0 ? index = 0 : index;
                wrapper?.setAttribute('style', `transform: translateX(-${index * width}px)`);
                btns?.forEach((btn, i) => {
                    index === i ?  btn.classList.add('active') : btn.classList.remove('active');
                });
            }
            index > 0 ? leftArrow?.setAttribute('style', 'display: block') : leftArrow?.setAttribute('style', 'display: none');
            btns && index >= btns?.length - 1 ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
        };

        const slideImages = (idx: number) => {
            index = idx;
            if (width > 576) {
                index > 0 ? leftArrow?.setAttribute('style', 'display: block') : leftArrow?.setAttribute('style', 'display: none');
            }
            btns && btns?.length - 1 === index ? rightArrow?.setAttribute('style', 'display: none') : rightArrow?.setAttribute('style', 'display: block');
            console.log(index);

            btns?.forEach((btn, i) => {
                idx === i ?  btn.classList.add('active') : btn.classList.remove('active');
            });
            idx === 0 ? wrapper?.setAttribute('style', 'transform: translateX(0px)') : wrapper?.setAttribute('style', `transform: translateX(-${idx * width}px)`);
        };

        btns?.forEach((btn, idx) => {
            btn.addEventListener('click', ()=> {
                slideImages(idx);
            });
        });
        rightArrow?.addEventListener('click', () => {
            arrowNavigation('+');
        });
        leftArrow?.addEventListener('click', () => {
            arrowNavigation('-');
        });
    });
};
firstSectionFunction();
