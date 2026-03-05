import React from "react";
import lux from "lux.js";
import type { TodoState, Todo } from "../stores/todoStore";
import type { FilterState, FilterValue } from "../stores/filterStore";
import TodoItem from "./TodoItem";

interface TodoListDisplayProps {
	todos: Todo[];
	onToggle: (id: number) => void;
	onRemove: (id: number) => void;
}

function TodoListDisplay({ todos, onToggle, onRemove }: Readonly<TodoListDisplayProps>) {
	if (todos.length === 0) {
		return <p style={{ color: "#999", textAlign: "center" }}>No todos to show.</p>;
	}
	return (
		<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={() => onToggle(todo.id)}
					onRemove={() => onRemove(todo.id)}
				/>
			))}
		</ul>
	);
}

function filterTodos(todos: Todo[], filter: FilterValue): Todo[] {
	switch (filter) {
		case "active":
			return todos.filter((t) => !t.completed);
		case "completed":
			return todos.filter((t) => t.completed);
		default:
			return todos;
	}
}

// luxWrapper subscribing to two stores, with filtering logic
const TodoList = lux.luxWrapper(TodoListDisplay, {
	stores: ["todo", "filter"],
	getState() {
		const { todos } = lux.stores.todo.getState() as TodoState;
		const { filter } = lux.stores.filter.getState() as FilterState;
		return { todos: filterTodos(todos, filter) };
	},
	actions: {
		onToggle: "toggleTodo",
		onRemove: "removeTodo"
	}
});

export default TodoList;
