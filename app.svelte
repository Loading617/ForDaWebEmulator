<script lang="ts">
    import { onMount } from "svelte";
    import EmulatorCanvas from "./EmulatorCanvas.svelte";
    import FileUploader from "./FileUploader.svelte";
    import ControlPanel from "./ControlPanel.svelte";
 
    let emulator: any;
    let saveStateData: Uint8Array | null = null;
 
    const initializeEmulator = (romData: ArrayBuffer) => {
       emulator.loadROM(romData);
    };
 
    const saveState = () => {
       if (emulator) {
          saveStateData = emulator.saveState();
          alert("State saved successfully!");
       }
    };
 
    const loadState = () => {
       if (emulator && saveStateData) {
          emulator.loadState(saveStateData);
          alert("State loaded successfully!");
       } else {
          alert("No saved state to load.");
       }
    };
 
    const startEmulator = () => emulator?.start();
    const pauseEmulator = () => emulator?.pause();
    const resetEmulator = () => emulator?.reset();
 </script>
 
 <main>
    <h1>ForDaWebEmulator</h1>
    <FileUploader on:load={(event) => initializeEmulator(event.detail)} />
    <EmulatorCanvas {emulator} />
    <ControlPanel
       onStart={startEmulator}
       onPause={pauseEmulator}
       onReset={resetEmulator}
       onSaveState={saveState}
       onLoadState={loadState}
    />
 </main>
 
