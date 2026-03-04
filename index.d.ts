import * as React from "react";

// -- Handler types --

/** A plain handler function invoked when an action is dispatched. Called with the Store as `this`. */
type ActionHandler = (this: Store, ...args: any[]) => boolean | void;

/** Handler with dependency coordination. */
interface ActionHandlerConfig {
	handler: ActionHandler;
	/** Store namespaces that must handle this action first. */
	waitFor?: string[];
}

type HandlerDef = ActionHandler | ActionHandlerConfig;

// -- Store --

interface StoreOptions {
	/** Unique identifier for this store. */
	namespace: string;
	/** Map of action names to handler definitions. */
	handlers: Record<string, HandlerDef>;
	/** Initial state object. */
	state?: Record<string, any>;
	/** Additional properties/methods are copied onto the store instance. */
	[key: string]: any;
}

declare class Store {
	constructor(...options: StoreOptions[]);
	namespace: string;
	hasChanged: boolean;
	/** Returns the current state object. */
	getState(): Record<string, any>;
	/** Merges new state. Only callable during a dispatch cycle. */
	setState(newState: Record<string, any>): void;
	/** Replaces entire state. Only callable during a dispatch cycle. */
	replaceState(newState: Record<string, any>): void;
	/** Flushes pending change notifications. */
	flush(): void;
	/** Removes this store and cleans up all subscriptions. */
	dispose(): void;
	/** Cleans up mixin subscriptions. */
	luxCleanup(): void;
	[key: string]: any;
}

// -- Mixin types --

interface MixinDef {
	setup: (this: any) => void;
	teardown?: (this: any) => void;
	mixin?: Record<string, any>;
}

interface MixinFunction {
	(context: any, ...mixins: Array<MixinDef | (() => MixinDef)>): any;
	store: MixinDef;
	actionCreator: MixinDef;
	actionListener: (options?: ActionListenerOptions) => MixinDef;
}

interface ActionListenerOptions {
	handlers?: Record<string, (...args: any[]) => void>;
	handlerFn?: (data: { actionType: string; actionArgs: any[] }) => void;
	context?: any;
	channel?: any;
	topic?: string;
}

interface ReactMixin {
	actionCreator: {
		componentWillMount: () => void;
		dispatch: (action: string, ...args: any[]) => void;
	};
	store: {
		componentWillMount: () => void;
		componentWillUnmount: () => void;
	};
}

// -- luxWrapper --

interface LuxWrapperActions {
	/**
	 * Maps prop names to action dispatchers.
	 * - string value: auto-creates a handler that strips React synthetic events
	 * - function value: used directly as the handler
	 */
	[propName: string]: string | ((...args: any[]) => void);
}

interface LuxWrapperOptions<P = any> {
	/** Map of prop names to action names or handler functions. */
	actions?: LuxWrapperActions;
	/** Store namespaces to subscribe to for state changes. */
	stores?: string[];
	/** Derives component state from props and store change data. */
	getState?: (props: P, storeChanges: Record<string, boolean>) => Partial<P>;
	/** Use React.PureComponent instead of React.Component. Defaults to false. */
	pureComponent?: boolean;
	componentWillMount?: (...args: any[]) => void;
	componentDidMount?: (...args: any[]) => void;
	componentWillReceiveProps?: (...args: any[]) => void;
	componentWillUpdate?: (...args: any[]) => void;
	componentDidUpdate?: (...args: any[]) => void;
	componentWillUnmount?: (...args: any[]) => void;
}

// -- Utils --

interface LuxUtils {
	/** Logs a table of all registered actions and their associated stores. */
	printActions(): void;
	/** Logs the store dependency tree for the given action type(s). */
	printStoreDepTree(actionType?: string | string[]): void;
}

// -- Main export --

interface Lux {
	/** Registry of action creator functions, keyed by action name. */
	actions: Record<string, (...args: any[]) => void>;
	/** Register custom action creator functions. */
	customActionCreator(action: Record<string, (...args: any[]) => void>): void;
	/** Dispatch a named action with arguments. */
	dispatch(action: string, ...args: any[]): void;
	/**
	 * @deprecated Use `dispatch` instead.
	 */
	publishAction(action: string, ...args: any[]): void;
	/** The internal dispatcher instance (machina.BehavioralFsm). */
	dispatcher: any;
	/**
	 * @deprecated
	 * Retrieve a group of actions by group name.
	 */
	getActionGroup(group: string): Record<string, (...args: any[]) => void>;

	// Mixin functions
	actionCreatorListener(target: any): any;
	actionCreator(target: any): any;
	actionListener(target: any): any;
	mixin: MixinFunction;
	reactMixin: ReactMixin;

	// Store
	removeStore(namespace: string): void;
	Store: typeof Store;
	/** Registry of all created store instances, keyed by namespace. */
	stores: Record<string, Store>;

	// Utilities
	utils: LuxUtils;

	/** Higher-order component that wires a React component to lux stores and actions. */
	luxWrapper<
		P extends React.ComponentType<any>,
		T extends LuxWrapperOptions<React.ComponentPropsWithoutRef<P>> = LuxWrapperOptions<React.ComponentPropsWithoutRef<P>>
	>(
		Component: P,
		options: T
	): React.ComponentType<
		Omit<
			React.ComponentPropsWithoutRef<P>,
			keyof (T["getState"] extends (...args: any[]) => infer R ? R : {}) | keyof (T["actions"] extends object ? T["actions"] : {})
		> &
		Partial<
			Pick<
				React.ComponentPropsWithoutRef<P>,
				keyof (T["getState"] extends (...args: any[]) => infer R ? R : {}) & keyof React.ComponentPropsWithoutRef<P> |
				keyof (T["actions"] extends object ? T["actions"] : {}) & keyof React.ComponentPropsWithoutRef<P>
			>
		>
	>;
}

declare const lux: Lux;
export default lux;

export {
	Store,
	StoreOptions,
	HandlerDef,
	ActionHandler,
	ActionHandlerConfig,
	MixinDef,
	MixinFunction,
	ActionListenerOptions,
	ReactMixin,
	LuxWrapperOptions,
	LuxWrapperActions,
	LuxUtils,
	Lux,
};
