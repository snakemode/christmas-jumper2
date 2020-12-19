export interface MediaRecorder {
    new(stream: any, options: any): MediaRecorder;
    ondataavailable: (e: any) => void;
    start: () => void;
    stop: () => void;
    readonly state: any;
}
