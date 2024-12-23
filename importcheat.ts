const importCheats = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
       const reader = new FileReader();
       reader.onload = () => {
          const importedCheats = JSON.parse(reader.result as string);
          cheats = [...cheats, ...importedCheats];
          saveCheats();
       };
       reader.readAsText(file);
    }
 };
 