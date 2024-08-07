import { type TabData } from 'tab-tools';

export type Metadata = {
  id: string;
};

export type Riff = Metadata &
  TabData & {
    songId: string;
  };

export type Song = Metadata & {
  riffs: Riff[];
  name?: string;
  notes?: string;
  selectedKey?: string;
};
