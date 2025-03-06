// 최종화면
import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {
    
    const [charge, setCharge] = useState("");
    const [id, setId] = useState('');
    const [amount, setAmount] = useState(0);
    // edit 버튼 클릭시 -> edit state 변경 -> 해당 지출 항목의 charge, amount, id 가져오기
    const [edit, setEdit] = useState(false);

    const [alert, setAlert] = useState({show: false});
    
    


    const [expenses, setExpenses] = useState(
        // 초기 state 값
        [
            {id: 1, charge: "렌트비", amount:1600},
            {id: 2, charge: "교통비", amount:1400},
            {id: 3, charge: "숙박비", amount:5000}
        ]
    )

    const clearItems = () => {
        setExpenses([]);
    }


    const handleCharge =(e) => {
        console.log(e.target.value);
        setCharge(e.target.value);
    }

    const handleAmount =(e) => {
        setAmount(e.target.valueAsNumber)
    }

    // filter() 사용하여 같은 id 같은것 삭제(클릭시)
    const handleDelete = (id) => {
        const newExpenses = expenses.filter(expense => expense.id !== id)
        console.log(newExpenses);
        setExpenses(newExpenses);
        handleAlert({type: 'danger', text: '아이템이 삭제되었습니다'})
    }

    const handleAlert = ({type,text}) => {
        setAlert({show: true, type, text});
        setTimeout(() => {
            setAlert({show: false});
        }, 4000);
    }

    const handleEdit = (id) => {
        const expense = expenses.find(item => item.id === id);
        const {charge, amount} = expense;
        setId(id);
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
    }


    // 페이지 리프레시 막음
    const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" && amount > 0) {
            if(edit) {
                const newExpenses = expenses.map(item => {
                    return item.id === id ? {...item, charge, amount} : item
                })

                setExpenses(newExpenses);
                setEdit(false);
                handleAlert({type: 'success', text: '아이템이 수정되었습니다.'});
            }else {
                const newExpense = {id: crypto.randomUUID(), charge, amount }
                // 불변성을 지켜주기 위해서 새로운 expenses 를 생성
                const newExpenses = [...expenses, newExpense];
                setExpenses(newExpenses);
                handleAlert({type: 'success', text: '아이템이 생성되었습니다'});
            }

            setCharge("");
            setAmount(0);

        }else {
            console.log('error');
            handleAlert({
                type: 'danger',
                text: 'charge는 빈 값일 수 없으면 amount는 0보다 커야 합니다'
            })
        }
    }


        return(
            <main className="main-container">
                {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
                <h1>예산 계산기</h1>

                <div style={{width: '100%', backgroundColor: 'red', padding: '1rem'}}>
                    {/* Expense Form */}
                    <ExpenseForm 
                    handleCharge ={handleCharge}
                    charge={charge}
                    handleAmount ={handleAmount}
                    amount={amount}
                    handleSubmit={handleSubmit}
                    edit={edit}
                    />
                </div>

                <div style={{width: '100%', backgroundColor: 'orange', padding: '1rem'}}>
                    {/* Expense List */}
                    <ExpenseList 
                    expenses={expenses}
                    handleDelete={handleDelete}
                    handleEdit = {handleEdit}
                    clearItems={clearItems}
                    />
                </div>

                <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
                    <p style={{fontSize:'2rem'}}>
                        총지출:
                        <span>
                            {/* 총 비용 계산 코드 */}
                            {expenses.reduce((acc, curr) => {
                                return (acc += curr.amount);
                            }, 0)}
                            원</span>
                    </p>
                </div>
            </main>
        )
}

export default App;

