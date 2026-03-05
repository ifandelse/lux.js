import lux from "lux.js";
import type { TodoState, Todo } from "./todoStore";

export type FilterValue = "all" | "active" | "completed";

export interface FilterState {
	filter: FilterValue;
	totalCount: number;
	activeCount: number;
	completedCount: number;
}

function computeCounts() {
	const { todos } = lux.stores.todo.getState() as TodoState;
	return {
		totalCount: todos.length,
		activeCount: todos.filter((t: Todo) => !t.completed).length,
		completedCount: todos.filter((t: Todo) => t.completed).length
	};
}

// waitFor ensures todoStore processes each action before we read its state
const filterStore = new lux.Store({
	namespace: "filter",
	handlers: {
		setFilter(filter: FilterValue) {
			this.setState({ filter });
		},
		addTodo: {
			waitFor: ["todo"],
			handler() {
				this.setState(computeCounts());
			}
		},
		toggleTodo: {
			waitFor: ["todo"],
			handler() {
				this.setState(computeCounts());
			}
		},
		removeTodo: {
			waitFor: ["todo"],
			handler() {
				this.setState(computeCounts());
			}
		},
		todosLoaded: {
			waitFor: ["todo"],
			handler() {
				this.setState(computeCounts());
			}
		}
	},
	state: {
		filter: "all",
		totalCount: 0,
		activeCount: 0,
		completedCount: 0
	} as FilterState
});

export default filterStore;
