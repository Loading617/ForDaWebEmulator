<script lang="ts">
    import { onMount } from "svelte";
    import EmulatorCanvas from "./EmulatorCanvas.svelte";
    import FileUploader from "./FileUploader.svelte";
    import ControlPanel from "./ControlPanel.svelte";
    import ControlSettings from "./ControlSettings.svelte";
    import Cheats Managerimport Cheatmanager from "./cheatmanager.svelte";
 
    let emulator: any;
    let saveStateData: Uint8Array | null = null;
    let controls = { ...defaultControls };
    let cheats: CheatCode[] = [];

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
 
    // Save controls to localStorage
    const saveControls = () => {
       localStorage.setItem("controls", JSON.stringify(controls));
    };
 
    // Load controls from localStorage
    const loadControls = () => {
       const savedControls = localStorage.getItem("controls");
       if (savedControls) {
          controls = JSON.parse(savedControls);
       }
    };
 
    // Apply updated controls
    const updateControls = (updatedControls: typeof controls) => {
       controls = { ...updatedControls };
       saveControls();
    };
 
    onMount(() => {
       loadControls();
    });
 
    // Handle key input during gameplay
    const handleKeyPress = (event: KeyboardEvent) => {
       const action = Object.keys(controls).find((key) => controls[key] === event.code);
       if (action && emulator) {
          emulator.handleAction(action); // Map action to emulator method
       }
    };
 
    window.addEventListener("keydown", handleKeyPress);

    const addCheat = (cheat: CheatCode) => {
      cheats = [...cheats, cheat];
      if (emulator) {
         emulator.addCheat(cheat.code, cheat.enabled); // Emulator integration
      }
   };

   const toggleCheat = (id: string, enabled: boolean) => {
      cheats = cheats.map((cheat) =>
         cheat.id === id ? { ...cheat, enabled } : cheat
      );
      const cheat = cheats.find((cheat) => cheat.id === id);
      if (cheat && emulator) {
         emulator.toggleCheat(cheat.code, enabled); // Emulator integration
      }
   };

   const removeCheat = (id: string) => {
      const cheat = cheats.find((cheat) => cheat.id === id);
      if (cheat && emulator) {
         emulator.removeCheat(cheat.code); // Emulator integration
      }
      cheats = cheats.filter((cheat) => cheat.id !== id);
   };
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
    onLoadState={loadState}/>
    <h2>Control Settings</h2>
    <ControlSettings {controls} onChange={updateControls} />
    <CheatManager
    {cheats}
      onAddCheat={addCheat}
      onToggleCheat={toggleCheat}
      onRemoveCheat={removeCheat}/>
 </main>
 
