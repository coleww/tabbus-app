import { type TabData } from 'tab-tools';

export type Metadata = {
  id: string;
  name: string;
  notes?: string;
  tags?: string;
  selectedKey?: string;
};

export type Riff = Metadata & TabData & {
  songId: string;
};

export type Song = Metadata & {
  riffs: Record<string, Riff>;
  sequence: string[]; // sequence is just riff ids
  notes: string[]; // notes on each sequence entry
} 