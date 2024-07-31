import React, { useState }  from 'react';
import { type Song } from '../types';

type SongProps = {
  song: Song;
};



export function SongEdit({ song }: SongProps) {
  const { name: _name, riffs: _riffs, sequence: _sequence, notes: _notes} = song;

  const [name, setName] = useState(_name);
  const [riffs, setRiffs] = useState(_riffs);
  const [sequence, setSequence] = useState(_sequence);
  const [notes, setNotes] = useState(_notes);

  // Duplicate a riff already in the song
  // Add a riff from library

  // needs drag and drop


  return (
    <React.Fragment>
      {sequence.map((riffId) => {
        const riff = riffs[riffId];
        if (!riff) {
          return;
        }
        return <div key={riff.id}>{riff.name}</div>
      })}
    </React.Fragment>
  );
}
