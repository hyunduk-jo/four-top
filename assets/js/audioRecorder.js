const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const audioPreview = document.getElementById("jsAudioPreview");

let streamObject;
let audioRecorder;

const handleAudioData = (event) => {
  const { data: audioFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(audioFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
}

const stopRecording = () => {
  audioRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getAudio);
  recordBtn.innerHTML = "Start Recording";
}

const startRecording = () => {
  audioRecorder = new MediaRecorder(streamObject);
  audioRecorder.start();
  audioRecorder.addEventListener("dataavailable", handleAudioData);
  recordBtn.addEventListener("click", stopRecording);
}

const getAudio = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    audioPreview.srcObject = stream;
    audioPreview.muted = true;
    audioPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "😢 Can't Record";
  } finally {
    recordBtn.removeEventListener("click", getAudio);
  }
}

function init() {
  recordBtn.addEventListener("click", getAudio);
}

if (recorderContainer) {
  init();
}