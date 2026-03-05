import lux from "lux.js";
import type { TodoState, Todo } from "../stores/todoStore";

const sampleTodos: Todo[] = [
	{ id: 1, text: "Learn lux.js stores and dispatching", completed: true },
	{ id: 2, text: "Build a todo app with lux.js", completed: false },
	{ id: 3, text: "Try the waitFor pattern", completed: false }
];

// Non-component dispatcher: plain module calling lux.dispatch directly.
// Simulates loading data from an API.
export function loadInitialTodos(): void {
	lux.dispatch("todosLoaded", sampleTodos);
}

// customActionCreator: registers "clearCompleted" in the action registry.
// Reads current state, finds completed IDs, dispatches removeTodo for each.
lux.customActionCreator({
	clearCompleted() {
		const { todos } = lux.stores.todo.getState() as TodoState;
		const completedIds = todos
			.filter((t: Todo) => t.completed)
			.map((t: Todo) => t.id);
		completedIds.forEach((id: number) => lux.dispatch("removeTodo", id));
	}
});
