import React from 'react'

import GoalAttrContainer from '../containers/GoalAttrContainer';

const Goal = ({ goal, onUpClick, onDownClick }) => (
  <tr>
    <td>
      {goal.type}
    </td>
    <GoalAttrContainer attrName={"total"} goalID={goal.id} />
    <GoalAttrContainer attrName={"deadline"} goalID={goal.id} />
    <GoalAttrContainer attrName={"outlay"} goalID={goal.id} />
    <td>
      <button onClick={onUpClick}>
        Up
      </button>
      <button onClick={onDownClick}>
        Down
      </button>
    </td>
  </tr>
)

export default Goal;
