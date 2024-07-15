import React, {useState} from 'react';
import {Tuning} from './tuning';

type RiffData = {
  data: string[][];
  tuning: string[];
  key: string;
}

// needs callback to trigger save?

export function Riff({data, tuning, key}: RiffData) {
  const [currentTuning, setTuning] = useState(tuning);

  return (<div>
    <Tuning data={currentTuning} setData={setTuning}/>
  </div>)
}