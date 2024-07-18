import React, { useState, useCallback } from 'react';
import { type TabData, getNote, KEY_MAP } from 'tab-tools';

type GridData = {
  tabData: string[][];
  tuning: string[];
  currentKey: string;
  updateTabData: (stringIdx: number, fretIdx: number, value: string) => void;
};

export function Grid({ tuning, tabData, currentKey, updateTabData }: GridData) {
  const [editTarget, setEditTarget] = useState<number[] | undefined>();

  const handleGridClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      // Note: if any child elements are put inside the cell buttons, this will not work.
      // unless we like, duplicate the data-pos on every child...
      // or traverse the dom tree till we find the cell parent with the data-pos
      //
      const clicked = evt.target as HTMLButtonElement;
      const posString = clicked.getAttribute('data-pos');
      const isInKey = clicked.getAttribute('data-keymatch');

      console.log(posString, isInKey);

      if (!posString) return; // click was on something besides a cell button

      const [clickedStringIdx, clickedFretIdx] = posString
        ?.split(',')
        .map(s => ~~s);

      if (editTarget) {
        const [targetStringIdx, targetFretIdx] = editTarget;
        if (clickedStringIdx !== targetStringIdx) return; // clicked a non-active string
        if (!isInKey) return; // clicked out of key note on active string
        updateTabData(targetStringIdx, targetFretIdx, `${clickedFretIdx}`);
        setEditTarget(undefined);
      } else {
        setEditTarget([clickedStringIdx, clickedFretIdx]);
      }
    },
    [editTarget]
  );

  return (
    <div className="riff-grid tab" onClick={handleGridClick}>
      {tabData.map((stringData, stringIdx) => {
        const rootNote = tuning[stringIdx];
        return (
          <div className="riff-row" key={`row ${stringIdx}`}>
            <span>{rootNote}</span>
            {stringData.map((note, fretIdx) => {
              const isInKey = KEY_MAP[currentKey].includes(
                getNote(rootNote, `${fretIdx}`)
              );
              const stringIsTarget = editTarget && stringIdx === editTarget[0];
              const display = !Boolean(editTarget)
                ? note || '-'
                : isInKey && stringIsTarget
                  ? fretIdx
                  : '-';

              return (
                <button
                  key={`cell ${stringIdx} ${fretIdx}`}
                  data-keymatch={isInKey ? 'Y' : ''}
                  data-pos={`${stringIdx},${fretIdx}`}
                >
                  {display}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
