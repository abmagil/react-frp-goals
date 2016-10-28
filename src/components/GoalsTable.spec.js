import { mount, shallow } from 'enzyme';
import GoalsTable from './GoalsTable';
import React from 'react';
import expect from 'expect';

function setup() {
  const wrapper = shallow(<GoalsTable />);

  return {
    wrapper
  }
}

describe('components', () => {
  describe('<GoalsTable />', () => {
    it('should render a table', () => {
      const { wrapper } = setup();

      expect(wrapper.find('table').length).toBe(1);
    })

    it(`should render children from then 'children' prop into the tbody`, () => {
      const { wrapper } = setup();
      expect(wrapper.find('tbody tr').length).toBe(0);

      wrapper.setProps({children: [1,2,3,4]});
      expect(wrapper.find('tbody').children().length).toBe(4);
    })
  })
})
