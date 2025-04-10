let saveState: () => Uint8Array;
let loadState: (state: Uint8Array) => void;

saveState = emulatorModule.save_state;
loadState = emulatorModule.load_state;
