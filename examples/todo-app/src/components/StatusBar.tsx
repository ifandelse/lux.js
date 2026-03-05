import React from "react";
import lux from "lux.js";
import type { TodoState, Todo } from "../stores/todoStore";
import type { FilterState, FilterValue } from "../stores/filterStore";

interface StatusBarState {
	activeCount: number;
	completedCount: number;
	filter: FilterValue;
}

// Class component using lux.mixin — demonstrates the mixin pattern
// alongside luxWrapper functional components elsewhere in the app.
class StatusBar extends React.Component<Record<string, never>, StatusBarState> {
	// Mixin-injected methods. `declare` tells TS these exist at runtime
	// without generating assignment code that would overwrite the injection.
	declare setFilter: (filter: FilterValue) => void;
	declare clearCompleted: () => void;

	constructor(props: Record<string, never>) {
		super(props);

		// Store mixin config: which stores to listen to and what to do on change.
		// Must be set BEFORE lux.mixin() because storeMixin.setup reads this.stores.
		(this as any).stores = {
			listenTo: ["todo", "filter"],
			onChange: () => {
				this.setState(this.getStateFromStores());
			}
		};

		// Action creator mixin config: injects these as methods on `this`.
		(this as any).getActions = ["setFilter", "clearCompleted"];

		// Apply both mixins. Both are objects, NOT functions.
		lux.mixin(this, lux.mixin.store, lux.mixin.actionCreator);

		this.state = this.getStateFromStores();
	}

	getStateFromStores(): StatusBarState {
		const { todos } = lux.stores.todo.getState() as TodoState;
		const { filter } = lux.stores.filter.getState() as FilterState;
		return {
			activeCount: todos.filter((t: Todo) => !t.completed).length,
			completedCount: todos.filter((t: Todo) => t.completed).length,
			filter
		};
	}

	componentWillUnmount() {
		// Clean up mixin subscriptions
		if ((this as any).__lux?.cleanup) {
			(this as any).__lux.cleanup();
		}
	}

	render() {
		const { activeCount, completedCount, filter } = this.state;
		const filters: FilterValue[] = ["all", "active", "completed"];

		return (
			<div style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				marginTop: "1rem",
				fontSize: "0.9rem",
				color: "#666"
			}}>
				<span>{activeCount} item{activeCount === 1 ? "" : "s"} left</span>
				<div style={{ display: "flex", gap: "0.25rem" }}>
					{filters.map((f) => (
						<button
							key={f}
							onClick={() => this.setFilter(f)}
							style={{
								padding: "0.25rem 0.5rem",
								border: filter === f ? "1px solid #333" : "1px solid transparent",
								background: "none",
								cursor: "pointer",
								borderRadius: "3px"
							}}
						>
							{f.charAt(0).toUpperCase() + f.slice(1)}
						</button>
					))}
				</div>
				{completedCount > 0 && (
					<button
						onClick={() => this.clearCompleted()}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "#cc3333"
						}}
					>
						Clear completed ({completedCount})
					</button>
				)}
			</div>
		);
	}
}

export default StatusBar;
