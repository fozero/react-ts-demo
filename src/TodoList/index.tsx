import React,{useState,useEffect} from 'react';
import TodoItem from "../components/TodoItem";
import { TaskStatus } from "../utils/statusHelper";
import styles from "./index.module.css";

export interface ITodoItem {
    taskName: string,
    status: TaskStatus
}

// 保存数据
const saveTaskList = (list: ITodoItem[])=>{
    localStorage.setItem('taskList',JSON.stringify(list))
}

// 获取数据
const getTaskList = ()=> {
    const taskList = localStorage.getItem("taskList")
    if(taskList){
        return JSON.parse(taskList)
    }
    return []
}

// React.FC表示react的一个函数组件，是React.FunctionComponent的简写形式
const TodoList:React.FC = ()=>{

  const [list, setList] = useState<Array<ITodoItem>>([])
  const [inputValue, setInputValue] = useState<string>("")

  const updateList = (list:ITodoItem[])=>{
    setList(list)
    saveTaskList(list)
  }

  const handleAdd = ()=>{
    if(!inputValue.trim()){
        return alert("输入不能为空")
    }
    let [...newList] = list;
    newList.push({
        taskName: inputValue,
        status: TaskStatus.PENDING
    })
    updateList(newList)
    setInputValue("")
  }


  const handleStart = (index:number)=>{
    let [...newList] = list;
    newList = newList.map((item,indx)=>{
        if(indx === index){
            return {
                ...item,
                status: TaskStatus.IN_PROGRESS
            }
        }
        return item
    })
    updateList(newList)
  }

  const handleComplete = (index:number)=>{
    let [...newList] = list;
    newList = newList.map((item,indx)=>{
        if(indx === index){
            return {
                ...item,
                status: TaskStatus.COMPLETED
            }
        }
        return item
    })
    updateList(newList)
  }


  const handleDel = (index:number)=>{
    let [...newList] = list;
    newList.splice(index,1)
    updateList(newList)
  }

  // 初始化列表数据
  useEffect(() => {
    const list = getTaskList()
    setList(list)
  }, [])
  
  
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>TODO LIST</h1>
        <div className={styles.form}>
            <input className={styles.textInput} type="text" value={inputValue} placeholder="输入任务名" onChange={(e)=>setInputValue(e.target.value)}/>
            <button className={styles.addBtn} onClick={handleAdd}>添加任务</button>
        </div>
        <div className={styles.list}>
            {list.map((item,index)=> {
                return <TodoItem key={index} index={index} item={item} handleStart={handleStart} handleComplete={handleComplete} handleDel={handleDel}/>
            })}
        </div>
    </div>
  )
}

export default TodoList;
