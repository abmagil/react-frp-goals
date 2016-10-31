// Calculates distance to the end of given year
function distanceInMonths(year, startDate=new Date()) {
  const deadline = new Date(year, 11, 31)
  let months;

  months = (deadline.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth() + 1;
  months += deadline.getMonth();
  return months <= 1 ? 1 : months;
}

function total({deadlineYear, monthlyOutlay, startMonthOffset=0 }) {
  const spendingMonths = distanceInMonths(deadlineYear) - startMonthOffset;

  return monthlyOutlay * spendingMonths;
};

function outlay({goalTotal, startingYear=new Date().getFullYear(), deadlineYear}) {
  const spendingMonths = distanceInMonths(deadlineYear, startingYear) - startMonthOffset;

  return goalTotal / spendingMonths;
};

// Built in assumption that answer is "in year XXXX", i.e. by the end of XXXX
function monthsOfSpending({goalTotal, monthlyOutlay}) {
  return Math.ceil(goalTotal / monthlyOutlay); 
};

export default {
  total,
  outlay,
  monthsOfSpending
};
