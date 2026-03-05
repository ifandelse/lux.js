import React, { useState } from "react";
import lux from "lux.js";

interface TodoInputDisplayProps {
	onAddTodo: (text: string) => void;
}

function TodoInputDisplay({ onAddTodo }: Readonly<TodoInputDisplayProps>) {
	const [text, setText] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = text.trim();
		if (trimmed) {
			onAddTodo(trimmed);
			setText("");
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="What needs to be done?"
				style={{ flex: 1, padding: "0.5rem", fontSize: "1rem" }}
			/>
			<button type="submit" style={{ padding: "0.5rem 1rem" }}>Add</button>
		</form>
	);
}

// luxWrapper with actions only — no store subscription needed
const TodoInput = lux.luxWrapper(TodoInputDisplay, {
	actions: {
		onAddTodo: "addTodo"
	}
});

export default TodoInput;
