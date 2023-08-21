import { ChangeEvent, FormEvent, InvalidEvent } from 'react';

import styles from './Header.module.css';
import Logo from '../assets/logo.svg';
import { PlusCircle } from 'phosphor-react';

interface TaskProps {
	newTextTask: string;
	onCreatedTask: (event: FormEvent) => void;
	onChangedTaskText: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Header({ newTextTask, onCreatedTask, onChangedTaskText }: TaskProps) {
	function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
		event.target.setCustomValidity('Required');
	}

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<img src={Logo} alt="Logo with a text ToDo with a Rocket" />
				<form onSubmit={onCreatedTask} className={styles.addTaskContainer}>
					<input
						type="text"
						placeholder="Add a new task"
						value={newTextTask}
						onChange={onChangedTaskText}
						onInvalid={handleNewTaskInvalid}
						required
					/>
					<button type="submit" title="Create Task" disabled={newTextTask.length === 0}>
						<span>Create</span> <PlusCircle size={24} weight="bold" />
					</button>
				</form>
			</div>
		</header>
	);
}
