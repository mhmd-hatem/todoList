import {
	Button,
	Input,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Textarea,
} from "@nextui-org/react";
import { useLayoutEffect, useState } from "react";
import { HiClipboardCheck, HiX } from "react-icons/hi";

interface Props {
	todo: Todo;
	onClose: (...args: unknown[]) => void;
	markDone: (...args: unknown[]) => void;
	onUpdateTodo: (todo: Todo) => void;
	onDeleteTodo: () => void;
}

export default function TodoDetails({ todo, onUpdateTodo }: Readonly<Props>) {
	const [title, setTitle] = useState(todo.title);
	const [desc, setDesc] = useState(todo.description);
	const [isDone, setIsDone] = useState(todo.completed);

	useLayoutEffect(() => {
		setTitle(todo.title);
		setDesc(todo.description);
		setIsDone(todo.completed);
	}, [todo]);

	return (
		<>
			<ModalHeader>
				<Input
					label="Title"
					classNames={{ base: "w-[95%]" }}
					placeholder="New Todo"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onFocusChange={(isFocused) => {
						if (!isFocused) {
							onUpdateTodo({
								...todo,
								title,
								description: desc,
								completed: isDone,
							});
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onUpdateTodo({
								...todo,
								title,
								description: desc,
								completed: isDone,
							});
						}
					}}
				/>
			</ModalHeader>
			<ModalBody>
				<Textarea
					label="Description"
					placeholder=""
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onUpdateTodo({
								...todo,
								title,
								description: desc,
								completed: isDone,
							});
						}
					}}
					onFocusChange={(isFocused) => {
						if (!isFocused) {
							onUpdateTodo({
								...todo,
								title,
								description: desc,
								completed: isDone,
							});
						}
					}}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					className="w-fit p-0 text-white relative text-2xl"
					color={isDone ? "warning" : "success"}
					onPress={() => {
						onUpdateTodo({
							...todo,
							title,
							description: desc,
							completed: isDone,
						});
						setIsDone((prev) => !prev);
					}}>
					<HiX
						className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
							isDone ? "opacity-100" : "opacity-0"
						}`}
					/>
					<HiClipboardCheck
						className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
							isDone ? "opacity-0" : "opacity-100"
						}`}
					/>
				</Button>
			</ModalFooter>
		</>
	);
}
