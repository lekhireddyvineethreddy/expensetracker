import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from "./ExpenseList.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../Store/expense';
import { themeActions } from '../../Store/theme';
import { authActions } from '../../Store/auth';
import { FaCrown } from "react-icons/fa";
import axios from 'axios';
import { Button } from 'react-bootstrap';


const ExpenseList = () => {
  const expense = useSelector((state) => state.expenseStore);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let total = 0;
  total = expense.items.reduce((acc, item) => {
    return acc + Number(item.amount)
  }, 0)

  const editClickHandler = (item) => {
    const filter = expense.items.filter((ele) => ele !== item);
    // expense.editItem(item, filter);
    dispatch(expenseActions.editItem({ item: item, filtered: filter }));
  }

  const dltClickHandler = async (item) => {
    dispatch(expenseActions.removeItem(item));

    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.get(`https://expense-project-practice-default-rtdb.firebaseio.com/${email}/expenses.json`)

      const data = res.data;
      const Id = Object.keys(data).find((eleId) => data[eleId].id === item.id);
      try {
        const res = await axios.delete(`https://expense-project-practice-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`)
      } catch (error) {
        alert(error)
      }
    } catch (error) {
      alert(error)
    }
  }

  const restoreData = async () => {
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.get(`https://expense-tracker-cb3f9-default-rtdb.firebaseio.com//${email}/expenses.json`)

      const data = res.data;
      if (data) {
        const realData = Object.values(data).reverse();
        console.log(realData);
        dispatch(expenseActions.setItems(realData))
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if (auth.userEmail !== null) {
      restoreData();
    }
  }, [auth.userEmail])

  const clickActPremiumHandler = async () => {
    dispatch(themeActions.toggleTheme());
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const res = await axios.post(
        `https://expense-tracker-cb3f9-default-rtdb.firebaseio.com//${email}/userDetail.json`, {isPremium: true}
      );
    } catch (error){ 
      alert(error)
    }
    dispatch(authActions.setIsPremium());
    localStorage.setItem('isPremium', true);
  };

  const clickDownloadHandler = () => {
    const generateCSV = (itemsArr) => {
      const csvRows = [];
      const headers = ['Date', 'Description', 'Category', 'Amount'];
      csvRows.push(headers.join(','));
  
      itemsArr.forEach((i) => {
        const row = [
          i.date,
          i.description,
          i.category,
          i.amount
        ];
        csvRows.push(row.join(","));
      });
      
      return csvRows.join("\n");
    };
    // console.log([generateCSV(expense.items)])
    const csvContent = generateCSV(expense.items);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "expenses.csv";
    downloadLink.click();
  };

  return (
    <section className={classes.listCon}>
      <div className={classes.container}>
        <h1>Expenses</h1>
        <div className={classes.totalAmt}>
        <h3>Total expense  <span> ₹{total}</span></h3>
        {total >= 10000 &&
            (!auth.isPremium ? (
              <Button variant="danger" onClick={clickActPremiumHandler}>
                Activate Premium
              </Button>
            ) : (
              <Button variant="warning" onClick={clickDownloadHandler}><FaCrown />Download List</Button>
            ))}
         
        </div>
        {total >= 10000 && (!auth.isPremium &&
          <p style={{ color: "red" }}>
            *Please Activate Premium total expenses more than 10000
          </p>
        )}
      </div>
      <ul>
        {expense.items.map((i, index) => (
          <li className={classes.listItem} key={index}>
            <div className={classes.date}>{i.date}</div>
            <h3 className={classes.category}>{i.category.toUpperCase()}</h3>
            <div className={classes.des}>{i.description}</div>
            <div className={classes.Amt}>₹{i.amount}</div>
            <div className={classes.btn}>
              <button
                className={classes.edit}
                onClick={() => editClickHandler(i)}
              >
                <AiFillEdit />
              </button>
              <button
                className={classes.dlt}
                onClick={() => dltClickHandler(i)}
              >
                <AiFillDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpenseList