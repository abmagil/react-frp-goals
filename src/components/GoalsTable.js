import React, { PropTypes } from 'react';
import cdf from '../../cdf';
import sum from 'lodash/sum';

const GoalsTable = ({ children }) => (
  <table>
    <thead>
      <tr>
       <td>Goal</td>
       <td>Cost</td>
       <td>Deadline</td>
       <td>Monthly Cost</td>
       <td>Move</td>
     </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="3"></td>
        <td readOnly>
          {/*sum(cdf(children.map((g) => g.outlay)))*/}
        </td>
        <td></td>
      </tr>
    </tfoot>
  </table>
)

GoalsTable.propTypes = {
  children: PropTypes.node
}

export default GoalsTable;
