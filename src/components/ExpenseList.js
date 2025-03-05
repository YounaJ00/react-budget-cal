import React, { Component } from 'react'
import './Expenselist.css'
import ExpenseItem from './ExpenseItem'

export class ExpenseList extends Component {
  render() {
    return (
        <>
        <ul className='list'>
            {/* Expense Item */}
            <ExpenseItem/> 
        </ul>
        {expenses.length > 0 && (
            <button className='btn' onClick={clearItems}>
                목록 지우기
                <MdDelete className='btn-icon' />
            </button>
        )}
    </>
    )
  }
}

export default ExpenseList