type ResumeState = {
    romName: string;
    romData: ArrayBuffer;
    emulatorState: Uint8Array;
    cheats?: CheatCode[];
    controls?: Record<string, string>;
 };
 
