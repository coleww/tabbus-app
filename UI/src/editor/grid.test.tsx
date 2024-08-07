import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Grid } from './grid';
import { dedash } from '../test-utils';

const mockGrid = {
  tabData: [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']],
  tuning: ['e'],
  showScale: false,
  currentKey: 'chromatic',
  updateRiff: () => undefined,
};

describe('Grid', function () {
  it('should show current tab data', function () {
    const mockTabData = [
      [
        '1',
        'h',
        '3',
        's',
        '5',
        '',
        '1',
        '/',
        '7',
        'p',
        '5',
        '',
        'x',
        '',
        'x',
        '',
      ],
    ];
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={false}
          currentKey={'chromatic'}
          tabData={mockTabData}
          tuning={['e']}
        />
      </React.Fragment>
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(mockTabData[0][i]);
    });
  });

  it('should show scale for current key on all strings', function () {
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={true}
          currentKey={'e min'}
          tabData={[
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ]}
          tuning={['e', 'e']}
        />
      </React.Fragment>
    );

    // Cycle through scale twice to validate all strings are shown when in scale mode
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
      expect(dedash(button.textContent)).toBe(expectedScale[i % 16]);
    });
  });

  it('should enter edit mode and display scale options for selected string when cell is clicked', function () {
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={false}
          currentKey={'e maj'}
          tabData={[
            ['1', '3', '5', '7', '9'],
            ['', '', '', '', ''],
          ]}
          tuning={['e', 'e']}
        />
      </React.Fragment>
    );
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    // Only clicked string should show scale in edit mode
    const expectedScale = ['0', '', '2', '', '4', '', '', '', '', ''];

    buttons.forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedScale[i]);
    });
  });

  it('should exit edit mode and update data when cell is changed', function (done) {
    const callback = (stringIdx: number, fretIdx: number, value: string) => {
      expect(stringIdx).toBe(0);
      expect(fretIdx).toBe(0);
      expect(value).toBe('2');
      done();
    };
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={false}
          currentKey={'e maj'}
          tabData={[['0', '', '2', '', '0']]}
          tuning={['e']}
          updateRiff={callback}
        />
      </React.Fragment>
    );
    const buttons = screen.getAllByRole('button');
    // Click first button to enter edit mode
    fireEvent.click(buttons[0]);
    // Click third button to select '2'
    fireEvent.click(buttons[2]);
  });

  it('should exit edit mode when non-active string is clicked', function () {
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={false}
          currentKey={'chromatic'}
          tabData={[
            ['0', '', '2', '', '0'],
            ['', '3', '', '1', ''],
          ]}
          tuning={['e', 'a']}
        />
      </React.Fragment>
    );
    // 5 buttons/cells on each string
    const buttons = screen.getAllByRole('button');
    // Click first button to enter edit mode
    fireEvent.click(buttons[0]);

    const expectedScale = ['0', '1', '2', '3', '4', '', '', '', '', ''];
    buttons.forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedScale[i]);
    });

    // Click sixth button on non-active string to exit
    fireEvent.click(buttons[5]);

    const expectedTab = ['0', '', '2', '', '0', '', '3', '', '1', ''];
    buttons.forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedTab[i]);
    });
  });

  it('should exit edit mode when out of key fret is clicked on active string', function (done) {
    const callback = (stringIdx: number, fretIdx: number, value: string) => {
      expect(stringIdx).toBe(0);
      expect(fretIdx).toBe(0);
      expect(value).toBe('2');
      done();
    };
    render(
      <React.Fragment>
        <Grid
          {...mockGrid}
          showScale={false}
          currentKey={'e maj'}
          tabData={[['0', '', '2', '', '0']]}
          tuning={['e']}
          updateRiff={callback}
        />
      </React.Fragment>
    );
    const buttons = screen.getAllByRole('button');
    // Click first button to enter edit mode
    fireEvent.click(buttons[0]);

    const expectedScale = ['0', '', '2', '', '4'];
    buttons.forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedScale[i]);
    });

    // Click second button to select out of key note
    fireEvent.click(buttons[2]);

    const expectedTab = ['0', '', '2', '', '0'];
    buttons.forEach((button, i) => {
      expect(dedash(button.textContent)).toBe(expectedTab[i]);
    });
  });
});
