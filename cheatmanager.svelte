<script lang="ts">
    import { v4 as uuidv4 } from "uuid"; // Install uuid package: npm install uuid
    export let cheats: CheatCode[];
    export let onAddCheat: (cheat: CheatCode) => void;
    export let onToggleCheat: (id: string, enabled: boolean) => void;
    export let onRemoveCheat: (id: string) => void;
 
    let newCheat = { description: "", code: "" };
 
    const addCheat = () => {
       if (newCheat.code.trim()) {
          onAddCheat({
             id: uuidv4(),
             description: newCheat.description || "Untitled Cheat",
             code: newCheat.code.trim(),
             enabled: false,
          });
          newCheat = { description: "", code: "" };
       }
    };
 </script>
 
 <div>
    <h2>Cheat Codes</h2>
    <ul>
       {#each cheats as cheat (cheat.id)}
          <li>
             <input
                type="checkbox"
                bind:checked={cheat.enabled}
                on:change={() => onToggleCheat(cheat.id, cheat.enabled)}
             />
             <span>{cheat.description} - {cheat.code}</span>
             <button on:click={() => onRemoveCheat(cheat.id)}>Remove</button>
          </li>
       {/each}
    </ul>
 
    <div>
       <h3>Add Cheat</h3>
       <input
          type="text"
          placeholder="Description"
          bind:value={newCheat.description}
       />
       <input
          type="text"
          placeholder="Cheat Code"
          bind:value={newCheat.code}
       />
       <button on:click={addCheat}>Add Cheat</button>
    </div>
 </div>
 