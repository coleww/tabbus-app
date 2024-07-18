import React, { useMemo } from 'react';
import { ALL_KEYS } from 'tab-tools';

type KeyProps = {
  possibleKeys: string[];
  currentKey: string;
  setKey: (key: string) => void;
};

export function Key({ possibleKeys, currentKey, setKey }: KeyProps) {
  const options = useMemo(() => {
    return (
      <>
        {possibleKeys.map(key => {
          return (
            <option value={key} key={key}>
              {key}
            </option>
          );
        })}
        {ALL_KEYS.filter(key => !possibleKeys.includes(key)).map(key => {
          return (
            <option value={key} key={key}>
              -{key}-
            </option>
          );
        })}
      </>
    );
  }, [currentKey, possibleKeys]);

  return (
    <div data-id="key">
      <select
        onChange={evt => {
          setKey(evt.target.value);
        }}
      >
        {options}
      </select>
    </div>
  );
}
