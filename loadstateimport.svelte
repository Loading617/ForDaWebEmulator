<input type="file" accept=".bin" on:change={(event) => handleStateFile(event)} />

<script lang="ts">
   const handleStateFile = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            saveStateData = new Uint8Array(arrayBuffer);
            alert("Save state imported successfully!");
         };
         reader.readAsArrayBuffer(file);
      }
   };
</script>
