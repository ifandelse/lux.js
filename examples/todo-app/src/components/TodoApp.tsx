import React from "react";
import lux from "lux.js";
import type { TodoState } from "../stores/todoStore";
import type { FilterState } from "../stores/filterStore";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import StatusBar from "./StatusBar";

interface TodoAppDisplayProps {
	totalCount: number;
	appTitle: string;
}

function TodoAppDisplay({ totalCount, appTitle }: Readonly<TodoAppDisplayProps>) {
	return (
		<div style={{ fontFamily: "sans-serif", maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
			<h1>{appTitle}</h1>
			<p style={{ color: "#888", fontSize: "0.85rem" }}>
				{totalCount} {totalCount === 1 ? "item" : "items"} total
			</p>
			<TodoInput />
			<TodoList />
			<StatusBar />
		</div>
	);
}

// Demonstrates getState with storeChanges parameter.
// storeChanges is { [storeName]: true } for whichever store(s) triggered the update.
const TodoApp = lux.luxWrapper(TodoAppDisplay, {
	stores: ["todo", "filter"],
	getState(_props, storeChanges) {
		const todoState = lux.stores.todo.getState() as TodoState;
		const filterState = lux.stores.filter.getState() as FilterState;

		// Log which store triggered this update
		if (storeChanges.todo && !storeChanges.filter) {
			console.log("[TodoApp] Only todo store changed");
		} else if (storeChanges.filter && !storeChanges.todo) {
			console.log("[TodoApp] Only filter store changed");
		}

		return {
			totalCount: todoState.todos.length,
			appTitle: `Lux.js Todos (${filterState.filter})`
		};
	}
});

export default TodoApp;
