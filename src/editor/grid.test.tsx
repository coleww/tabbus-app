import React from 'react';
import { render, screen } from '@testing-library/react';

import { Grid } from './grid';

const mockGrid = {
  tabData: [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']],
  tuning: ['e'],
  showScale: false,
  currentKey: 'chromatic',
  updateTabData: () => undefined,
};

describe('Grid', function () {
  it('should show scale for current key', function () {
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={true}
          currentKey={'e min'}
          tabData={[
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ]}
          tuning={['e']}
        />
      </React.Fragment>
    );
    const expectedScale = [
      '0',
      '',
      '2',
      '3',
      '',
      '5',
      '',
      '7',
      '8',
      '',
      '10',
      '',
      '12',
      '',
      '14',
      '15',
      '',
    ];
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button, i) => {
      expect(button.textContent?.replace(/-/g, '')).toBe(expectedScale[i]);
    });
  });
});
