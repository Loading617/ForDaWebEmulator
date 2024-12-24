import { openDB } from "idb";

const saveToIndexedDB = async (resumeState: ResumeState) => {
   const db = await openDB("EmulatorDB", 1, {
      upgrade(db) {
         db.createObjectStore("resumeState");
      },
   });
   await db.put("resumeState", resumeState, "current");
};

const loadFromIndexedDB = async (): Promise<ResumeState | null> => {
   const db = await openDB("EmulatorDB", 1);
   return (await db.get("resumeState", "current")) || null;
};

const saveResumeState = async () => {
   if (!emulator || !currentRomData) return;

   const emulatorState = emulator.saveState();
   const resumeState: ResumeState = {
      romName: currentRomName,
      romData: currentRomData,
      emulatorState,
      cheats,
      controls,
   };

   await saveToIndexedDB(resumeState);
   alert("Resume state saved successfully!");
};

const loadResumeState = async () => {
   const resumeState = await loadFromIndexedDB();
   if (!resumeState) {
      alert("No resume state found.");
      return;
   }

   const { romName, romData, emulatorState, cheats, controls } = resumeState;

   currentRomName = romName;
   currentRomData = romData;
   emulator.loadROM(romData);
   emulator.loadState(emulatorState);

   if (cheats) cheats.forEach((cheat) => emulator.addCheat(cheat.code, cheat.enabled));
   if (controls) Object.assign(controls, controls);

   alert("Game resumed successfully!");
};
