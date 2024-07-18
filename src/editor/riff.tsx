import React, { useCallback, useEffect, useState } from 'react';
import { Tuning } from './tuning';
import { Key } from './key';
import { Grid } from './grid';

import { type TabData, getPossibleKeys } from 'tab-tools';

export function Riff() {
  const [tabData, setTabData] = useState<string[][]>([
    ['', '', '', '', '0', '', '', ''],
    ['', '', '', '', '2', '/', '3', ''],
    ['', '', '', '3', '', '', '', ''],
    ['1', '1', '1', '', '', '', '', '3'],
  ]);
  const [tuning, setTuning] = useState<string[]>(['g', 'd', 'a', 'e']);
  const [currentKey, setKey] = useState('a min');
  const [possibleKeys, setPossibleKeys] = useState(
    getPossibleKeys({ data: tabData, tuning })
  );

  useEffect(() => {
    setPossibleKeys(getPossibleKeys({ data: tabData, tuning }));
  }, [tabData, tuning]);

  const updateTabData = useCallback(
    (stringIdx: number, fretIdx: number, value: string) => {
      tabData[stringIdx][fretIdx] = value;
      setTabData(tabData);
    },
    []
  );

  return (
    <div>
      <Key
        currentKey={currentKey}
        possibleKeys={possibleKeys}
        setKey={setKey}
      />
      <Tuning data={tuning} setData={setTuning} />
      <Grid
        tabData={tabData}
        tuning={tuning}
        currentKey={currentKey}
        updateTabData={updateTabData}
      />
    </div>
  );
}
