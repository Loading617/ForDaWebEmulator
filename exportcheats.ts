const exportCheats = () => {
    const blob = new Blob([JSON.stringify(cheats)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cheats.json";
    a.click();
    URL.revokeObjectURL(url);
 };
 