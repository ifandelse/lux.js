import lux, { Store, StoreOptions, ActionHandler, ActionHandlerConfig, HandlerDef } from "lux.js";

// -- Store constructor with single options object --
const basicStore = new lux.Store({
	namespace: "basic",
	handlers: {
		doSomething(value: string) {
			this.setState({ value });
		}
	},
	state: { value: "" }
});

// -- Store constructor with handler config (waitFor) --
const dependentStore = new lux.Store({
	namespace: "dependent",
	handlers: {
		doSomething: {
			handler(value: string, deps: Record<string, any>) {
				this.setState({ value, basic: deps.basic });
				return true;
			},
			waitFor: ["basic"]
		}
	}
});

// -- Store constructor with multiple option objects (merge) --
const mergedStore = new lux.Store(
	{
		namespace: "merged",
		handlers: {
			actionOne() {
				this.setState({ one: true });
			}
		},
		state: { one: false, two: false }
	},
	{
		namespace: "merged",
		handlers: {
			actionTwo() {
				this.setState({ two: true });
			}
		}
	}
);

// -- Instance methods --
const state: Record<string, any> = basicStore.getState();
basicStore.flush();
basicStore.dispose();

// -- Properties --
const ns: string = dependentStore.namespace;
const changed: boolean = dependentStore.hasChanged;

// -- Custom methods on store --
const storeWithCustom = new lux.Store({
	namespace: "custom",
	handlers: {
		update() { return false; }
	},
	myCustomMethod() {
		return this.getState();
	}
});
storeWithCustom.myCustomMethod();

// -- Handler returning false (no change) --
const noChangeStore = new lux.Store({
	namespace: "nochange",
	handlers: {
		noop(): boolean {
			return false;
		}
	}
});

// -- Store registry and removeStore --
const allStores: Record<string, Store> = lux.stores;
lux.removeStore("nochange");

// -- Type aliases are usable --
const handler: ActionHandler = () => {};
const handlerConfig: ActionHandlerConfig = { handler: () => true, waitFor: ["other"] };
const handlerDef: HandlerDef = handlerConfig;
const opts: StoreOptions = { namespace: "test", handlers: { x: handler } };
