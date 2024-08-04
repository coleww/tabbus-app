import React, { useCallback, useState } from 'react';
import { type Song } from '../types';
import { RiffEdit } from './riff';
import { defaultBassTuning, defaultGuitarTuning, makeRiff } from '../utils';
import './song.css';

type SongProps = {
  song: Song;
};

export function SongEdit({ song }: SongProps) {
  const { riffs: _riffs, id } = song;

  const [riffs, setRiffs] = useState(_riffs);

  const addRiff = useCallback(
    (gtr: boolean) => {
      const newRiff = makeRiff(
        'e maj',
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
      </div>
      {riffs.map(riff => {
        return (
          <div key={riff.id}>
            <RiffEdit riff={riff} showControls={false} />
          </div>
        );
      })}
    </React.Fragment>
  );
}
