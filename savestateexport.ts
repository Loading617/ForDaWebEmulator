const exportState = () => {
    if (saveStateData) {
       const blob = new Blob([saveStateData], { type: "application/octet-stream" });
       const url = URL.createObjectURL(blob);
       const a = document.createElement("a");
       a.href = url;
       a.download = "save_state.bin";
       a.click();
       URL.revokeObjectURL(url);
    } else {
       alert("No save state to export.");
    }
 };
 