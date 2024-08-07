import React, { useState, useCallback } from 'react';
import { getNote, KEY_MAP } from 'tab-tools';
import './grid.css';

type GridProps = {
  tabData: string[][];
  tuning: string[];
  currentKey: string;
  updateRiff: (stringIdx: number, fretIdx: number, value: string) => void;
};

export function Grid({ tuning, tabData, currentKey, updateRiff }: GridProps) {
  const [editTarget, setEditTarget] = useState<number[] | undefined>();

  const [showScale, setShowScale] = useState(false);
  const handleGridClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (showScale) return setShowScale(false);
      const clicked = evt.target as HTMLButtonElement;
      const posString = clicked.getAttribute('data-pos');
      const isInKey = clicked.getAttribute('data-keymatch');

      if (!posString) {
        // Clicked on a non-cell, exit edit mode
        setEditTarget(undefined);
        return;
      }

      const [clickedStringIdx, clickedFretIdx] = posString
        .split(',')
        .map(s => ~~s);

      if (editTarget) {
        const [targetStringIdx, targetFretIdx] = editTarget;
        if (clickedStringIdx !== targetStringIdx || !isInKey) {
          // clicked a non-active string or an out of key note, exit edit mode
          setEditTarget(undefined);
          return;
        }
        updateRiff(targetStringIdx, targetFretIdx, `${clickedFretIdx}`);
        setEditTarget(undefined);
      } else {
        setEditTarget([clickedStringIdx, clickedFretIdx]);
      }
    },
    [editTarget, showScale, updateRiff]
  );

  // TODO: break out row/cell component
  return (
    <div className="riff-grid tab" onClick={handleGridClick}>
      <div className="riff-rows">
        {tabData.map((stringData, stringIdx) => {
          const rootNote = tuning[stringIdx];
          return (
            <div className="riff-row" key={`row ${stringIdx}`}>
              <button
                className="cell"
                onClick={() => {
                  setShowScale(!showScale);
                }}
              >
                {rootNote}-
              </button>
              {stringData.map((note, fretIdx) => {
                const isInKey = KEY_MAP[currentKey].includes(
                  getNote(rootNote, `${fretIdx}`)
                );

                const isHighlighted =
                  editTarget &&
                  stringIdx === editTarget[0] &&
                  fretIdx === editTarget[1];

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
                      className={`cell ${isHighlighted ? 'cell--target' : ''}`}
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
    </div>
  );
}
