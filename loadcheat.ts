onMount(() => {
    const savedCheats = localStorage.getItem("cheats");
    if (savedCheats) {
       cheats = JSON.parse(savedCheats);
    }
 });
 