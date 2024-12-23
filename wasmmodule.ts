let saveState: () => Uint8Array;
let loadState: (state: Uint8Array) => void;

// Assign them after initializing the WASM module:
saveState = emulatorModule.save_state;
loadState = emulatorModule.load_state;
