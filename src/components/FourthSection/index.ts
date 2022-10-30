import '../../assets/img/4th-section-img1.png';
import '../../assets/img/4th-section-img2.png';
import '../../assets/img/4th-section-img3.png';
import '../../assets/img/4th-section-img4.png';

export const fourthSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const section4 = document.querySelector('body .main .FourthSection');
        const columns = section4?.querySelectorAll('.section-bottom .column');

        const removeActive = () => {
            columns?.forEach((column) => {
                column.classList.remove('active');
                column.classList.remove('horizontal');
            });
        };
        const accrdionHandlerX = (idx: number) => {
            columns?.forEach((column, i) => {
                column.classList.remove('active');
                column.classList.add('horizontal');
                if (i === idx) {
                    column.classList.remove('horizontal');
                    column.classList.add('active');
                }
            });
        };


        columns?.forEach((column, i) => {
            column.addEventListener('click', () => {
                if (column.classList.contains('active')) {
                    removeActive();
                } else {
                    accrdionHandlerX(i);
                }
            });
        });
    });
};
fourthSectionFunction();
