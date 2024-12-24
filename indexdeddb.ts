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
