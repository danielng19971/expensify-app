import React from 'react'
import { connect } from 'react-redux'
import { removeExpense } from '../actions/expenses'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ExpenseListItem = ({ id, dispatch, description, amount, createdAt }) => {
    return (
        <div>
            <Link to={`/edit/${id}`}><h1>{description}</h1></Link>
            <p>amount: {amount}</p>
            <p>createdAt: {moment(createdAt).format('MM-DD-YYYY')}</p>
            <button
                onClick={(e) => {
                    dispatch(removeExpense({ id }))
                }}
            >Remove</button>

        </div>
    )
}

export default connect()(ExpenseListItem);