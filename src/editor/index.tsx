import React from 'react';
import {Riff} from './riff'

// editor page can have multiple "riff"s open at the same time

// This component just interacts with the API and loads/saves riffs? 

export function EditorPage() {
  return (<div>
    <Riff data={[['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']]} tuning={['e', 'a', 'd', 'g']} key='' />
  </div>)
}