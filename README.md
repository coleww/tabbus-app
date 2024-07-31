# tabbus

A note taking app for fretted instruments.

## Goals

- Easy way to jot down ideas on a phone or laptop
- UI should resemble a guitar tab as much as possible

## Ideal Flow

Playing guitar, find a cool riff, enter it in tabbus on my phone. Add a name and some tags for the vibe of the riff.
Use automatic music theory detection to iterate on the riff.
Later on my laptop, find that i have another riff in same key with similar vibe, start assembling a song.

## DECISIONS

- Are riffs independent of songs? Can a riff belong to multiple songs or be orphaned?
  - Window management cascades from this. 


Riffs are independent
- Need browser for loading riffs to edit or add to songs


Riffs are part of 1 song
- No worries about editing 1 riff modifying many songs
- I could still add a riff from another song to the one im working on, it would just be duplicated
- Don't need to build multi riff editing logic, that would just be the song view
- If riff is repeated in song, make it uneditable but with option to duplicate it


## TODO

MVP:
X Set up data store module (local store for now, API call later)

- Figure out windowing logic for having arranger/browser/editor open simultaneously (portals? react-mosaic? hardcoded? must be responsive)
- Load multiple riffs from the store at same time (browser.tsx)
- Save riffs
- duplicate riffs
- "song" model, arranger.tsx
- mobile/desktop breakpoint (part of windowing?)
- STYLE IT TO LOOK LIKE A GUITAR TAB!

STRETCH:

- mouse/keyboard input
- random tab notation / hpst in grid etc.
- random notation under each row (need new row of tabData for this?)
X Set up tests, coverage for existing functions
- Refactor out row/cell from grid.tsx, 
- create input/select/button/autocomplete generics. All should be styled like guitar tabs
- analyze/show chord progression
- transpose tab, capo tools
- generate chord progressions (I iv V etc.)
- randomized riffs
- write notes on riff
- add tags to riff
- browse by tag
- browser search
- edit mode then scale mode -> clicking active string should select that note, or exit both modes




