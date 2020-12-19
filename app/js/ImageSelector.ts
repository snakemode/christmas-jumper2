
export class ImageSelector {

  private _index: Map<string, string>;

  constructor() {
    this._index = new Map<string, string>();
    this._index.set("default", "default");
    this._index.set("frametest", "frametest");
    this._index.set("have yourself a merry little christmas (remastered)", "hat");
    this._index.set("have yourself a merry little christmas", "hat");
    this._index.set("jingle bell rock", "bell");
    this._index.set("let it snow! let it snow! let it snow!", "snow");
    this._index.set("rockin' around the christmas tree", "tree");
    this._index.set("rockin around the christmas tree", "tree");
    this._index.set("santa claus is coming to town", "santa");
    this._index.set("waiting for christmas to arrive", "santa");
    this._index.set("deck the halls", "holly");
    this._index.set("deck the hall", "holly");
    this._index.set("i wish it could be christmas everyday", "star");
    this._index.set("we wish you a merry christmas", "pud");
    this._index.set("fairytale of new york (feat. kirsty maccoll)", "star");
    this._index.set("white christmas", "snow");
    this._index.set("sleigh ride", "sled");
    this._index.set("jingle bells - 1", "bell");
    this._index.set("christmas alphabet", "sock");
    this._index.set("santa baby", "hat");
    this._index.set("all i want for christmas is you", "gift");
    this._index.set("it's the most wonderful time of the year", "candy");
    this._index.set("rudolph the red-nosed reindeer", "deer");
    this._index.set("frosty the snowman", "frosty");
  }

  public getImageKeyForSong(songTitle: string) {
    const lowerCaseTitle = songTitle.toLowerCase();
    if (!this._index.has(lowerCaseTitle)) {
      return "default";
    }

    return this._index.get(lowerCaseTitle);
  }
}