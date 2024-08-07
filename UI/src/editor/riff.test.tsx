import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { dedash } from '../test-utils';

import { RiffEdit } from './riff';

const mockRiff = {
  data: [['1', '', '3', '', '5', '', '7', '8', '', '10', '', '12']],
  tuning: ['e'],
  id: '1',
  songId: '1',
};

describe('Riff', function () {
  it('activates scale mode', function () {
    render(
      <React.Fragment>
        <RiffEdit
          riff={mockRiff}
          showControls={true}
          currentKey="chromatic"
          updateRiff={() => {}}
          updateTuning={() => {}}
        />
      </React.Fragment>
    );
    const scaleBtn = screen.getByRole('button', { name: 'show scale' });
    fireEvent.click(scaleBtn);

    const expectedScale = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ];

    screen.getAllByText(/^-?\d+-?$/).forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedScale[i]);
    });

    fireEvent.click(scaleBtn);

    const expectedTab = ['1', '3', '5', '7', '8', '10', '12'];
    screen.getAllByText(/^-*\d+-*$/).forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedTab[i]);
    });
  });

  it('fires callback when grid is edited', function (done) {
    const callback = (stringIdx: number, fretIdx: number, value: string) => {
      expect(stringIdx).toBe(0);
      expect(fretIdx).toBe(0);
      expect(value).toBe('0');
      done();
    };
    render(
      <React.Fragment>
        <RiffEdit
          riff={mockRiff}
          showControls={true}
          currentKey="chromatic"
          updateRiff={callback}
          updateTuning={() => {}}
        />
      </React.Fragment>
    );

    const firstCell = screen.getAllByText(/^-?\d+-?$/)[0];
    expect(dedash(firstCell.textContent)).toBe('1');

    fireEvent.click(firstCell); // enter edit mode
    fireEvent.click(firstCell); // change first cell from '1' to '0'
  });

  it('fires callback when tuning is edited', function (done) {
    const callback = (tuning: string[]) => {
      expect(tuning).toStrictEqual(['d', 'c#', 'a', 'e']);
      done();
    };
    render(
      <React.Fragment>
        <RiffEdit
          riff={mockRiff}
          showControls={true}
          currentKey="chromatic"
          updateRiff={() => {}}
          updateTuning={callback}
        />
      </React.Fragment>
    );

    const tuningBtn = screen.getByRole('button', { name: 'e' });
    fireEvent.click(tuningBtn);
    const tuningInput = screen.getByDisplayValue('e');
    fireEvent.change(tuningInput, { target: { value: 'eac#d' } });
    fireEvent.keyDown(tuningInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });
  });
});
