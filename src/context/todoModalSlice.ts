/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";

export interface TodoModalSlice {
	todo: Todo | null;
	onOpen: () => void;
	onClose: () => void;
	setTodo: (todo: Todo | null) => void;
	callbacks: {
		markDone?: (...args: any[]) => unknown;
		deleteTodo?: (...args: any[]) => unknown;
		updateTodo?: (...args: any[]) => unknown;
	};
	setCallbacks: (callbacks: {
		markDone?: (...args: any[]) => unknown;
		deleteTodo?: (...args: any[]) => unknown;
		updateTodo?: (...args: any[]) => unknown;
	}) => void;
	setOnOpen: (callback: (...args: unknown[]) => unknown) => void;
	setOnClose: (callback: (...args: unknown[]) => unknown) => void;
}

const todoModalSlice: StateCreator<TodoModalSlice> = (set) => ({
	todo: null,
	onOpen: () => {},
	onClose: () => {},
	setTodo: (todo: Todo | null) => set({ todo }),
	callbacks: {},
	setCallbacks: (callbacks: {
		markDone?: (...args: unknown[]) => unknown;
		deleteTodo?: (...args: unknown[]) => unknown;
		updateTodo?: (...args: unknown[]) => unknown;
	}) =>
		set((state) => ({
			...state,
			callbacks: { ...state.callbacks, ...callbacks },
		})),
	setOnOpen: (callback: (...args: unknown[]) => unknown) =>
		set({ onOpen: callback }),
	setOnClose: (callback: (...args: unknown[]) => unknown) =>
		set({ onClose: callback }),
});

export default todoModalSlice;
