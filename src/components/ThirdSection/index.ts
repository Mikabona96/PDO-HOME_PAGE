import '../../assets/img/3rd-section-logo.png';
import '../../assets/img/3rd-section-bg.png';
import '../../assets/img/3rd-section-slide-1.png';
import '../../assets/img/3rd-section-slide-2.png';
import '../../assets/img/3rd-section-slide-3.png';

export const thirdSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const navBtn = document.querySelectorAll('.nav-btn');
        const slider = document.querySelector('.ThirdSection .slider .slide-wrapper');
        const width = slider?.querySelector('.slide')?.clientWidth;

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
    });
};
thirdSectionFunction();
