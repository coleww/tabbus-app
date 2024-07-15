import React, { useState, useCallback, useMemo } from 'react';

type TuningProps = {
  data: string[];
  setData: (data: string[]) => void;
};

const ALL_NOTES = [
  'a',
  'a#',
  'b',
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
];

export function Tuning({ data, setData }: TuningProps) {
  const [isEditing, setIsEditing] = useState(false);
  const displayTuning = useMemo(() => data.slice().reverse().join(''), [data]);
  const [editedTuning, setEditedTuning] = useState(displayTuning);

  const handleChange = useCallback(
    e => {
      setEditedTuning(e.target.value as string);
    },
    [setEditedTuning]
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Enter') {
        const editedString = e.target.value as string;
        const newTuning =
          editedString
            .match(/(\w#|\w)/g)
            ?.filter(note => ALL_NOTES.includes(note))
            .reverse() ?? [];
        setData(newTuning);
        setIsEditing(false);
      }
    },
    [setData]
  );

  return (
    <div data-id="tuning">
      {isEditing ? (
        <input
          className=""
          type="text"
          value={editedTuning}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          className=""
          onClick={() => {
            setIsEditing(true);
            setEditedTuning(displayTuning);
          }}
        >
          {displayTuning}
        </button>
      )}
    </div>
  );
}
