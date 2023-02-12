var socket = io("http://localhost:5000/");

let video = null;

function stopStream() {
  document.querySelector(".js-container").innerHTML = "";
}

function startStream(audioDeviceId) {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId: audioDeviceId,
      },
      video: true,
    })
    .then((stream) => {
      stopStream();
      video = document.createElement("video");
      video.setAttribute("autoplay", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("controls", "true");
      video.srcObject = stream;
      document.querySelector(".js-container").appendChild(video);

      window.stream = stream;
    });
}

// navigator.mediaDevices
//   .getUserMedia({
//     audio: true,
//     video: true,
//   })
//   .then((stream) => {
//     const video = document.createElement("video");
//     video.setAttribute("autoplay", "true");
//     video.setAttribute("playsinline", "true");
//     video.setAttribute("controls", "true");
//     video.srcObject = stream;
//     document.querySelector(".js-container").appendChild(video);
//   });

navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    let html = "";
    devices.map(({ kind, label, deviceId }) => {
      if (kind === "audioinput") {
        html += `<option value="${deviceId}">${label}</option>`;
      }
    });
    const devicesSelect = document.querySelector(".js-input-devices");
    devicesSelect.innerHTML = html;
    devicesSelect.addEventListener("change", changeMicrophone);
  })
  .catch(function (err) {
    console.log(err.name + ": " + err.message);
  });

function changeMicrophone(event) {
  console.log(event.target.value);
}

document.querySelector(".js-start-stream").addEventListener("click", () => {
  const microphoneId = document.querySelector(".js-input-devices").value;
  startStream(microphoneId);
});

document.querySelector(".js-stop-stream").addEventListener("click", stopStream);
