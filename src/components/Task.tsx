import styles from './Task.module.css';

import { Trash } from 'phosphor-react';

export interface Task {
	id: string;
	isCompleted: boolean;
	content: string;
}

interface TaskProps extends Task {
	onCompletedTask: () => void;
	onDeletedTask: () => void;
}

export function Task({ id, isCompleted, content, onCompletedTask, onDeletedTask }: TaskProps) {
	return (
		<li className={styles.taskCard}>
			<input type="checkbox" name={id} checked={isCompleted} onChange={onCompletedTask} />
			<label>{content}</label>
			<button type="button" title="Delete Task" onClick={onDeletedTask}>
				<Trash size={18} weight="regular" />
			</button>
		</li>
	);
}
