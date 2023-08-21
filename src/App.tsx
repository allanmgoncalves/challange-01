import { v4 as uuidv4 } from 'uuid';

import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header';
import { EmptyTask } from './components/EmptyTask';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';

export function App() {
	const [taskList, setTaskList] = useState([
		{
			id: uuidv4(),
			isCompleted: false,
			content: 'Fazer o estudo bíblico diário',
		},
		{
			id: uuidv4(),
			isCompleted: false,
			content: 'Ler o livro com minha esposa "Uma vida com propósito"',
		},
	]);
	const [newTaskText, setNewTaskText] = useState('');
	const totalOfTasks: number = taskList.length;
	const [completedTasksCount, setCompletedTasksCount] = useState(0);

	function handleCreateNewTask(event: FormEvent) {
		event.preventDefault();

		setTaskList([...taskList, { id: uuidv4(), isCompleted: false, content: newTaskText }]);
		setNewTaskText('');
	}

	function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('');
		setNewTaskText(event.target.value);
	}

	function handleDeletedTask(id: string) {
		const newTaskList = taskList.filter(task => task.id !== id);
		setCompletedTasksCount(state => {
			return state - 1;
		});
		setTaskList(newTaskList);
	}

	function handleCompletedTask(id: string) {
		const newTaskList = taskList.map(task => {
			if (task.id === id) {
				const updatedTaskList = {
					...task,
					isCompleted: !task.isCompleted,
				};

				setCompletedTasksCount(state => {
					return state + 1;
				});
				console.log(updatedTaskList);
				return updatedTaskList;
			}
			return task;
		});
		setTaskList(newTaskList);
	}

	return (
		<>
			<Header newTextTask={newTaskText} onCreatedTask={handleCreateNewTask} onChangedTaskText={handleNewTaskChange} />
			<main className={styles.mainContainer}>
				<header className={styles.header}>
					<p>
						<span className={styles.blueText}>Created Tasks</span>
						<span className={styles.badgeCounter}>{totalOfTasks}</span>
					</p>
					<p>
						<span className={styles.purpleText}>Completed Tasks</span>
						<span className={styles.badgeCounter}>
							{completedTasksCount} of {totalOfTasks}
						</span>
					</p>
				</header>
				<ul className={styles.taskListContainer}>
					{taskList.length === 0 ? (
						<EmptyTask />
					) : (
						taskList.map(task => {
							return (
								<Task
									key={task.id}
									id={task.id}
									isCompleted={task.isCompleted}
									content={task.content}
									onCompletedTask={() => handleCompletedTask(task.id)}
									onDeletedTask={() => handleDeletedTask(task.id)}
								/>
							);
						})
					)}
				</ul>
			</main>
		</>
	);
}
