import React, { PropTypes } from 'react';

const GoalAttribute = ({ isLocked, value, updateHandler }) => {
  return <td>
    {isLocked
      ? <p>{value}</p>
      : <input type="number"
          value={value}
          onChange={updateHandler} />
    }
  </td>
}
GoalAttribute.propTypes = {
  goalID: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
  attrName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  updateHandler: PropTypes.func.isRequired
}

export default GoalAttribute
