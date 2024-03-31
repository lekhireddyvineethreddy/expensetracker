import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import classes from "./ExpenseForm.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../Store/expense'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = () => {
    const formRef = useRef();
    const amountInputRef = useRef();
    const descInputRef = useRef();
    const dateRef = useRef();
    const catRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const expense = useSelector((state) => state.expenseStore);
    

    useEffect(() => {
        if(expense.editItems !== null){
            amountInputRef.current.value = expense.editItems.amount;
            descInputRef.current.value = expense.editItems.description;
            dateRef.current.value = expense.editItems.date;
            catRef.current.value = expense.editItems.category;
        }
    },[expense.editItems])

    const submitHandler = async (event) => {
        event.preventDefault();

        if(expense.editItems !== null){
            const email = auth.userEmail.replace(/[.@]/g,"");

            try {
                const res = await axios.get(`https://expense-tracker-cb3f9-default-rtdb.firebaseio.com//${email}/expenses.json`);

                const data = res.data;

                const Id = Object.keys(data).find((eleId) => data[eleId].id === expense.editItems.id);

                try {
                    const res = await axios.delete(`https://expense-tracker-cb3f9-default-rtdb.firebaseio.com//${email}/expenses/${Id}.json`);
                } catch (error) {
                    alert(error)
                }
            } catch (error) {
                alert(error)
            }

            dispatch(expenseActions.setEditItemsNull());
        }

        const expenseDetails = {
            id : Math.random().toString(),
            amount : amountInputRef.current.value,
            description : descInputRef.current.value,
            date : dateRef.current.value,
            category : catRef.current.value
        }

        const email = auth.userEmail.replace(/[.@]/g,"");
        try {
            const response = await axios.post(`https://expense-tracker-cb3f9-default-rtdb.firebaseio.com//${email}/expenses.json`,expenseDetails)

        } catch (error) {
            alert(error)
        }
        console.log(expenseDetails);
        dispatch(expenseActions.addItem(expenseDetails))
        formRef.current.reset();
    }

    const hideExpenseHandler = () => {
        navigate("/profile/welcome" , {replace : true})
    }

    return (
        <div className={classes.body}>
            <form onSubmit={submitHandler} ref={formRef}>
                <section className={classes.form}>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input
                            id="amount"
                            type='number'
                            placeholder='amount'
                            ref={amountInputRef}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            type='text'
                            placeholder='description'
                            ref={descInputRef}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type='date'
                            ref={dateRef}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='category'>Category</label>
                        <select id='category' ref={catRef} >
                            <option value="petrol">Petrol</option>
                            <option value="salary">Salary</option>
                            <option value="food">Food</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </section>
                <div>
                    <Button variant="primary" type="submit" className='mx-2'>Add Expense</Button>
                    <Button variant='danger' onClick={hideExpenseHandler}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm