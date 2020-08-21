import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates'

class expenseListFilter extends React.Component {
    state = {
        focusedInput: null
    }
    render() {
        return (
            <div>
                <input
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value))
                    }} />
                <select onChange={(e) => {
                    if (e.target.value === 'date') {
                        this.props.dispatch(sortByDate())
                    } else if (e.target.value === 'amount') {
                        this.props.dispatch(sortByAmount())
                    }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={
                        ({ startDate, endDate }) => {
                            this.props.dispatch(setStartDate(startDate))
                            this.props.dispatch(setEndDate(endDate))
                        }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    isOutsideRange={()=>false}
                    numberOfMonths={1}
                />
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        filters : state.filters
    }
}



export default connect(mapStateToProps)(expenseListFilter)