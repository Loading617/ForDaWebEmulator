<script lang="ts">
    import { onMount } from "svelte";
    import EmulatorCanvas from "./EmulatorCanvas.svelte";
    import FileUploader from "./FileUploader.svelte";
    import ControlPanel from "./ControlPanel.svelte";
 
    let emulator: any;
 
    const initializeEmulator = (romData: ArrayBuffer) => {
       emulator.loadROM(romData);
    };
 
    const startEmulator = () => emulator?.start();
    const pauseEmulator = () => emulator?.pause();
    const resetEmulator = () => emulator?.reset();
 </script>
 
 <main>
    <h1>ForDaWebEmulator</h1>
    <FileUploader on:load={(event) => initializeEmulator(event.detail)} />
    <EmulatorCanvas {emulator} />
    <ControlPanel onStart={startEmulator} onPause={pauseEmulator} onReset={resetEmulator} />
 </main>
 