import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';




export default class ExpenseForm extends React.Component {

    constructor(props){
        super(props);
        const expense = props.expense;
        console.log(expense)
        this.state = {
            description: expense ? expense.description : '',
            amount: expense ? (expense.amount / 100).toString()  : '',
            createdAt: expense ? moment(expense.createdAt) : moment(),
            note : expense ? expense.note : '',
            focused:false,
            error:''
        }
    }

    onDescriptionChange = (e) => {

        this.setState({ description: e.target.value })
    }
    onNoteChange = (e) => {
        this.setState({ note: e.target.value })
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        //use !amount because you want to clear the field
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState({ amount })
        }
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState({error : 'please enter amount or description'})
        }else{
            this.setState({error:''})
            this.props.onSubmit({
                description : this.state.description,
                amount : parseFloat(this.state.amount) *100 ,
                createdAt : this.state.createdAt.valueOf(),
                note : this.state.note
            })
        }
        
    }

    onDateChange = (createdAt) => {
        //forbid user from selecting no date
        if(createdAt){
        this.setState({ createdAt });
        }
    }


    render() {
        return (
            <div>
                {this.state.error!=='' && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmitForm}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    ></input>

                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    ></input>
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.focused}
                        onFocusChange={({focused})=> this.setState({ focused })}
                        isOutsideRange={(day)=>{
                            //  console.log(day)
                            return false;
                        }}
                    />
                    <textarea
                        type="text"
                        placeholder="Note"
                        value={this.state.note}
                        onChange={this.onNoteChange}

                    ></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}