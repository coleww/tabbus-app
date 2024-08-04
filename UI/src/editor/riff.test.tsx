import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { dedash } from '../test-utils';

import { RiffEdit } from './riff';

const mockRiff = {
  data: [['1', '', '3', '', '5', '', '7', '8', '', '10', '', '12']],
  tuning: ['e'],
  currentKey: 'chromatic',
  name: 'riff 1',
  id: '1',
  songId: '1',
};

describe('Riff', function () {
  it('should calculate potential keys and slash out mismatches', function () {
    render(
      <React.Fragment>
        <RiffEdit riff={mockRiff} showControls={true} />
      </React.Fragment>
    );
    const select = screen.getByRole('combobox');
    expect(select.querySelector('option:checked')?.textContent).toBe(
      'chromatic'
    );
    const expectedMatches = ['chromatic', 'a min', 'c maj'];
    select.querySelectorAll('option').forEach(optEl => {
      const option = optEl?.textContent || '';
      const isMatch = expectedMatches.includes(option);
      if (isMatch) {
        expectedMatches.splice(expectedMatches.indexOf(option), 1);
      }
      const isSlashedOut = Boolean(option.match(/-(\w|#)+ (\w|\d)+-/));
      expect(isMatch || isSlashedOut).toBe(true);
    });
    expect(expectedMatches.length).toBe(0);
  });

  it('updates tab data when string added to tuning', function () {
    render(
      <React.Fragment>
        <RiffEdit riff={mockRiff} showControls={true} />
      </React.Fragment>
    );
    // Initial grid size. 12 cells, name, tuning and show scale buttons
    expect(screen.getAllByRole('button').length).toBe(15);
    const tuningBtn = screen.getByRole('button', { name: 'e' });
    fireEvent.click(tuningBtn);
    const tuningInput = screen.getByDisplayValue('e');
    fireEvent.change(tuningInput, { target: { value: 'ea' } });
    fireEvent.keyDown(tuningInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const updatedTuningBtn = screen.getByRole('button', { name: 'ea' });
    expect(updatedTuningBtn.textContent).toBe('ea');

    // adds another string, same length as existing one
    expect(screen.getAllByRole('button').length).toBe(27);
  });

  it('updates tab data when string removed from tuning', function () {
    render(
      <React.Fragment>
        <RiffEdit
          riff={{
            ...mockRiff,
            data: [
              ['0', '1'],
              ['42', ''],
            ],
            tuning: ['a', 'e'],
          }}
          showControls={true}
        />
      </React.Fragment>
    );
    // Initial grid size. 2 cells each on 2 strings, name, tuning and show scale buttons
    expect(screen.getAllByRole('button').length).toBe(7);
    const tuningBtn = screen.getByRole('button', { name: 'ea' });
    fireEvent.click(tuningBtn);
    const tuningInput = screen.getByDisplayValue('ea');
    fireEvent.change(tuningInput, { target: { value: 'e' } });
    fireEvent.keyDown(tuningInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const updatedTuningBtn = screen.getByRole('button', { name: 'e' });
    expect(updatedTuningBtn.textContent).toBe('e');

    // removes top string
    expect(screen.getAllByRole('button').length).toBe(5);
    expect(screen.getByRole('button', { name: '42-' })).toBeTruthy();
  });

  it('activates scale mode', function () {
    render(
      <React.Fragment>
        <RiffEdit riff={mockRiff} showControls={true} />
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

  it('updates tab data and scales when grid is edited', function () {
    render(
      <React.Fragment>
        <RiffEdit riff={mockRiff} showControls={true} />
      </React.Fragment>
    );

    const expectedScales = ['e min', 'g maj'];

    const firstCell = screen.getAllByText(/^-?\d+-?$/)[0];
    expect(dedash(firstCell.textContent)).toBe('1');
    expectedScales.forEach(scaleName => {
      expect(screen.queryByText(scaleName)).toBeNull();
    });

    fireEvent.click(firstCell); // enter edit mode
    fireEvent.click(firstCell); // change first cell from '1' to '0'
    expect(dedash(firstCell.textContent)).toBe('0');

    expectedScales.forEach(scaleName => {
      expect(screen.getByText(scaleName)).toBeTruthy();
    });
  });
});
