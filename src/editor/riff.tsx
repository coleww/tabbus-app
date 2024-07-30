import React, { useCallback, useEffect, useState } from 'react';
import { Tuning } from './tuning';
import { Key } from './key';
import { Grid } from './grid';
import { Name } from './name';

import { getPossibleKeys } from 'tab-tools';
import './riff.css';

const EMPTY_STRING = [...Array(16).keys()].map(() => '');

export function Riff() {
  // TODO: wire all these up to API / data store
  // TODO: default tab length should be 24 for full neck? also in settings
  const [tabData, setTabData] = useState<string[][]>([
    ['', '', '', '', '0', '', '', '', '', '', '', '', '0', '', '', ''],
    ['', '', '', '', '0', '', '', '', '', '', '', '', '2', '/', '3', ''],
    ['', '', '', '', '0', '', '', '', '', '', '', '3', '', '', '', ''],
    ['', '', '', '', '0', '', '', '', '1', '1', '1', '', '', '', '', '3'],
  ]);
  const [tuning, setTuning] = useState<string[]>(['g', 'd', 'a', 'e']);
  const [currentKey, setCurrentKey] = useState('a min');
  const [name, setName] = useState('sick riff');

  const [showScale, setShowScale] = useState(false);

  const [possibleKeys, setPossibleKeys] = useState(
    getPossibleKeys({ data: tabData, tuning })
  );

  useEffect(() => {
    setPossibleKeys(getPossibleKeys({ data: tabData, tuning }));

    if (tuning.length > tabData.length) {
      const toAdd = tuning.length - tabData.length;
      for (let i = 0; i < toAdd; i++) {
        tabData.unshift(EMPTY_STRING);
      }
    } else if (tuning.length < tabData.length) {
      const toRemove = tabData.length - tuning.length;
      for (let i = 0; i < toRemove; i++) {
        tabData.shift();
      }
    }
    setTabData(tabData);
  }, [tabData, tuning]);

  const updateTabData = useCallback(
    (stringIdx: number, fretIdx: number, value: string) => {
      tabData[stringIdx][fretIdx] = value;
      setTabData(tabData);
    },
    [tabData]
  );

  return (
    <div>
      <div className="controls">
        <Name name={name} setName={setName} />
        <Key
          currentKey={currentKey}
          possibleKeys={possibleKeys}
          setCurrentKey={setCurrentKey}
        />
        <Tuning data={tuning} setData={setTuning} />
        <button
          onClick={() => {
            setShowScale(!showScale);
          }}
        >
          {showScale ? 'hide' : 'show'} scale
        </button>
      </div>

      <Grid
        tabData={tabData}
        tuning={tuning}
        currentKey={currentKey}
        updateTabData={updateTabData}
        showScale={showScale}
      />
    </div>
  );
}
