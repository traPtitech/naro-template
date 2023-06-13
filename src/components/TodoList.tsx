import React, { useState } from "react"

interface Task {
	name: string
	isFinished: boolean
}

export default function TodoList() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [newTaskName, setNewTaskName] = useState("")

	// 完了済みタスクを計算して保持しておく
	const finishedTasks = () => tasks.filter((task) => task.isFinished)
	// 未完タスクを計算して保持しておく
	const notFinishedTasks = () => tasks.filter((task) => !task.isFinished)

	const addTask = () => {
		// バリデーションを通ったらタスク一覧に追加する
		if (newTaskName === "") {
			alert("タスク名を入力してください")
			return
		}
		if (tasks.some((task) => task.name === newTaskName)) {
			alert("同じ名前のタスクが存在します")
			return
		}
		setTasks([
			...tasks,
			{
				name: newTaskName,
				isFinished: false,
			},
		])
		setNewTaskName("")
	}
	const finishTask = (taskName: string) => {
		// タスク名がtaskNameのタスクを完了済みにする
		setTasks(
			tasks.map((task) => {
				if (task.name === taskName) {
					return {
						...task,
						isFinished: true,
					}
				}
				return task
			})
		)
	}
	return (
		<div>
			<div>TodoList</div>
			<div>完了済みタスク一覧</div>
			<ul>
				{finishedTasks().map((task) => (
					<li key={task.name}>
						<div>{task.name}</div>
					</li>
				))}
			</ul>
			<div>未完タスク一覧</div>
			<ul>
				{notFinishedTasks().map((task) => (
					<li key={task.name}>
						<div>{task.name}</div>
						<div>
							<button onClick={() => finishTask(task.name)}>完了する</button>
						</div>
					</li>
				))}
			</ul>
			<div>
				<label>
					名前
					<input
						v-model="newTaskName"
						type="text"
						value={newTaskName}
						onChange={(e) => setNewTaskName(e.target.value)}
					/>
				</label>
				<button onClick={addTask}>追加</button>
			</div>
		</div>
	)
}
