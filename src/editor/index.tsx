import React from 'react';
import { Riff } from './riff';

const mock_data = {
  data: [
    ['', '', '', '', '0', '', '', ''],
    ['', '', '', '', '2', '/', '3', ''],
    ['', '', '', '3', '', '', '', ''],
    ['1', '1', '1', '', '', '', '', '3'],
  ],
  tuning: ['g', 'd', 'a', 'e'],
};

export function EditorPage() {
  return (
    <div>
      <Riff tabData={mock_data} />
    </div>
  );
}
