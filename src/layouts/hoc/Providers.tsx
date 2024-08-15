import { NextUIProvider } from "@nextui-org/react";
import React from "react";

interface Props {
	children: React.ReactNode | React.ReactNode[];
}

export default function Providers({ children }: Readonly<Props>) {
	return <NextUIProvider>{children}</NextUIProvider>;
}
