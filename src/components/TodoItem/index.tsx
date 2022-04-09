

import React from "react";
import { TaskStatus } from "../../utils/statusHelper";
import styles from "./index.module.css";

import { ITodoItem } from "../../TodoList";


interface IProps {
    index: number
    item: ITodoItem
    handleStart: (index: number) => void
    handleComplete: (index: number) => void
    handleDel: (index: number) => void
}

// 对于接收的组件参数，需要定义参数类型
const TodoItem:React.FC<IProps> = ({index,item,handleStart,handleComplete,handleDel})=>{
    return (
        <div className={styles.taskItem}>
            <div className={styles.name}>{item.taskName}</div>
            <div className={styles.statusText}>
                {item.status===TaskStatus.PENDING && <span className={styles.pending}>待开始</span>}
                {item.status===TaskStatus.IN_PROGRESS && <span className={styles.inProgress}>进行中</span>}
                {item.status===TaskStatus.COMPLETED && <span className={styles.completed}>已完成</span>}
            </div>
            <div className={styles.btns}>
                {item.status===TaskStatus.PENDING && (
                    <button className={styles.btn} onClick={()=>handleStart(index)}>开始</button>
                )}
                {item.status===TaskStatus.IN_PROGRESS && (
                    <button className={styles.btn} onClick={()=>handleComplete(index)}>完成</button>
                )}
                <button className={styles.btn} onClick={()=>handleDel(index)}>删除</button>
            </div>
        </div>
    )
}

export default TodoItem