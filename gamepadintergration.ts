window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad);
 });
 
 const handleGamepadInput = () => {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
       const buttons = gamepads[0].buttons;
       buttons.forEach((button, index) => {
          if (button.pressed) {
             emulator.handleGamepadInput(index);
          }
       });
    }
 };
 
 setInterval(handleGamepadInput, 16);
 
