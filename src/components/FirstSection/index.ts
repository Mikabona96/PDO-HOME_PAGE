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
        let width = slide.offsetWidth;
        let index = 0;
        const rtl = !!firstSection?.classList.contains('rtl');

        // ========== Button Navigation
        const btnsActiveClassHandler = () => {
            btns?.forEach((btn, i) => {
                index === i ?  btn.classList.add('active') : btn.classList.remove('active');
            });
        };

        window.addEventListener('resize', () => {
            width = slide.offsetWidth;
            wrapper.style.transform = `translateX(-${width * index}px)`;
        });

        const slideImages = (idx: number) => {
            index = idx;

            if (rtl) {
                index > 0 ? rightArrow.style.display = 'block' : rightArrow.style.display = 'none';
                btns && btns.length - 1 <= index ? leftArrow.style.display = 'none' : leftArrow.style.display = 'block';
            } else {
                index > 0 ? leftArrow.style.display = 'block' : leftArrow.style.display = 'none';
                btns && btns.length - 1 <= index ? rightArrow.style.display = 'none' : rightArrow.style.display = 'block';
            }

            btnsActiveClassHandler();

            idx === 0 ? wrapper?.setAttribute('style', 'transform: translateX(0px)') : wrapper?.setAttribute('style', `transform: translateX(${rtl ? '' : '-'}${idx * width}px)`);
        };

        btns?.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                slideImages(i);
            });
        });

        //=============== Arrow Navigation ==========
        if (rtl) {
            leftArrow.addEventListener('click', () => {
                if (btns && btns.length - 1 > index) {
                    index += 1;
                    slideImages(index);
                }
            });
            rightArrow.addEventListener('click', () => {
                if (index >= 0) {
                    index -= 1;
                    slideImages(index);
                }
            });
        } else {
            rightArrow.addEventListener('click', () => {
                if (btns && btns.length - 1 > index) {
                    index += 1;
                    slideImages(index);
                }
            });
            leftArrow.addEventListener('click', () => {
                if (index >= 0) {
                    index -= 1;
                    slideImages(index);
                }
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

                wrapper.style.transform = `translateX(${transform + diff}px)`;
            }
        });
        wrapper?.addEventListener('touchend', () => {
            moving = false;
            if (rtl) {
                if (diff > 0) {
                    index += 1;
                    if (btns && index >= btns?.length - 1) {
                        index = btns.length - 1;
                    }
                    wrapper.style.transform = `translateX(${width * index}px)`;
                } else {
                    index -= 1;
                    if (index < 0) {
                        index = 0;
                    }
                    wrapper.style.transform = `translateX(${width * index}px)`;
                }
                slideImages(index);
            } else {
                if (diff < 0) {
                    index += 1;
                    if (btns && index >= btns?.length - 1) {
                        index = btns.length - 1;
                    }
                    wrapper.style.transform = `translateX(-${width * index}px)`;
                } else {
                    index -= 1;
                    if (index < 0) {
                        index = 0;
                    }
                    wrapper.style.transform = `translateX(-${width * index}px)`;
                }
                slideImages(index);
            }
        });
    });
};
firstSectionFunction();
