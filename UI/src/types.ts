import { type TabData } from 'tab-tools';

export type Metadata = {
  id: string;
  name?: string;
  notes?: string;
  selectedKey?: string;
};

export type Riff = Metadata &
  TabData & {
    songId: string;
  };

export type Song = Metadata & {
  riffs: Riff[];
};
