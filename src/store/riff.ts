import { type Riff, type Metadata } from '../types';
import { type TabData, validateTabData } from 'tab-tools';
import { isDefined } from '../utils';
import { setItem, removeItem, getItem, getItems } from './local';
import KEYS from './keys';

const validateRiff = (riffData: object): Riff | void => {
  const hasRequiredKeys = ['id', 'name', 'data', 'tuning'].every(key => {
    return key in riffData && Boolean(riffData[key]);
  });
  const tabData = { data: riffData['data'], tuning: riffData['tuning'] };
  const hasTabData =
    Array.isArray(tabData.data) &&
    Array.isArray(tabData.data[0]) &&
    Array.isArray(tabData.tuning) &&
    typeof tabData.data[0][0] === 'string';
  const isValid = hasRequiredKeys && hasTabData && validateTabData(tabData);

  if (isValid) {
    return {
      id: String(riffData['id'] || ''),
      name: String(riffData['name'] || ''),
      data: riffData['data'] || [],
      tuning: riffData['tuning'] || [],
    } as Riff;
  }
  return;
};

export const getRiffs = (): Riff[] => {
  return getItems(KEYS.RIFF)
    .map(riff => validateRiff(riff))
    .filter(isDefined);
};

export const getRiff = (id: string): Riff | void => {
  return validateRiff(getItem(KEYS.RIFF, id));
};

export const updateRiff = (data: TabData, metadata: Metadata): Riff | void => {
  const { id } = metadata;
  return validateRiff(setItem(KEYS.RIFF, id, { ...data, ...metadata }));
};

export const deleteRiff = (id: string): void => {
  return removeItem(KEYS.RIFF, id);
};