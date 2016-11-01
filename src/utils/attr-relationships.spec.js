import expect from 'expect';
import calculated from './attr-relationships';

describe('Attribute relationship functions', () => {
  describe('monthsOfSpending', () => {
    it('should calculate when given a goal total and a monthly cost', () =>{
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

  describe('spendingPerMonth', () => {
    it('should calculate the monthly cost for a goal, given a total, starting date, and ending date', () => {
      const props = {
        goalTotal: 1200,
        deadlineDate: new Date(2018, 0, 1),
        startingDate: new Date(2017, 0, 1)
      };

      expect(calculated.spendingPerMonth(props)).toBe(100);
    });
    it('should return the goal total if the deadline is before start', () => {
      const props = {
        goalTotal: 1200,
        deadlineDate: new Date(2000, 0, 1)
      };

      expect(calculated.spendingPerMonth(props)).toBe(1200);
    });
    it('should default startingDate to right now', () => {
      const rightNow = new Date();
      const oneYearFromNow = new Date(rightNow.getFullYear() + 1, rightNow.getMonth(), rightNow.getDay());

      const props = {
        goalTotal: 1200,
        deadlineDate: oneYearFromNow
      };

      expect(calculated.spendingPerMonth(props)).toBe(100);
    })
  });

  describe('total', () => {
    it('should calculate total available at the end of a given year, from a given outlay', () => {
      const props = {
        deadlineDate: new Date(2018, 0, 1),
        startingDate: new Date(2017, 0, 1),
        monthlyOutlay: 100
      };

      expect(calculated.total(props)).toBe(1200);
    });
    it('should return 0 when the deadlineDate is in the past', () => {
      const props = {
        deadlineDate: new Date(2000, 0, 1),
        monthlyOutlay: 100
      };

      expect(calculated.total(props)).toBe(0);
    });
    it('should default startingDate to right now', () => {
      const rightNow = new Date();
      const oneYearFromNow = new Date(rightNow.getFullYear() + 1, rightNow.getMonth(), rightNow.getDay());

      const props = {
        monthlyOutlay: 100,
        deadlineDate: oneYearFromNow
      };

      expect(calculated.total(props)).toBe(1200);
    })

  })
});
