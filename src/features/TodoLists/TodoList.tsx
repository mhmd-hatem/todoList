import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
	Input,
} from "@nextui-org/react";
import { HiClipboardCheck, HiX } from "react-icons/hi";
import { useLayoutEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { HiTrash } from "react-icons/hi2";
import useTodoStore from "../../hooks/useTodosStore.store";
import useTodoModalStore from "../../hooks/useTodoModal.store";
import { RiAddCircleLine, RiAddCircleFill } from "react-icons/ri";

interface TodoListProps {
	date: string;
	list: List;
	handleTitleChange: (title: string) => void;
	onRemoveList: () => void;
	handleReorder: (todos: Todo[]) => void;
}

export default function TodoList({
	date,
	list,
	handleTitleChange,
	onRemoveList,
	handleReorder,
}: Readonly<TodoListProps>) {
	const { addTodo, deleteTodo, updateTodo } = useTodoStore();
	const { setCallbacks, onOpen, setTodo } = useTodoModalStore();

	const [title, setTitle] = useState(list.title);
	const [isEditing, setIsEditing] = useState(list.title.length === 0);
	const [isDragging, setIsDragging] = useState(false);

	useLayoutEffect(() => {
		setTitle(list.title);
	}, [list]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="w-[80vw] lg:w-[50vw] xl:w-[40vw]">
			<Card classNames={{ base: "bg-slate-900" }}>
				<CardHeader className="flex gap-2">
					{isEditing ? (
						<Input
							variant="underlined"
							label="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setIsEditing(false);
									handleTitleChange(title);
								}
							}}
							onFocusChange={(isFocused) => {
								if (!isFocused) {
									setIsEditing(false);
									handleTitleChange(title);
								}
							}}
						/>
					) : (
						<Button
							variant="faded"
							className="w-full text-left"
							onPress={() => setIsEditing(true)}>
							{list.title}
						</Button>
					)}
					<Button
						color="danger"
						variant="ghost"
						className=" text-2xl"
						onPress={onRemoveList}>
						<HiTrash />
					</Button>
				</CardHeader>
				<CardBody className="flex flex-col gap-2 items-center">
					<Reorder.Group
						values={list.todos}
						onReorder={handleReorder}
						axis="y"
						className="flex flex-col gap-2 w-full">
						{list.todos.map((todo) => (
							<Reorder.Item
								value={todo}
								key={todo.id}
								onDragStart={() => setIsDragging(true)}
								onDragEnd={() => setIsDragging(false)}
								className="flex gap-10 justify-between">
								<Button
									className={`flex-1 justify-start  ${
										todo.completed ? "skew-x-6 line-through" : "skew-x-0"
									} transition-all duration-300`}
									color={todo.completed ? "success" : "default"}
									onPress={() => {
										if (isDragging) return;
										setTodo(todo);
										onOpen();
										setCallbacks({
											markDone: () => {
												updateTodo(date, list.id, todo);
											},
											deleteTodo: () => {
												deleteTodo(date, list.id, todo);
												setTodo(null);
											},
											updateTodo: (updatedTodo) => {
												updateTodo(date, list.id, updatedTodo);
											},
										});
									}}>
									{todo.title}
								</Button>
								<ButtonGroup>
									<Button
										color={todo.completed ? "warning" : "success"}
										className="relative text-2xl"
										onClick={() =>
											updateTodo(date, list.id, {
												...todo,
												completed: !todo.completed,
											})
										}>
										<HiX
											className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
												todo.completed ? "opacity-100" : "opacity-0"
											}`}
										/>
										<HiClipboardCheck
											className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
												todo.completed ? "opacity-0" : "opacity-100"
											}`}
										/>
									</Button>
									<Button
										className="text-2xl w-1/2"
										onClick={() => {
											deleteTodo(date, list.id, todo);
										}}>
										<HiTrash />
									</Button>
								</ButtonGroup>
							</Reorder.Item>
						))}
					</Reorder.Group>
					<div className="w-full flex">
						<Button
							className="mx-auto group w-6/10 text-2xl"
							color="primary"
							onPress={() => {
								const newTodo = {
									id: Date.now(),
									title: "New Todo",
									description: "",
									completed: false,
								};
								addTodo(date, list.id, newTodo);
								setTodo(newTodo);
								setCallbacks({
									markDone: () => {
										updateTodo(date, list.id, {
											...newTodo,
											completed: !newTodo.completed,
										});
									},
									deleteTodo: () => {
										deleteTodo(date, list.id, newTodo);
										setTodo(null);
									},
									updateTodo: (updatedTodo: Todo) => {
										updateTodo(date, list.id, { ...updatedTodo });
									},
								});
								onOpen();
							}}>
							<RiAddCircleLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition-opacity !duration-250" />
							<RiAddCircleFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity !duration-250" />
						</Button>
					</div>
				</CardBody>
			</Card>
		</motion.div>
	);
}
