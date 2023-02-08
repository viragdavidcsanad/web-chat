var socket = io("http://localhost:5000/");

navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    const video = document.createElement("video");
    video.setAttribute("autoplay", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("controls", "true");
    video.srcObject = stream;
    document.querySelector(".js-container").appendChild(video);
  });
