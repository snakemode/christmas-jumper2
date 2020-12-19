import Ably from "ably";

import { AudioClipHandler } from "./js/AudioClipHandler";
import { AudioRecorder } from "./js/AudioRecorder";
import { ImageSelector } from "./js/ImageSelector";

import { default as RemoteMatrixLedDriver, ArduinoDeviceAdapter, AblyTransport } from "@snakemode/matrix-driver";

const songTitleH2 = document.getElementById("song") as HTMLElement;
const startListeningButton = document.getElementById("button") as HTMLButtonElement;

const recorder = new AudioRecorder();
const handler = new AudioClipHandler();
const imageSelector = new ImageSelector();
const ablyClient = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });

const ledDriver = new RemoteMatrixLedDriver({
  displayConfig: { width: 16, height: 16 },
  deviceAdapter: new ArduinoDeviceAdapter(new AblyTransport(ablyClient))
});

recorder.onDataAvailable(async (data) => { handler.handle(data); });

handler.onSongDetected((songTitle) => {
  songTitleH2.innerHTML = songTitle;
  const imageFile = imageSelector.getImageKeyForSong(songTitle);
  ledDriver.image.set(`./images/${imageFile}.png`);
});

startListeningButton.addEventListener("click", () => { recorder.listen(); });