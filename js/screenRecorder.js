const recordButton = document.getElementById('start-recording');
const stopButton = document.getElementById('stop-recording');


recordButton.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
        video: {frameRate: {ideal: 30}}
    });

    const mediaRecorder = new MediaRecorder(media, {
        mimeType: 'video/webm; codecs=vp8, opus'
    });

    mediaRecorder.start();
    const [video] = media.getVideoTracks();

    stopButton.addEventListener('click', () => {
        mediaRecorder.stop();
    });

    video.addEventListener('ended', () => {
        mediaRecorder.stop();
    });

    mediaRecorder.addEventListener('dataavailable', (e) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(e.data);
        link.download = 'video.webm';
        link.click();
    });
});


