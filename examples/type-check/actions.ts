import lux from "lux.js";

// -- Actions registry --
const allActions: Record<string, (...args: any[]) => void> = lux.actions;

// -- Dispatch --
lux.dispatch("doSomething", "hello", 42);

// -- Custom action creator --
lux.customActionCreator({
	myCustomAction(value: string) {
		console.log("custom:", value);
	}
});

// -- Deprecated: publishAction --
lux.publishAction("doSomething", "via deprecated");

// -- Deprecated: getActionGroup --
const group: Record<string, (...args: any[]) => void> = lux.getActionGroup("someGroup");

// -- Dispatcher (typed as any for now) --
const dispatcher: any = lux.dispatcher;
