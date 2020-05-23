[Live Site](https://puneetbirdi.github.io/speedreader/#/)

#### May 23, 2020
- Managed to refactor the singleWord loop into a recursive function that uses a timeout, so the interval can be changed now even while reading. 
- Refactoring also allowed me to add in a smoothly functioning pause/resume/reset functionality without having to refresh the window.
- Decided to restructure the way things are passed. ControlBar.js now handles all of the loop changes and the parameters, and a new ContentBar.js component handles fetching, splitting, and setting the content into the SingleWord component.

- NOTE: I've decided to deactivate the Highlighter functionality. I want to completely refine SingleWord first before moving over the Highlighter.

Known Issues:
  - DOES NOT WORK IN IE EDGE - not sure why, looking into it.
  - If the user initiates reading and then clicks Home it will break the page because the loop is still running. Will fix by changing the state.isReading to false when the component unmounts.
  
- <del>When a User starts reading - stops - changes WPM - and starts again, there is an issue with the interval switching back and forth from the old to new causing choppy changes. Thinking this may be an issue when interval is being passed from controlBar.js to App.js. Temp fix: Stop+Reset refreshes the whole window.</del>



#### Initial Design
Here is the current flow. Note: I made this diagram after having built the first version. After mapping it out I've noticed some areas where it can be improved. Also in future projects I will try to build a process map BEFORE building.
![processMap](/v0.9-flow.png)
