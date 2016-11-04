import * as actions from '../constants/ActionTypes';
import calculated from '../utils/attr-relationships';

// Return [0] because .filter returns an array of length 1
function remainingAttr(lockedAttr, changingAttr) {
  return ["total", "deadline", "outlay"]
    .filter((attr) => (attr !== lockedAttr))
    .filter((attr) => (attr !== changingAttr))[0];
}

function functionMap(attrToCalculate) {
  const map = {
    total: calculated.total,
    deadline: calculated.monthsOfSpending,
    outlay: calculated.spendingPerMonth
  }

  return map[attrToCalculate]
}

const goal = (state = {}, action) => {
  const { attrName: changingAttr, newVal} = action;
  const { lockedAttr } = state;
  const attrToCalculate = remainingAttr(lockedAttr, changingAttr);
  const updateFn = functionMap(attrToCalculate);
  if (action.key !== state.key) { return item } // shouldn't ever hit this

  return {
    ...state,
    [changingAttr]: newVal,
    [attrToCalculate]: updateFn(state)
  }
}

export default function goals(state = {}, action) {
  switch (action.type) {
    case actions.ADD_GOAL:
      const { goal: newGoal } = action;

      return {
        ...state,
        [newGoal.id]: newGoal
      }
    case actions.UPDATE_GOAL:
      const updateGoal = state[action.goalID];
      return {
        ...state,
       [action.goalID]: goal(updateGoal, action) 
      };
    default:
      return state;
  }
}

export const orderedGoalsFrom = (state) => ({
  orderedGoals: state.order.map((goalId) => (state.goals[goalId]))
})
