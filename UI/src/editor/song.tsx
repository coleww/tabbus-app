import React, { useCallback, useState } from 'react';
import { type Song } from '../types';
import { RiffEdit } from './riff';
import { defaultBassTuning, defaultGuitarTuning, makeRiff } from '../utils';
import { getPossibleKeys } from 'tab-tools';
import './song.css';
import { Key } from './key';

type SongProps = {
  song: Song;
};

export function SongEdit({ song }: SongProps) {
  const { riffs: _riffs, id, selectedKey: _selectedKey } = song;

  const [riffs, setRiffs] = useState(_riffs);

  const [currentKey, setCurrentKey] = useState(_selectedKey || 'e maj');

  const [possibleKeys, setPossibleKeys] = useState(
    getPossibleKeys(
      ...riffs.map(riff => ({ tuning: riff.tuning, data: riff.data }))
    )
  );

  const updateRiff = useCallback(
    (riffIdx: number, stringIdx: number, fretIdx: number, value: string) => {
      riffs[riffIdx].data[stringIdx][fretIdx] = value;
      setRiffs([...riffs]);
      setPossibleKeys(
        getPossibleKeys(
          ...riffs.map(riff => ({ tuning: riff.tuning, data: riff.data }))
        )
      );
    },
    [riffs]
  );

  const addRiff = useCallback(
    (gtr: boolean) => {
      const newRiff = makeRiff(
        gtr ? defaultGuitarTuning : defaultBassTuning,
        id
      );
      setRiffs([...riffs, newRiff]);
    },
    [id, riffs]
  );

  return (
    <React.Fragment>
      <div className="song-controls">
        <button
          onClick={() => {
            addRiff(true);
          }}
        >
          +guitar
        </button>
        <button
          onClick={() => {
            addRiff(false);
          }}
        >
          +bass
        </button>
        <Key
          currentKey={currentKey}
          possibleKeys={possibleKeys}
          setCurrentKey={setCurrentKey}
        />
      </div>
      {riffs.map((riff, i) => {
        return (
          <div key={riff.id}>
            <RiffEdit
              riff={riff}
              showControls={true}
              currentKey={currentKey}
              updateRiff={updateRiff.bind({}, i)}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
}
