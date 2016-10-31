import expect from 'expect';
import calculated from './attr-relationships';

describe('calculated', () => {
  describe('total', () => {
    it('should calculate when given a future year and a monthly cost', () =>{
      const props = { goalTotal: 1000, monthlyOutlay: 100 }

      expect(calculated.monthsOfSpending(props)).toBe(10);
    });
    it('should return 1 when outlay is higher than total', () =>{
      const props = { goalTotal: 1000, monthlyOutlay: 10000 }

      expect(calculated.monthsOfSpending(props)).toBe(1);
    });
    it('should return Infinity if outlay will never reach goalTotal', () =>{
      const props = { goalTotal: 1000, monthlyOutlay: 0 }

      expect(calculated.monthsOfSpending(props)).toBe(Infinity);
    });
  });

  describe('outlay', () => {
    it.only('should calculate the monthly cost for a goal, given a total, starting date, and ending date', () => {
      const props = {
        goalTotal: 1000,
        deadlineYear: 2018
        startingYear: 2017
      }

      expect(calculated.outlay(this.props)).toBe(1000 / 12);
    });
  });
});
