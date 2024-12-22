<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
 
    const handleFile = (event: Event) => {
       const file = (event.target as HTMLInputElement).files?.[0];
       if (file) {
          const reader = new FileReader();
          reader.onload = () => dispatch("load", reader.result);
          reader.readAsArrayBuffer(file);
       }
    };
 </script>
 
 <input type="file" accept=".iso,.bin,.cue,.gcm,.elf" on:change={handleFile} />
 