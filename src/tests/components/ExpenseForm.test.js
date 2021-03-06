import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/expenseForm';
import expensesData from '../fixtures/expensesData';

describe( '======== Testing for Expense Form: ', ()=>{

    const wrapper = shallow(<ExpenseForm />);

    it('Should render expense form correctly:', ()=>{
        expect(wrapper).toMatchSnapshot();
    });
    
    it('Should render expense form correctly with form data:', ()=>{
        const wrapper = shallow(<ExpenseForm expense={ expensesData[0] } />);
        expect(wrapper).toMatchSnapshot();
    });

    // Simulation Resource: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html
    // Wrapper state resource: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/state.html
    
    it('Should render error on invalid inputs form submission: ', ()=>{
       
        expect(wrapper).toMatchSnapshot();
        wrapper.find('form').simulate('submit',{
            preventDefault: ()=>{  },
        });
        expect(wrapper.state('error').length).toBeGreaterThan(0);
        expect(wrapper).toMatchSnapshot();
    });  

       // https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/at.html

    it('Should set state description value on input change: ', ()=>{
        const value = 'Test Description';

        wrapper.find('input').at(0).simulate('change',{
            target: { value },
        });
        expect(wrapper.state('description')).toBe(value);
        expect(wrapper).toMatchSnapshot();
    });

    it('Should set state note value on input change: ', ()=>{
        const value = 'Added a big test note';   

        wrapper.find('textarea').simulate('change',{
            target: { value },
        });
        expect(wrapper.state('note')).toBe(value);
         
    });

    // Note that  because on adding a note we require `e.target.value` in our simulation we must always have the target :{ value }
   //  Thus our value can not change it's name

    it('Should set state amount value on input change: ', ()=>{
        const value ='10.00';   

        wrapper.find('input').at(1).simulate('change',{
            target: { value },
        });
        expect(wrapper.state('amount')).toBe(value);
    });

    it('Should NOT set state AMOUNT value on input change: ', ()=>{
        const value = '12.3334';   
        
        wrapper.find('input').at(1).simulate('change',{
            target: { value },
        });
        expect(wrapper.state('amount')).toBe('10.00');
    });

    // Resources: https://jestjs.io/docs/en/mock-function-api
    // https://jestjs.io/docs/en/expect
    // https://jestjs.io/docs/en/expect#tohavebeenlastcalledwitharg1-arg2-
    
    it('Should submit form with form data', ()=>{
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<ExpenseForm expense={ expensesData[0] }  onSubmit={ onSubmitSpy } />);

        wrapper.find('form').simulate('submit',{
            preventDefault: ()=>{},
        });

        expect(wrapper.state('error')).toBe('');
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description : expensesData[0].description,
            amount : expensesData[0].amount,
            note : expensesData[0].note,
            createdAt : expensesData[0].createdAt,
        });
    });

    // using prop: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/prop.html

    // it('Should set DATE on on DATE Change',()=>{
    //     const now = moment();
    //     const wrapper = shallow(<ExpenseForm />);
    //     wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    //     expect(wrapper.state('createdAt')).toEqual(now);

    //     const handlePaginate = jest.spyOn(
	// 		wrapper.find('[testData="SingleDatePicker"]').at(1).props(),
	// 		'onDateChange'
	// 	);
    //     wrapper.find('[testData="SingleDatePicker"]').at(1).props().onDateChange(now);

    //     expect(handlePaginate).toBeCalled();
    // });

    // it('Should update calendarFocus  onFocusChange: ',()=>{
    //     const wrapper = shallow(<ExpenseForm />);

    //     wrapper.find('SingleDatePicker').prop('onFocusChange')(true)
    //     expect(wrapper.state('calendarFocused')).toBe(true);
    // });
    
});
