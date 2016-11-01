// Calculates distance to the end of given year
function monthsBetween(deadlineDate, inceptionDate) {
  let months;

  months = (deadlineDate.getFullYear() - inceptionDate.getFullYear()) * 12; // year delta => months
  months -= inceptionDate.getMonth(); // subtract starting month
  months += deadlineDate.getMonth(); // add ending month
  return months <= 1 ? 1 : months; // ensure it returns at least 1 month (even if in past)
}

function total({ deadlineDate, monthlyOutlay, startingDate=new Date() }) {
  if (deadlineDate < startingDate) { return 0 }

  const spendingMonths = monthsBetween(deadlineDate, startingDate);

  return monthlyOutlay * spendingMonths;
};

function spendingPerMonth({ goalTotal, deadlineDate, startingDate=new Date() }) {
  const spendingMonths = monthsBetween(deadlineDate, startingDate);

  return goalTotal / spendingMonths;
};

// Built in assumption that answer is "in year XXXX", i.e. by the end of XXXX
function monthsOfSpending({ goalTotal, monthlyOutlay }) {
  return Math.ceil(goalTotal / monthlyOutlay); 
};

export default {
  total,
  spendingPerMonth,
  monthsOfSpending
};
