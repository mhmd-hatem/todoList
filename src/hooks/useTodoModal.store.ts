import todoModalSlice, { TodoModalSlice } from "./../context/todoModalSlice";
import { create } from "zustand";

const useTodoModalStore = create<TodoModalSlice>()((...all) => ({
	...todoModalSlice(...all),
}));

export default useTodoModalStore;
