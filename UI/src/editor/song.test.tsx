import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
