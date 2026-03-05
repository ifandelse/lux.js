import lux from "lux.js";

export interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

export interface TodoState {
	todos: Todo[];
	nextId: number;
}

const todoStore = new lux.Store({
	namespace: "todo",
	handlers: {
		addTodo(text: string) {
			const state = this.getState() as TodoState;
			this.setState({
				todos: [...state.todos, { id: state.nextId, text, completed: false }],
				nextId: state.nextId + 1
			});
		},
		toggleTodo(id: number) {
			const state = this.getState() as TodoState;
			this.setState({
				todos: state.todos.map((t: Todo) =>
					t.id === id ? { ...t, completed: !t.completed } : t
				)
			});
		},
		removeTodo(id: number) {
			const state = this.getState() as TodoState;
			this.setState({
				todos: state.todos.filter((t: Todo) => t.id !== id)
			});
		},
		todosLoaded(todos: Todo[]) {
			// replaceState to fully swap in loaded data
			this.replaceState({
				todos,
				nextId: todos.length > 0
					? Math.max(...todos.map((t: Todo) => t.id)) + 1
					: 1
			});
		}
	},
	state: { todos: [], nextId: 1 } as TodoState
});

export default todoStore;
