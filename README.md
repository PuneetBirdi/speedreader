Known Issues:
  - DOES NOT WORK IN IE EDGE - not sure why, looking into it.
  - If the user initiates reading and then clicks Home it will break the page because the loop is still running. Will fix by changing the state.isReading to false when the component unmounts.
  
  - When a User starts reading - stops - changes WPM - and starts again, there is an issue with the interval switching back and forth from the old to new causing choppy changes. Thinking this may be an issue when interval is being passed from controlBar.js to App.js. Temp fix: Stop+Reset refreshes the whole window.
  
Features to work on:
  - Smooth transitions between components.
  - Add local storage so the content does not change upon refresh.
  - Implement Firebase for User Authentication, would like if a user could save content to their account.

![processMap](/v0.9-flow.png)
