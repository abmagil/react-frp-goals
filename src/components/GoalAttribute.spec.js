import { mount, shallow } from 'enzyme';
import GoalAttribute from './GoalAttribute';
import React from 'react';
import expect from 'expect';

function setup() {
  const props = {
    attrName: 'deadline',
    value: 2000,
    isLocked: true,
    goalID: 1,
    onGoalAttrChange: () => {}
  };
  const wrapper = shallow(<GoalAttribute {...props} />);

  return { wrapper }
}

describe('components', () => {
  describe('<GoalAttribute />', () => {
    it('renders a <p> when attribute is locked', () => {
      const { wrapper } = setup();

      expect(wrapper.find('p').length).toBe(1);
      expect(wrapper.find('p').text()).toBe('2000');
    })

    it('renders an input when attribute is not locked', () => {
      const { wrapper } = setup();
      wrapper.setProps({
        isLocked: false
      })

      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('input').prop('value')).toBe(2000);
    })
  })
})
