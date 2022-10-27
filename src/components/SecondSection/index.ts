import '../../assets/img/2nd-section-bg-poster.png';
import '../../assets/img/2nd-section-playBtn.png';
import '../../assets/video-bg.mp4';


export const SecondSectionFunction = () => {
    const video = (document.querySelector('.video-bg .video')) as HTMLVideoElement;
    const playBtn = (document.querySelector('.playBtn')) as HTMLElement;
    const infoContainer = (document.querySelector('.info-container')) as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let isPlaying = false;

    video.addEventListener('click', () => {
        isPlaying ? infoContainer.style.opacity = '1' : infoContainer.style.opacity = '0.8';
        !isPlaying ? playBtn.style.opacity = '0' : playBtn.style.opacity = '1';
        isPlaying ? video.pause() : video.play();
        isPlaying = !isPlaying;
    });
    playBtn.addEventListener('click', () => {
        isPlaying = true;
        video.play();
        isPlaying ? playBtn.style.opacity = '0' : playBtn.style.opacity = '1';
        isPlaying ? infoContainer.style.opacity = '0.8' : infoContainer.style.opacity = '0.8';
    });
};

SecondSectionFunction();
