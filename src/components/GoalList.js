import React, { PropTypes } from 'react';

import GoalsTable from './GoalsTable';
import Goal from './Goal';

const {
  arrayOf,
  func,
  number,
  shape
 } = PropTypes;

const GoalList = ({ orderedGoals, onUpClick, onDownClick }) => (
  <GoalsTable>
    {orderedGoals.map((goal) => (
      <Goal
        goal={goal}
        key={goal.id}
        onUpClick={() => onUpClick(goal.id)}
        onDownClick={() => onDownClick(goal.id)} />
      )
    )}
  </GoalsTable>
)

GoalList.propTypes = {
  orderedGoals: arrayOf(shape({
    id: number.isRequired,
    total: number.isRequired,
    deadline: number.isRequired,
    outlay: number.isRequired
  })).isRequired,
  onUpClick: func.isRequired,
  onDownClick: func.isRequired
};

export default GoalList;
