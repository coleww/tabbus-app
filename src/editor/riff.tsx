import React, { useCallback, useEffect, useState } from 'react';
import { Tuning } from './tuning';
import { Key } from './key';
import { Grid } from './grid';
import { Name } from './name';

import { getPossibleKeys } from 'tab-tools';
import './riff.css';
import { type Riff } from '../types';

type RiffProps = {
  riff: Riff;
};

export function RiffEdit({ riff }: RiffProps) {
  // TODO: wire all these up to API / data store
  const {
    name: _name,
    data: _data,
    tuning: _tuning,
    selectedKey: _selectedKey,
  } = riff;
  const [tabData, setTabData] = useState<string[][]>(_data);
  const [tuning, setTuning] = useState<string[]>(_tuning);
  const [currentKey, setCurrentKey] = useState(_selectedKey || 'chromatic');
  const [name, setName] = useState(_name);

  const [showScale, setShowScale] = useState(false);

  const [possibleKeys, setPossibleKeys] = useState(
    getPossibleKeys({ data: tabData, tuning })
  );

  useEffect(() => {
    setPossibleKeys(getPossibleKeys({ data: tabData, tuning }));

    if (tuning.length > tabData.length) {
      const toAdd = tuning.length - tabData.length;
      for (let i = 0; i < toAdd; i++) {
        const emptyString = [...Array(tabData[0].length).keys()].map(() => '');
        tabData.unshift(emptyString);
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

      setPossibleKeys(getPossibleKeys({ data: tabData, tuning }));
    },
    [tabData, tuning]
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
