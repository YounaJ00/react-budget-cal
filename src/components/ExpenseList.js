import React, { Component } from 'react'
import './Expenselist.css'

export class ExpenseList extends Component {
  render() {
    return (
        <>
        <ul className='list'>
            {/* Expense Item */}
            {expenses.map(expense => {
                return (
                    <ExpenseItem
                        expense={expense}
                        key={expense.id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )
            })}
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