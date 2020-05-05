Known Issues:
  - If the user initiates reading and then clicks Home it will break the page because the loop is still running. Will fix by changing the state.isReading to false when the component unmounts.
  
Features to work on:
  -Smooth transitions between components
  -Add local storage so the content does not change upon refresh
