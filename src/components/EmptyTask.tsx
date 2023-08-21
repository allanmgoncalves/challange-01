import styles from './EmptyTask.module.css';
import { ClipboardText } from 'phosphor-react';

export function EmptyTask() {
	return (
		<div className={styles.emptyTaskList}>
			<ClipboardText size={64} weight="light" />
			<p>
				<strong>You don't have tasks registered yet</strong>
			</p>
			<p>Create tasks and organize your tasks</p>
		</div>
	);
}
