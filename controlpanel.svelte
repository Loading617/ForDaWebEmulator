<script lang="ts">
    export let onStart: () => void;
    export let onPause: () => void;
    export let onReset: () => void;
    export let onSaveState: () => void;
    export let onLoadState: () => void;
 </script>
 
 <div>
    <button on:click={onStart}>Start</button>
    <button on:click={onPause}>Pause</button>
    <button on:click={onReset}>Reset</button>
    <button on:click={onSaveState}>Save State</button>
    <button on:click={onLoadState}>Load State</button>
 </div>
 
