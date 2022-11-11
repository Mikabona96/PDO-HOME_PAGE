import '../../assets/img/logo.png';
import '../../assets/img/logo-text.png';
import '../../assets/img/logo-text-2.png';
import '../../assets/img/drop-menu-img1.png';
import '../../assets/img/drop-menu-img2.png';
import '../../assets/img/drop-menu-img3.png';
import '../../assets/img/drop-menu-img4.png';
import '../../assets/img/drop-menu-img5.png';
import '../../assets/img/search.png';
import '../../assets/img/combinelogo.png';
import '../../assets/img/facebook.png';
import '../../assets/img/instagram.png';
import '../../assets/img/twitter.png';
import '../../assets/img/linkedin.png';

export const headerFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const open = document.querySelector('.open-menu');
        const close = document.querySelector('.close-menu');
        const headerContent = document.querySelector('.header-content');
        const body = (document.querySelector('body')) as HTMLBodyElement;
        const links = document.querySelectorAll('.Header .header-links-second-row .header-link a');
        const header = (document.querySelector('.Header')) as HTMLElement;
        const dropMenu = (document.querySelector('.Header .drop-menu')) as HTMLDivElement;
        const dropMenuItems = document.querySelectorAll('.drop-menu .drop-menu-item');
        const width = header.clientWidth;

        if (width >= 1360) {
            dropMenu.addEventListener('mouseleave', () => {
                header.classList.remove('active');
                dropMenu.style.display = 'none';
            });
            const dropMenuHandler = (idx: number) => {
                dropMenuItems.forEach((item, i) => {
                    item.classList.remove('active');
                    if (idx === i) {
                        item.classList.add('active');
                    }
                });
            };
            links.forEach((link, idx) => {
                link.addEventListener('mouseenter', (event) => {
                    event.preventDefault();
                    header.classList.add('active');
                    dropMenu.style.display = 'flex';
                    dropMenuHandler(idx);
                });
            });
        }


        open?.addEventListener('click', () => {
            if (width <= 992) {
                header.classList.add('active');
            }
            headerContent?.classList.add('active');
            body.style.overflow = 'hidden';
        });

        close?.addEventListener('click', () => {
            headerContent?.classList.remove('active');
            body.style.overflow = '';
        });
    });
};
headerFunction();
