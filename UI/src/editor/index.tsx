import React from 'react';
import { SongEdit } from './song';
import { defaultBassTuning, defaultGuitarTuning, makeRiff } from '../utils';

const defaultKey = 'e maj';
export function EditorScreen() {
  const gtrRiff = makeRiff(defaultKey, defaultGuitarTuning, '1');
  const bassRiff = makeRiff(defaultKey, defaultBassTuning, '1');
  const initSong = {
    id: '1',
    name: 'default song',
    riffs: [gtrRiff, bassRiff],
  };
  return (
    <React.Fragment>
      <SongEdit song={initSong} />
    </React.Fragment>
  );
}
