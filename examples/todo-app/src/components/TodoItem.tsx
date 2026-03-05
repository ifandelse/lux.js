import React from "react";
import type { Todo } from "../stores/todoStore";

interface TodoItemProps {
	todo: Todo;
	onToggle: () => void;
	onRemove: () => void;
}

export default function TodoItem({ todo, onToggle, onRemove }: Readonly<TodoItemProps>) {
	return (
		<li style={{
			display: "flex",
			alignItems: "center",
			padding: "0.5rem 0",
			borderBottom: "1px solid #eee"
		}}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={onToggle}
				style={{ marginRight: "0.75rem" }}
			/>
			<span style={{
				flex: 1,
				textDecoration: todo.completed ? "line-through" : "none",
				color: todo.completed ? "#999" : "#333"
			}}>
				{todo.text}
			</span>
			<button
				onClick={onRemove}
				style={{
					background: "none",
					border: "none",
					color: "#cc3333",
					cursor: "pointer",
					fontSize: "1.1rem"
				}}
			>
				&times;
			</button>
		</li>
	);
}
