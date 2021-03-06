import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            description : props.expense ? props.expense.description : '',
            amount: props.expense ? ( props.expense.amount/100 ).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    };

    onDescriptionChange =(e)=>{
        const description = e.target.value;
        this.setState(()=>({ description }));
    };

    onAmountChange =(e)=>{
        const amount = e.target.value;
        if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) ){
            this.setState(()=>({ amount }));
        };
    };

    onAddNoteChange =(e)=>{
        const note = e.target.value;
        this.setState(()=>({ note }));
    };

    onDateChange = (createdAt)=>{
        if( createdAt ){
            this.setState(()=>({ createdAt }));
        };
    };

    onFocusChange = ( { focused } )=>{
        this.setState(()=>({ calendarFocused: focused }));
    };

    onFormSubmit = (e)=>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({ error: 'Please provide both the description and amount.' }));
        } else {
            this.setState(()=>({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat((this.state.amount), 10) *100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf(),
            });
        }
    };


    render(){
        return(
            <div className='contentContainer'>
                <form className="form"  onSubmit = { this.onFormSubmit }>

                { this.state.error && <p className="form__error">{ this.state.error }</p>  }

                <input type='text' 
                    className="textInput"
                    placeholder='Description'
                    value = { this.state.description }
                    onChange= { this.onDescriptionChange }
                    autoFocus
                />
                <input type='text' 
                    className="textInput"
                    value= { this.state.amount }
                    placeholder='Amount'
                    onChange = { this.onAmountChange }
                />

                <SingleDatePicker
                    date={ this.state.createdAt }
                    onDateChange = { this.onDateChange }
                    focused = { this.state.calendarFocused }
                    onFocusChange = { this.onFocusChange }
                    numberOfMonths = { 1 }
                    isOutsideRange = { ()=> false }
                />
                
                <textarea
                    className="textarea" 
                    placeholder='Add a note for your expense(optional)'
                    onChange={ this.onAddNoteChange }
                ></textarea>
                    <button className="button"> 
                   { this.props.isEdit? 'Update Expense':'Add Expense' }
                    </button>
                    {this.props.isEdit?(
                        <button 
                        className="button remove"
                        onClick={ this.onRemove }> 
                            Remove 
                        </button>
                    ):null}
                </form>
            </div>
        )
    }
};
