import { useMemo } from "react";
import useTodoStore from "../hooks/useTodosStore.store";
import TodoList from "../features/TodoLists/TodoList";
import { Button } from "@nextui-org/react";
import { RiAddCircleLine, RiAddCircleFill } from "react-icons/ri";
interface TodoListsProps {
	dateString: string;
}

export default function TodoLists({ dateString }: Readonly<TodoListsProps>) {
	const { days, removeList, updateList, addList } = useTodoStore();

	const todoLists = useMemo(() => days[dateString], [days, dateString]);

	return (
		<div className="h-full flex flex-col md:flex-row flex-wrap px-10 gap-6 md:justify-around">
			{todoLists &&
				Object.values(todoLists).map((list) => (
					<TodoList
						key={list.id}
						list={list}
						date={dateString}
						handleReorder={(todos) =>
							updateList(dateString, list.id, { ...list, todos })
						}
						onRemoveList={() => removeList(dateString, list.id)}
						handleTitleChange={(title) =>
							updateList(dateString, list.id, { ...list, title })
						}
					/>
				))}
			<Button
				variant="ghost"
				color="primary"
				onPress={() => addList(dateString)}
				className="h-[40px] w-[80vw] lg:w-[50vw] xl:w-[40vw] text-3xl relative group my-3">
				<RiAddCircleLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition-opacity" />
				<RiAddCircleFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
			</Button>
		</div>
	);
}
