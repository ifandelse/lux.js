import lux, { MixinDef, MixinFunction, ActionListenerOptions, ReactMixin } from "lux.js";

// -- mixin() with default mixins (store + actionCreator) --
const target1 = {
	stores: {
		listenTo: ["myStore"],
		onChange() {}
	},
	getActions: ["doSomething"]
};
lux.mixin(target1);

// -- mixin() with explicit mixins --
const target2 = { getActions: ["doSomething"] };
lux.mixin(target2, lux.mixin.actionCreator);

// -- mixin.store --
const storeMixin: MixinDef = lux.mixin.store;

// -- mixin.actionCreator --
const acMixin: MixinDef = lux.mixin.actionCreator;

// -- mixin.actionListener with options --
const alMixin: MixinDef = lux.mixin.actionListener({
	handlers: {
		doSomething(value: string) {
			console.log(value);
		}
	}
});

// -- actionCreator helper --
const acTarget = lux.actionCreator({ getActions: ["doSomething"] });

// -- actionListener helper --
const alTarget = lux.actionListener({
	handlers: {
		doSomething() {}
	}
});

// -- actionCreatorListener helper --
const aclTarget = lux.actionCreatorListener({
	getActions: ["doSomething"],
	handlers: {
		doSomething() {}
	}
});

// -- reactMixin --
const reactMixin: ReactMixin = lux.reactMixin;
const acReact = reactMixin.actionCreator;
const storeReact = reactMixin.store;
acReact.dispatch("doSomething", "arg");

// -- MixinDef shape --
const customMixin: MixinDef = {
	setup() {},
	teardown() {},
	mixin: { foo: "bar" }
};

// -- ActionListenerOptions shape --
const listenerOpts: ActionListenerOptions = {
	handlers: { doSomething() {} },
	handlerFn(data) {
		console.log(data.actionType, data.actionArgs);
	},
	context: {},
	topic: "execute.*"
};
