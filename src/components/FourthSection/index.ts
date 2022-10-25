import '../../assets/img/4th-section-img1.png';
import '../../assets/img/4th-section-img2.png';
import '../../assets/img/4th-section-img3.png';
import '../../assets/img/4th-section-img4.png';

export const fourthSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const section4 = document.querySelector('body .main .FourthSection');
        const columns = section4?.querySelectorAll('.section-bottom .column');
        const arrows = section4?.querySelectorAll('.section-bottom .column .arrow');
        const width = section4?.clientWidth;


        if (width && width <= 992) {
            const removeActive = () => {
                columns?.forEach((column) => {
                    column.classList.remove('active');
                });
            };

            const accordionHandlerY = (idx: number) => {
                columns && columns[ idx ].classList.contains('active') ? removeActive() : columns?.forEach((column, i) => {
                    idx === i ? column.classList.add('active') : column.classList.remove('active');
                });
            };

            arrows?.forEach((arrow, i) => {
                arrow.addEventListener('click', () => {
                    accordionHandlerY(i);
                });
            });
        } else {
            const removeActive = () => {
                columns?.forEach((column) => {
                    column.classList.remove('active');
                    column.classList.remove('horizontal');
                    column.setAttribute('style', 'width: 380px');
                });
            };
            const accrdionHandlerX = (idx: number) => {
                columns?.forEach((column, i) => {
                    column.classList.remove('active');
                    column.classList.add('horizontal');
                    column.setAttribute('style', 'width: 180px');
                    if (i === idx) {
                        column.classList.remove('horizontal');
                        column.classList.add('active');
                        column.setAttribute('style', 'width: 880px');
                    }
                });
            };

            columns?.forEach((column, idx) => {
                column.addEventListener('click', () => {
                    if (column.classList.contains('active')) {
                        removeActive();
                    } else {
                        accrdionHandlerX(idx);
                    }
                });
            });
        }
    });
};
fourthSectionFunction();
