import React, { useState, useCallback } from 'react';
import { getNote, KEY_MAP } from 'tab-tools';
import './grid.css';

type GridProps = {
  tabData: string[][];
  tuning: string[];
  showScale: boolean;
  currentKey: string;
  updateTabData: (stringIdx: number, fretIdx: number, value: string) => void;
};

export function Grid({
  tuning,
  tabData,
  currentKey,
  updateTabData,
  showScale,
}: GridProps) {
  const [editTarget, setEditTarget] = useState<number[] | undefined>();

  const handleGridClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (showScale) return;
      const clicked = evt.target as HTMLButtonElement;
      const posString = clicked.getAttribute('data-pos');
      const isInKey = clicked.getAttribute('data-keymatch');

      if (!posString) return; // click was on something besides a cell button

      const [clickedStringIdx, clickedFretIdx] = posString
        .split(',')
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
    [editTarget, showScale, updateTabData]
  );

  // TODO: break out row/cell component
  return (
    <div className="riff-grid tab" onClick={handleGridClick}>
      {tabData.map((stringData, stringIdx) => {
        const rootNote = tuning[stringIdx];
        return (
          <div className="riff-row" key={`row ${stringIdx}`}>
            <span className="cell">{rootNote}</span>
            {stringData.map((note, fretIdx) => {
              const isInKey = KEY_MAP[currentKey].includes(
                getNote(rootNote, `${fretIdx}`)
              );

              const stringIsTarget =
                (editTarget && stringIdx === editTarget[0]) || showScale;

              const display =
                !editTarget && !showScale
                  ? note || '--'
                  : isInKey && stringIsTarget
                    ? `${fretIdx}`
                    : '--';

              return (
                <div className="unit" key={`cell ${stringIdx} ${fretIdx}`}>
                  <button
                    className="cell"
                    data-keymatch={isInKey ? 'Y' : ''}
                    data-pos={`${stringIdx},${fretIdx}`}
                  >
                    {display.padStart(2, '-')}-
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
