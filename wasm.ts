import { onMount } from "svelte";

let emulator: any;

onMount(async () => {
   const wasmModule = await import("./emulator.js");
   emulator = await wasmModule();
   emulator.init();
});
