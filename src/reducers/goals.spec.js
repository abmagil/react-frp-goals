import expect from 'expect';
import moment from 'moment';
import goals from './goals';
import * as actions from 'src/constants/ActionTypes';

expect.extend({
  toMatchYear(date) {
    expect.assert(
      moment(date, 'YYYY').isSame(this.actual, 'y'),
      'expected %s to be %s',
      this.actual.year(),
      moment(date, 'YYYY').year()
    )
  }
})

describe('reducers', () => {
  describe('goals', () => {

    it('should include a default state', () => {
      const initialState = {};
      expect(goals(undefined, {})).toEqual(initialState);
    })

    it(`should handle ${actions.ADD_GOAL} action for a goal`, () => {
      expect(goals({}, {
        type: `${actions.ADD_GOAL}`, goal: { id: 1, type: 'Emergency Goal', total: 100, deadline: 1999, spendingPerMonth: 15 }
      })).toEqual({
        "1": { id: 1, type: 'Emergency Goal', total: 100, deadline: 1999, spendingPerMonth: 15}
      })
    })

    describe(`on an ${actions.UPDATE_GOAL} action`, () => {
      describe('for an outlay-locked goal', () => {
        const outlayLockedGoal = {
          '3': {
            id: 3,
            type: 'Car Goal',
            total: 240,
            startingDate: moment().year(2020).startOf('year'),
            deadline: moment().year(2022).endOf('year'),
            spendingPerMonth: 10,
            lockedAttr: 'spendingPerMonth'
          }
        };

        it(`should handle ${actions.UPDATE_TOTAL} by updating the total and adjusting the deadline`, () => {
          const newState = goals(outlayLockedGoal, {
            type: `${actions.UPDATE_TOTAL}`,
            newVal: 480,
            goalID: 3
          });

          expect(newState['3']).toEqual({
            ...outlayLockedGoal['3'],
            total: 480,
            deadline: moment().year(2024).endOf('year'),
          })
        })
        it(`should handle ${actions.UPDATE_END} by updating the total and adjusting the deadline`, () => {
          const newState = goals(outlayLockedGoal, {
            type: `${actions.UPDATE_END}`,
            newVal: moment().year(2021).endOf('year'),
            goalID: 3
          });

          expect(newState['3']).toEqual({
            ...outlayLockedGoal['3'],
            total: 120,
            deadline: moment().year(2021).endOf('year'),
          })
        })
      })

      describe.only('for a total-locked goal', () => {
        const totalLockedGoal = {
          '1': {
            id: 1,
            type: 'Education Goal',
            total: 240,
            startingDate: moment(2020, 'YYYY'),
            deadline: moment(2022, 'YYYY'),
            spendingPerMonth: 10,
            lockedAttr: 'total'
          }
        };

        it(`should change end date and adjust the spendingPerMonth`, () => {
          const newState = goals(totalLockedGoal, {
            type: `${actions.UPDATE_GOAL}`,
            attrName: 'deadline',
            newVal: 2021,
            goalID: 1
          });

          expect(newState['1']['deadline']).toMatchYear(2021);
          expect(newState['1']['spendingPerMonth']).toBe(20);
        });
        it(`should change spendingPerMonth and adjust the deadline`, () => {
          const newState = goals(totalLockedGoal, {
            type: `${actions.UPDATE_GOAL}`,
            attrName: 'spendingPerMonth',
            newVal: 20,
            goalID: 1
          });

          expect(newState['1']['deadline']).toMatchYear(2021);
          expect(newState['1']['spendingPerMonth']).toBe(20);
        })
      })

      describe('for a deadline-locked goal', () => {
        const deadlineLockedGoal = {
          '2': {
            id: 2,
            type: 'Travel Goal',
            total: 240,
            startingDate: new Date(2020),
            deadline: 2022,
            spendingPerMonth: 10,
            lockedAttr: 'deadline'
          }
        };

        it(`should handle ${actions.UPDATE_OUTLAY} by updating the spendingPerMonth and adjusting the total`, () => {
          const newState = goals(deadlineLockedGoal, {
            type: `${actions.UPDATE_OUTLAY}`,
            newVal: 20,
            goalID: 2
          });

          expect(newState['2']).toEqual({
            ...deadlineLockedGoal['2'],
            spendingPerMonth: 20,
            total: 480
          });
        })
        it(`should handle ${actions.UPDATE_TOTAL} by updating the total and adjusting the spendingPerMonth`, () => {
          const newState = goals(deadlineLockedGoal, {
            type: `${actions.UPDATE_TOTAL}`,
            newVal: 120,
            goalID: 2
          });

          expect(newState['2']).toEqual({
            ...deadlineLockedGoal['2'],
            spendingPerMonth: 10,
            total: 120
          });
        })
      })
    })
  })
})
