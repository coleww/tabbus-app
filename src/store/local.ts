import { uid } from '../utils';

const tokenize = (key: string, id: string): string => {
  return `${key}${id}`;
};

export const getItems = (key: string): Record<string, unknown>[] => {
  return Object.entries(localStorage)
    .map(([objId, item]) => (objId.includes(key) ? JSON.parse(item) : null))
    .filter(x => !!x);
};

export const getItem = (key: string, id: string): Record<string, unknown> => {
  return JSON.parse(localStorage.getItem(tokenize(key, id)) || '');
};

export const setItem = (key: string, _id: string, _item: Record<string, unknown>): Record<string, unknown> => {
  // TODO: try catch for storage full
  const id = _id || uid();
  const item = { ..._item, id };
  localStorage.setItem(tokenize(key, id), JSON.stringify(item));
  return item;
};

export const removeItem = (key: string, id: string): void => {
  return localStorage.removeItem(tokenize(key, id));
};
