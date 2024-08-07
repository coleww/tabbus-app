import React, { useState } from 'react';
import { Tuning } from './tuning';
import { Grid } from './grid';
import { type Riff } from '../types';

import './riff.css';

type RiffProps = {
  riff: Riff;
  showControls: boolean;
  currentKey: string;
  updateRiff: (stringIdx: number, fretIdx: number, value: string) => void;
  updateTuning: (tuning: string[]) => void;
};

export function RiffEdit({
  riff: { data, tuning },
  showControls,
  currentKey,
  updateRiff,
  updateTuning,
}: RiffProps) {
  const [showScale, setShowScale] = useState(false);

  return (
    <React.Fragment>
      <div className="riff">
        {showControls ? (
          <div className="controls">
            <Tuning data={tuning} setData={updateTuning} />
            <button
              onClick={() => {
                setShowScale(!showScale);
              }}
            >
              {showScale ? 'hide' : 'show'} scale
            </button>
          </div>
        ) : (
          ''
        )}

        <Grid
          tabData={data}
          tuning={tuning}
          currentKey={currentKey}
          updateRiff={updateRiff}
          showScale={showScale}
        />
      </div>
    </React.Fragment>
  );
}
