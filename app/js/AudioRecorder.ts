import { MediaRecorder } from "./types";

export type OnDataAvailableHandler = (data: ArrayBuffer) => void;

export class AudioRecorder {

  private _callback: OnDataAvailableHandler;

  constructor() {
    if (!window["MediaRecorder"]) {
      throw Error("Does not support MediaRecorder API");
    }

    this._callback = () => { };
  }

  public onDataAvailable(callback: OnDataAvailableHandler) {
    this._callback = callback;
  }

  public async listen(): Promise<void> {
    const MediaRecorder = window["MediaRecorder"] as MediaRecorder;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const options = { sampleRate: 48000, channelCount: 2 };
    const mediaRecorder = new MediaRecorder(stream, options);
    this.startRecording(mediaRecorder);
  }

  private startRecording(recorder: MediaRecorder) {
    recorder.ondataavailable = async (e) => {
      const data = await e.data.arrayBuffer() as ArrayBuffer;
      this._callback(data);
    };

    recorder.start();

    console.log(recorder.state);
    console.log("recorder started");

    window.setTimeout(() => {
      recorder.stop();
      console.log("recorder stopped");
      this.startRecording(recorder);
    }, 7 * 1000);
  }
}
