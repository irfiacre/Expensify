import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

const expenseListFilter = (props)=>(
    <div>
        <input type='text' value={ props.filters.text } placeholder='Enter a filter text' onChange={(e)=>{
           props.dispatch(setTextFilter(e.target.value));
        }} />
    </div>
);

const mapStateToProps = (state)=>({  filters: state.filters  });

export default  connect(mapStateToProps)(expenseListFilter);