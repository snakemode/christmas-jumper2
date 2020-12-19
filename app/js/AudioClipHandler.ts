export type OnSongDetectedHandler = (songTitle: string) => void;

export class AudioClipHandler {

  private _cb: OnSongDetectedHandler;

  constructor() {
    this._cb = () => { };
  }

  public onSongDetected(onAudioAvailable: OnSongDetectedHandler) {
    this._cb = onAudioAvailable;
  }

  public async handle(data: ArrayBuffer) {
    const response = await this.postData('/api/what-song', data);
    const title = response?.result?.title || "";

    if (title === "") {
      return;
    }

    this._cb(title);
  }

  private async postData(url: string, data: ArrayBuffer) {
    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));

    const response = await fetch(url, {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bytes: base64String })
    });

    return await response.json();
  }
}
