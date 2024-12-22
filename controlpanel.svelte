<script lang="ts">
    export let onStart: () => void;
    export let onPause: () => void;
    export let onReset: () => void;
 </script>
 
 <div>
    <button on:click={onStart}>Start</button>
    <button on:click={onPause}>Pause</button>
    <button on:click={onReset}>Reset</button>
 </div>
 