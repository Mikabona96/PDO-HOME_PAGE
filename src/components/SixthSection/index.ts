import '../../assets/img/6th-section-slide1.png';
import '../../assets/img/5-s-content1.png';
import '../../assets/img/5-s-content2.png';

export const sixthSectionFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const Section6 = document.querySelector('.SixthSection');
        if (Section6) {
            const tabs = Section6.querySelectorAll('.tab');
            const content = Section6.querySelector('.tabs-content-wrapper');
            const width = content?.querySelector('.tab-content')?.clientWidth;
            // const select = (Section6.querySelector('.select')) as HTMLSelectElement;
            const toggleTabs = (idx: number) => {
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
                    console.log(index, 'index');
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

sixthSectionFunction();
