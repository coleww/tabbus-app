import React from 'react';
import { SongEdit } from './song';
import { defaultBassTuning, defaultGuitarTuning, makeRiff } from '../utils';

const defaultKey = 'chromatic';
export function EditorScreen() {
  const gtrRiff = makeRiff(defaultGuitarTuning, '1');
  const bassRiff = makeRiff(defaultBassTuning, '1');
  const initSong = {
    id: '1',
    name: 'default song',
    riffs: [gtrRiff, bassRiff],
    selectedKey: defaultKey,
  };
  return (
    <React.Fragment>
      <SongEdit song={initSong} />
    </React.Fragment>
  );
}
