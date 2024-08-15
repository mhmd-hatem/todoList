import { IonApp, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

import { useEffect, useState } from "react";
import Providers from "./layouts/hoc/Providers";
import RootLayout from "./layouts/RootLayout";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import useTodoModalStore from "./hooks/useTodoModal.store";
import TodoDetails from "./features/TodoModal/TodoDetails";
import TodoLists from "./components/TodoLists";

function App() {
	const [isDark, setIsDark] = useState(true);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		todo,
		setOnOpen,
		setOnClose,
		onClose: onCloseModal,
		callbacks: { markDone, deleteTodo, updateTodo },
	} = useTodoModalStore();

	const toggleDarkMode = () => {
		setIsDark((prev) => !prev);
	};

	useEffect(() => {
		document.body.classList.toggle("dark", isDark);
	}, [isDark]);

	useEffect(() => {
		setOnOpen(onOpen);
		setOnClose(onClose);
	}, [onOpen, onClose, setOnOpen, setOnClose]);

	return (
		<IonApp>
			<Providers>
				<RootLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
					{(selectedDate) => <TodoLists dateString={selectedDate} />}
				</RootLayout>
				<Modal isOpen={isOpen} onClose={onCloseModal}>
					<ModalContent>
						{(onClose) => (
							<TodoDetails
								todo={todo!}
								onClose={onClose}
								markDone={markDone!}
								onUpdateTodo={updateTodo!}
								onDeleteTodo={deleteTodo!}
							/>
						)}
					</ModalContent>
				</Modal>
			</Providers>
		</IonApp>
	);
}

export default App;
