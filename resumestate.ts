type ResumeState = {
    romName: string;
    romData: ArrayBuffer;
    emulatorState: Uint8Array; // Save state from the emulator
    cheats?: CheatCode[];
    controls?: Record<string, string>;
 };
 