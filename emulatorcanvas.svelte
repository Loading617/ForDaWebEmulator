<script lang="ts">
    export let emulator: any;
    let canvas: HTMLCanvasElement;
 
    onMount(() => {
       if (emulator) {
          emulator.setCanvas(canvas);
       }
    });
 </script>
 
 <canvas bind:this={canvas} width="640" height="480"></canvas>
 