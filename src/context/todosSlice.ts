import { StateCreator } from "zustand";

export interface TodoSlice {
	days: Record<string, Record<string, List>>;
	addList: (date: string, listTitle?: string) => void;
	removeList: (date: string, listId: number) => void;
	updateList: (date: string, listId: number, list: List) => void;
	addTodo: (date: string, listId: number, todo: Todo) => void;
	deleteTodo: (date: string, listId: number, todo: Todo) => void;
	updateTodo: (date: string, listId: number, todo: Todo) => void;
}

const todosSlice: StateCreator<TodoSlice> = (set) => ({
	days: {},
	addList: (date: string, listTitle?: string) => {
		set((state) => {
			if (!state.days[date]) {
				state.days[date] = {};
			}
			const newList = {
				id: Date.now(),
				title: listTitle ?? "New List",
				todos: [],
			};
			state.days[date][newList.id] = newList;

			return { ...state, days: { ...state.days } };
		});
	},
	removeList: (date: string, listId: number) => {
		set((state) => {
			if (!state.days[date]) {
				throw new Error("Date not found");
			}

			delete state.days[date][listId];

			return { ...state, days: { ...state.days } };
		});
	},
	updateList: (date: string, listId: number, list: List) => {
		set((state) => {
			if (!state.days[date]) {
				throw new Error("Date not found");
			}

			state.days[date][listId] = { ...list };

			return { ...state, days: { ...state.days } };
		});
	},
	addTodo: (date: string, listId: number, todo: Todo) => {
		set((state) => {
			if (!state.days[date]) {
				state.days[date] = {};
			}

			if (!state.days[date][listId]) {
				throw new Error("List not found");
			}

			state.days[date][listId].todos.push(todo);

			return {
				...state,
				days: {
					...state.days,
					[date]: {
						...state.days[date],
						[listId]: {
							...state.days[date][listId],
							todos: [...state.days[date][listId].todos],
						},
					},
				},
			};
		});
	},
	deleteTodo: (date: string, listId: number, todo: Todo) => {
		set((state) => {
			if (!state.days[date]) {
				throw new Error("Date not found");
			}

			if (!state.days[date][listId]) {
				throw new Error("List not found");
			}

			state.days[date][listId].todos = state.days[date][listId].todos.filter(
				(t) => t.id !== todo.id,
			);

			return {
				...state,
				days: {
					...state.days,
					[date]: {
						...state.days[date],
						[listId]: {
							...state.days[date][listId],
							todos: [...state.days[date][listId].todos],
						},
					},
				},
			};
		});
	},
	updateTodo: (date: string, listId: number, todo: Todo) => {
		set((state) => {
			if (!state.days[date]) {
				throw new Error("Date not found");
			}

			if (!state.days[date][listId]) {
				throw new Error("List not found");
			}

			state.days[date][listId].todos = state.days[date][listId].todos.map((t) =>
				t.id === todo.id ? todo : t,
			);

			return {
				...state,
				days: {
					...state.days,
					[date]: {
						...state.days[date],
						[listId]: {
							...state.days[date][listId],
							todos: [...state.days[date][listId].todos],
						},
					},
				},
			};
		});
	},
});

export default todosSlice;
