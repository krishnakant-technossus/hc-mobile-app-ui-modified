// npx jest ./src/modules/people-tabs/__tests__/people-tabs.test.ts

import * as React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import PeopleTabs from '../people-tabs';
import ThemeProvider from '../../theming/theme-provider';
import defaultTheme from '../../theming/default-theme';

describe('PeopleTabs', () => {
  let tabItems: any, onChangeMock: any;

  beforeEach(() => {
    onChangeMock = jest.fn();

    // Tab Items
    tabItems = [
      {label: 'Tab 1', value: 1},
      {label: 'Tab 2', value: 2},
      {label: 'Tab 3', value: 3},
    ];
  });

  describe('Rendering', () => {
    it('renders itself correctly', () => {
      const wrapper = render(
        <ThemeProvider theme={defaultTheme}>
          <PeopleTabs
            items={tabItems}
            selected={tabItems[0].value}
            onChange={onChangeMock}
          />
        </ThemeProvider>,
      );

      const tab1 = wrapper.getByTestId('people-tab-1');
      const tab2 = wrapper.getByTestId('people-tab-2');
      const tab3 = wrapper.getByTestId('people-tab-3');

      expect(tab1).toBeDefined();
      expect(tab2).toBeDefined();
      expect(tab3).toBeDefined();

      expect(wrapper).toMatchSnapshot();
    });

    it('renders the selected tab correctly', () => {
      const wrapper = render(
        <ThemeProvider theme={defaultTheme}>
          <PeopleTabs
            items={tabItems}
            selected={tabItems[2].value}
            onChange={onChangeMock}
          />
        </ThemeProvider>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Interactions', () => {
    it('should call onChange function on click of any tab', () => {
      const {getByTestId} = render(
        <ThemeProvider theme={defaultTheme}>
          <PeopleTabs
            items={tabItems}
            selected={tabItems[0].value}
            onChange={onChangeMock}
          />
        </ThemeProvider>,
      );

      const tab2 = getByTestId('people-tab-2');

      fireEvent.press(tab2);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });
});
