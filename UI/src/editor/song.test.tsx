import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SongEdit } from './song';

const getMock = () => ({
  riffs: [
    {
      id: '1',
      songId: '1',
      data: [
        ['', '3', '', '2'],
        ['1', '', '0', ''],
      ],
      tuning: ['a', 'e'],
    },
    {
      id: '2',
      songId: '1',
      data: [
        ['', '2', '', '0'],
        ['0', '', '2', ''],
      ],
      tuning: ['g', 'd'],
    },
  ],
  selectedKey: 'chromatic',
  id: '1',
});

describe('Song', () => {
  it('should calculate potential keys and slash out mismatches', function () {
    render(
      <React.Fragment>
        <SongEdit song={getMock()} />
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
        <SongEdit song={getMock()} />
      </React.Fragment>
    );
    // 2 riffs, each with 2 strings, 4 beats per string => 16 cells
    expect(
      screen
        .getAllByRole('button')
        .filter(button => button.classList.contains('cell')).length
    ).toBe(16);
    const tuningBtn = screen.getByRole('button', { name: 'ea' });
    fireEvent.click(tuningBtn);
    const tuningInput = screen.getByDisplayValue('ea');
    fireEvent.change(tuningInput, { target: { value: 'ead' } });
    fireEvent.keyDown(tuningInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const updatedTuningBtn = screen.getByRole('button', { name: 'ead' });
    expect(updatedTuningBtn.textContent).toBe('ead');

    // adds another 4 beat string => 20 cells
    expect(
      screen
        .getAllByRole('button')
        .filter(button => button.classList.contains('cell')).length
    ).toBe(20);
  });

  it('updates tab data when string removed from tuning', function () {
    render(
      <React.Fragment>
        <SongEdit song={getMock()} />
      </React.Fragment>
    );
    // 2 riffs, each with 2 strings, 4 beats per string => 16 cells
    expect(
      screen
        .getAllByRole('button')
        .filter(button => button.classList.contains('cell')).length
    ).toBe(16);
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
    expect(
      screen
        .getAllByRole('button')
        .filter(button => button.classList.contains('cell')).length
    ).toBe(12);
    expect(screen.getByRole('button', { name: '-1-' })).toBeTruthy();
  });
});
