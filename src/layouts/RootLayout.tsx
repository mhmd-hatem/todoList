import React, { useEffect, useRef, useState } from "react";
import {
	DatePicker,
	DateValue,
	Navbar,
	NavbarBrand,
	NavbarContent,
	Switch,
} from "@nextui-org/react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { getLocalTimeZone, today } from "@internationalized/date";
import useTodoStore from "../hooks/useTodosStore.store";

export default function RootLayout({
	children,
	isDark,
	toggleDarkMode,
}: {
	readonly children?: (
		selectedDate: string,
	) => React.ReactNode | React.ReactNode[];
	readonly isDark: boolean;
	readonly toggleDarkMode: () => void;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
	const { days } = useTodoStore();
	const thumbRef = useRef<HTMLDivElement>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [clientHeight, setClientHeight] = useState(0);

	useEffect(() => {
		const content = containerRef.current;

		if (content) {
			setScrollHeight(content.scrollHeight);
			setClientHeight(content.clientHeight);

			const handleScroll = () => {
				setScrollTop(content.scrollTop);
			};
			content.addEventListener("scroll", handleScroll);
			return () => content.removeEventListener("scroll", handleScroll);
		}
	});

	const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
	const thumbTop = (scrollTop / scrollHeight) * clientHeight;

	return (
		<div className="min-h-screen max-h-screen flex flex-col dark:bg-slate-950 bg-slate-200 transition-colors duration-1000">
			<div>
				<Navbar
					position="sticky"
					isBlurred
					height={"96px"}
					classNames={{
						wrapper: "max-w-none",
						base: "shadow-xl shadow-gray-300 dark:shadow-black",
					}}>
					<NavbarBrand>
						<p className="font-bold text-inherit dark:text-white">Todos</p>
					</NavbarBrand>
					<NavbarContent>
						<DatePicker
							label="Calendar"
							value={date}
							color="primary"
							onChange={setDate}
							size="lg"
							classNames={{
								selectorIcon: "text-2xl",
								base: "font-semibold !text-6xl text-center",
							}}
						/>
					</NavbarContent>
					<NavbarContent justify="end">
						<Switch
							aria-label="Dark Mode"
							size="lg"
							classNames={{
								wrapper: `group-data-[selected=true]:bg-blue-950 bg-sky-300`,
								endContent: "text-amber-300",
							}}
							endContent={<FaSun />}
							startContent={<BsMoonStarsFill />}
							isSelected={isDark}
							onChange={toggleDarkMode}
						/>
					</NavbarContent>
				</Navbar>
			</div>

			<div className="max-h-[calc(100vh-124px)] min-h-[calc(100vh-124px)] h-[calc(100vh-124px)] overflow-hidden relative">
				<div
					ref={containerRef}
					className="max-h-[calc(100vh-124px)] min-h-[calc(100vh-124px)] py-[3rem] custom-scrollbar">
					{children?.(date.toString())}
				</div>
				<div
					className={`absolute right-0 top-0 w-1.5 h-full ${
						scrollHeight === clientHeight ? "opacity-0" : "opacity-100"
					}`}>
					<div
						ref={thumbRef}
						className="w-full absolute  bg-primary-200 cursor-pointer"
						style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}></div>
				</div>
			</div>

			<div className="h-[28px] min-h-[28px] mt-auto max-h-[28px] justify-between w-full dark:bg-green-700 bg-lime-600 transition-colors duration-400 flex ">
				<span className="text-center h-full text-white font-bold font-jetbrains bg-inherit hover:brightness-125 transition-all duration-200 cursor-pointer flex select-none items-center justify-center px-4">
					Jane Doe
				</span>
				<a
					href="https://meta-bytes.net/"
					target="_blank"
					className="text-center h-full text-white font-bold bg-[rgb(32_99_173)] hover:brightness-125 font-inter flex items-center justify-center transition-all select-none duration-200 cursor-pointer px-4">
					Meta Bytes
				</a>
			</div>
		</div>
	);
}
