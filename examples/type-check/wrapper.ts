import * as React from "react";
import lux, { LuxWrapperOptions, LuxWrapperActions } from "lux.js";

// -- A simple component to wrap --
interface CounterProps {
	count: number;
	onIncrement: () => void;
}

class Counter extends React.Component<CounterProps> {
	render() {
		return React.createElement("div", null, this.props.count);
	}
}

// -- luxWrapper with all options --
const WrappedFull: React.ComponentType<any> = lux.luxWrapper(Counter, {
	actions: {
		onIncrement: "increment",
		onDecrement: "decrement",
		onCustom(value: string) {
			lux.dispatch("customAction", value);
		}
	},
	stores: ["counterStore"],
	getState(props, storeChanges) {
		return { count: 0 };
	},
	pureComponent: true,
	componentWillMount() {},
	componentDidMount() {},
	componentWillReceiveProps() {},
	componentWillUpdate() {},
	componentDidUpdate() {},
	componentWillUnmount() {}
});

// -- luxWrapper with minimal options --
const WrappedMinimal: React.ComponentType<any> = lux.luxWrapper(Counter, {
	stores: ["counterStore"],
	getState(props) {
		return { count: 0 };
	}
});

// -- luxWrapper with actions only --
const WrappedActions: React.ComponentType<any> = lux.luxWrapper(Counter, {
	actions: {
		onIncrement: "increment"
	}
});

// -- LuxWrapperActions shape --
const actionMap: LuxWrapperActions = {
	onClick: "doSomething",
	onCustom(e: any) {
		console.log(e);
	}
};

// -- LuxWrapperOptions shape --
const options: LuxWrapperOptions = {
	actions: actionMap,
	stores: ["store1", "store2"],
	getState: (props, changes) => ({ merged: true }),
	pureComponent: false
};
