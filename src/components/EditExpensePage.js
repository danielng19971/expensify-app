import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm'
import {editExpense} from '../actions/expenses'

const EditExpensePage = (props) => {
  //console.log(props);
  return (
    <div>
     <ExpenseForm 
     expense={props.expense[0]}
     onSubmit={(expense)=>{
        props.dispatch(editExpense(props.match.params.id,expense))
        props.history.push('/')
     }}
     />
    </div>
  );
};
const mapStateToProps = (state,props)=>{
  return {
    expense : state.expenses.filter((expense)=> expense.id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);
