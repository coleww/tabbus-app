import React, { useState } from 'react';
import { Tuning } from './tuning';
import { Key } from './key';

import { type TabData, getPossibleKeys } from 'tab-tools';

type RiffData = {
  tabData: TabData;
};

export function Riff({ tabData }: RiffData) {
  const { data, tuning } = tabData;
  const [currentTuning, setTuning] = useState(tuning);
  const [currentKey, setKey] = useState('a min');
  const [possibleKeys, setPossibleKeys] = useState(getPossibleKeys(tabData));

  return (
    <div>
      <Key
        currentKey={currentKey}
        possibleKeys={possibleKeys}
        setKey={setKey}
      />
      <Tuning data={currentTuning} setData={setTuning} />
      {JSON.stringify(data)}
    </div>
  );
}
