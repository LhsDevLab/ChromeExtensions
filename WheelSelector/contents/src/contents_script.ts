import { MouseWheelSelector, SelectorItem } from "@lhs7/wheel-selector";

const items: SelectorItem[] = [
	{
		name: "1",
		callBack: () => {
			alert("1");
		},
	},
	{
		name: "2",
		callBack: () => {
			alert("2");
		},
	},
	{
		name: "3",
		callBack: () => {
			alert("3");
		},
	},
	{
		name: "4",
		callBack: () => {
			alert("4");
		},
	},
];

const wheelSelector = new MouseWheelSelector(document, { items: items });
