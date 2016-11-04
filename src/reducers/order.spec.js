import expect from 'expect';

import * as actions from '../constants/ActionTypes';
import order from './order';

describe('reducers', () => {
  describe('order', () => {
    it('should include a default state', () => {
      expect(order(undefined, {})).toEqual([]);
    })

    it('should concatenate goals on ADD_GOAL action', () => {
      expect(order([1, 2, 3], {
        type: `${actions.ADD_GOAL}`, goal: {
          id: 1337, type: 'Emergency Goal', total: 100, deadline: 1999, spendingPerMonth: 15
        }
      })).toEqual([1, 2, 3, 1337])
    })

    it(`should handle ${actions.GOAL_MOVE_UP} action below the first element`, () => {
      expect(
        order([1, 2, 3], { type: actions.GOAL_MOVE_UP, id: 2})
      ).toEqual([2, 1, 3])
    })
    it(`should ignore ${actions.GOAL_MOVE_UP} action on the first element`, () => {
      expect(
        order([1, 2, 3], { type: actions.GOAL_MOVE_UP, id: 1})
      ).toEqual([1, 2, 3])
    })
    it(`should handle ${actions.GOAL_MOVE_DOWN} action above the last element`, () => {
      expect(
        order([1, 2, 3], { type: actions.GOAL_MOVE_DOWN, id: 2})
      ).toEqual([1, 3, 2])
    })
    it(`should ignore ${actions.GOAL_MOVE_DOWN} action on the last element`, () => {
      expect(
        order([1, 2, 3], { type: actions.GOAL_MOVE_DOWN, id: 3})
      ).toEqual([1, 2, 3])
    })
  })
});
