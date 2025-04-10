<script lang="ts">
    import { onMount } from "svelte";
    import EmulatorCanvas from "./EmulatorCanvas.svelte";
    import FileUploader from "./FileUploader.svelte";
    import ControlPanel from "./ControlPanel.svelte";
    import ControlSettings from "./ControlSettings.svelte";
    import Cheats Manager from "./cheatmanager.svelte";

    let emulator: any;
    let saveStateData: Uint8Array | null = null;
    let controls = { ...defaultControls };
    let cheats: CheatCode[] = [];
    let currentRomName = "";
    let currentRomData: ArrayBuffer | null = null;

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
 
    const saveControls = () => {
       localStorage.setItem("controls", JSON.stringify(controls));
    };
 
    const loadControls = () => {
       const savedControls = localStorage.getItem("controls");
       if (savedControls) {
          controls = JSON.parse(savedControls);
       }
    };
 
    const updateControls = (updatedControls: typeof controls) => {
       controls = { ...updatedControls };
       saveControls();
    };
 
    onMount(() => {
       loadControls();
    });
 
    const handleKeyPress = (event: KeyboardEvent) => {
       const action = Object.keys(controls).find((key) => controls[key] === event.code);
       if (action && emulator) {
          emulator.handleAction(action);
       }
    };
 
    window.addEventListener("keydown", handleKeyPress);

    const addCheat = (cheat: CheatCode) => {
      cheats = [...cheats, cheat];
      if (emulator) {
         emulator.addCheat(cheat.code, cheat.enabled);
      }
   };

   const toggleCheat = (id: string, enabled: boolean) => {
      cheats = cheats.map((cheat) =>
         cheat.id === id ? { ...cheat, enabled } : cheat
      );
      const cheat = cheats.find((cheat) => cheat.id === id);
      if (cheat && emulator) {
         emulator.toggleCheat(cheat.code, enabled);
      }
   };

   const removeCheat = (id: string) => {
      const cheat = cheats.find((cheat) => cheat.id === id);
      if (cheat && emulator) {
         emulator.removeCheat(cheat.code);
      }
      cheats = cheats.filter((cheat) => cheat.id !== id);
   };
   const saveResumeState = () => {
      if (!emulator || !currentRomData) {
         alert("No game running to save state.");
         return;
      }

      const emulatorState = emulator.saveState();
      const resumeState: ResumeState = {
         romName: currentRomName,
         romData: currentRomData,
         emulatorState,
         cheats,
         controls,
      };

      localStorage.setItem("resumeState", JSON.stringify(resumeState));
      alert("Resume state saved successfully!");
   };

   const loadResumeState = () => {
      const savedState = localStorage.getItem("resumeState");
      if (!savedState) {
         alert("No resume state found.");
         return;
      }

      const { romName, romData, emulatorState, cheats, controls }: ResumeState =
         JSON.parse(savedState);

      currentRomName = romName;
      currentRomData = new Uint8Array(Object.values(romData));
      emulator.loadROM(currentRomData);
      emulator.loadState(new Uint8Array(Object.values(emulatorState)));

      if (cheats) {
         cheats.forEach((cheat) => {
            emulator.addCheat(cheat.code, cheat.enabled);
         });
      }

      if (controls) {
         Object.assign(controls, controls);
      }

      alert("Game resumed successfully!");
   };

   const initializeEmulator = (romData: ArrayBuffer) => {
      currentRomName = "Game Title";
      currentRomData = romData;
      emulator.loadROM(romData);
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
    onSaveResumeState={saveResumeState}
    onResume={loadResumeState}
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
 
