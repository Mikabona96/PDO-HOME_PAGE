import '../../assets/img/6th-section-slide1.png';
import '../../assets/img/5-s-content1.png';
import '../../assets/img/5-s-content2.png';

export const seventhSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const Section7 = document.querySelector('.SeventhSection');
        if (Section7) {
            const tabs = Section7.querySelectorAll('.tab');
            const content = Section7.querySelector('.tabs-content-wrapper');
            let width = content?.querySelector('.tab-content')?.clientWidth;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            let index = 0;
            const toggleTabs = (idx: number) => {
                index = idx;
                tabs.forEach((tab) => {
                    tab.classList.remove('active');
                });
                tabs[ idx ].classList.add('active');
                if (idx === 0) {
                    content?.setAttribute('style', 'transform: translateX(0px)');
                } else {
                    content?.setAttribute('style', `transform: translateX(-${width ? idx * width : null}px)`);
                }
            };

            tabs.forEach((tab, idx) => {
                tab.addEventListener('click', () => {
                    toggleTabs(idx);
                });
            });

            window.addEventListener('resize', () => {
                width = content?.querySelector('.tab-content')?.clientWidth;
                toggleTabs(index);
            });

            // ================= Custom Select ================
            const selected = (document.querySelector('.selected')) as HTMLElement;
            const optionsContainer = document.querySelector('.options-container');

            const optionsList = document.querySelectorAll('.option');

            selected?.addEventListener('click', () => {
                optionsContainer?.classList.toggle('active');
            });

            optionsList.forEach((o) => {
                o.addEventListener('click', () => {
                    const label = o?.querySelector('label');
                    const data = o?.querySelector('label')?.innerHTML;
                    const index =  label ? label.getAttribute('data-value') : null;
                    if (Number(index) === 0 || !index) {
                        content?.setAttribute('style', 'transform: translateX(0px)');
                    } else {
                        content?.setAttribute('style', `transform: translateX(-${Number(index) * 327}px)`);
                    }
                    selected.innerHTML = `${data}`;
                    optionsContainer?.classList.remove('active');
                });
            });
        }
    });
};

seventhSectionFunction();
