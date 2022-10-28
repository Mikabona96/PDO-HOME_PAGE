import '../../assets/img/3rd-section-logo.png';
import '../../assets/img/3rd-section-bg.png';
import '../../assets/img/3rd-section-slide-1.png';
import '../../assets/img/3rd-section-slide-2.png';
import '../../assets/img/3rd-section-slide-3.png';

export const thirdSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const navBtn = document.querySelectorAll('.nav-btn');
        const slider = (document.querySelector('.ThirdSection .slider .slide-wrapper')) as HTMLElement;
        let width = slider?.querySelector('.slide')?.clientWidth;
        let rtl = false;

        window.addEventListener('resize', () => {
            width = slider?.querySelector('.slide')?.clientWidth;
        });

        const sliderNavigation = (idx: number) => {
            navBtn.forEach((btn) => {
                btn.classList.remove('active');
            });
            navBtn[ idx ].classList.add('active');
            if (idx === 0) {
                if (slider) {
                    slider.setAttribute('style', 'transform: translateX(0px)');
                }
            } else if (slider) {
                slider.setAttribute('style', `transform: translateX(-${width ? idx * width : null}px)`);
            }
        };

        navBtn.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                sliderNavigation(i);
            });
        });
        // =========== Swipe Events =============
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let initialPosition = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let moving = false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let transform = 0;
        let diff = 0;
        let currentPosition = 0;
        let index = 0;

        slider?.addEventListener('touchstart', (event: any) => {
            initialPosition = event.touches[ 0 ].clientX;
            moving = true;
            const transformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');
            if (transformMatrix !== 'none') {
                transform = Number(transformMatrix.split(',')[ 4 ].trim());
            }
        });
        slider?.addEventListener('touchmove', (event: any) => {
            if (moving) {
                currentPosition = event.touches[ 0 ].clientX;
                diff = currentPosition - initialPosition;

                slider.style.transform = `translateX(${transform + diff}px)`;
            }
        });
        slider?.addEventListener('touchend', () => {
            moving = false;
            if (rtl) {
                if (diff > 0) {
                    index += 1;
                    if (navBtn && index >= navBtn?.length - 1) {
                        index = navBtn.length - 1;
                    }
                    slider.style.transform = `translateX(${width && width * index}px)`;
                } else {
                    index -= 1;
                    if (index < 0) {
                        index = 0;
                    }
                    slider.style.transform = `translateX(${width && width * index}px)`;
                }
                sliderNavigation(index);
            } else {
                if (diff < 0) {
                    index += 1;
                    if (navBtn && index >= navBtn?.length - 1) {
                        index = navBtn.length - 1;
                    }
                    slider.style.transform = `translateX(-${width && width * index}px)`;
                } else {
                    index -= 1;
                    if (index < 0) {
                        index = 0;
                    }
                    slider.style.transform = `translateX(-${width && width * index}px)`;
                }
                sliderNavigation(index);
            }
        });
    });
};
thirdSectionFunction();
