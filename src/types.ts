import { type TabData } from 'tab-tools';

export type Metadata = {
  id: string;
  name: string;
  notes?: string;
  tags?: string;
  selectedKey?: string;
};

export type Riff = Metadata & TabData;
