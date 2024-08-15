import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import todosSlice, { TodoSlice } from "../context/todosSlice";

const useTodoStore = create<TodoSlice>()(
	persist<TodoSlice>(
		(...all) => ({
			...todosSlice(...all),
		}),
		{
			name: "todos-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useTodoStore;
