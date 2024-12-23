<script lang="ts">
    import { onMount } from "svelte";
    export let controls: Record<string, string>;
    export let onChange: (updatedControls: Record<string, string>) => void;
 
    let editingKey: string | null = null;
 
    const startEditing = (action: string) => {
       editingKey = action;
    };
 
    const handleKeyPress = (event: KeyboardEvent) => {
       if (editingKey) {
          controls[editingKey] = event.code;
          onChange(controls);
          editingKey = null;
       }
    };
 
    onMount(() => {
       window.addEventListener("keydown", handleKeyPress);
       return () => window.removeEventListener("keydown", handleKeyPress);
    });
 </script>
 
 <style>
    .editing {
       color: red;
    }
 </style>
 
 <table>
    <thead>
       <tr>
          <th>Action</th>
          <th>Key</th>
          <th>Change</th>
       </tr>
    </thead>
    <tbody>
       {#each Object.entries(controls) as [action, key]}
          <tr>
             <td>{action}</td>
             <td class:editing={editingKey === action}>{key}</td>
             <td>
                <button on:click={() => startEditing(action)}>Edit</button>
             </td>
          </tr>
       {/each}
    </tbody>
 </table>
 