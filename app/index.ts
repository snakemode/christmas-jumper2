import { AudioClipHandler } from "./js/AudioClipHandler";
import { AudioRecorder } from "./js/AudioRecorder";
import { ImageSelector } from "./js/ImageSelector";

import { default as RemoteMatrixLedDriver, ArduinoDeviceAdapter, AblyTransport } from "@snakemode/matrix-driver";
import Ably from "ably";

const recorder = new AudioRecorder();
const handler = new AudioClipHandler();
const imageSelector = new ImageSelector();
const ablyClient = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });

const ledDriver = new RemoteMatrixLedDriver({
  displayConfig: { width: 16, height: 16 },
  deviceAdapter: new ArduinoDeviceAdapter([
    new AblyTransport(ablyClient)
  ])
});

recorder.onDataAvailable(async (data) => {
  handler.handle(data);
});

handler.onSongDetected((songTitle) => {
  document.getElementById("song").innerHTML = songTitle;

  const imageFile = imageSelector.getImageKeyForSong(songTitle);
  const imagePath = `./images/${imageFile}.png`;

  ledDriver.image.set(imagePath);
});

document.getElementById("button").onclick = () => { recorder.listen() };