import React, { useState } from 'react';
import { Grid } from './grid';
import { type Riff } from '../types';

import './riff.css';

type RiffProps = {
  riff: Riff;
  showControls: boolean;
  currentKey: string;
  updateRiff: (stringIdx: number, fretIdx: number, value: string) => void;
};

export function RiffEdit({
  riff: { data, tuning },
  showControls,
  currentKey,
  updateRiff,
}: RiffProps) {
  return (
    <React.Fragment>
      <div className="riff">
        <Grid
          tabData={data}
          tuning={tuning}
          currentKey={currentKey}
          updateRiff={updateRiff}
        />
      </div>
    </React.Fragment>
  );
}
