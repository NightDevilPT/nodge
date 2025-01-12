import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

import { config } from "@/components/config";
import NodgeDynamicLayout from "@/components/shared/dynamic-layout";

const Layout = async ({ children }: { children: ReactNode }) => {
	const cookieStore = await cookies();
	const authToken = cookieStore.get("auth_token")?.value;

	if (!authToken) {
		redirect("/auth/login");
	}

	const tokenValue = jwt.verify(authToken, config.jwtSecret as string) as {
		id: string;
		username?: string;
	};
	if (!tokenValue?.id) {
		redirect("/auth/login");
	}
	return <NodgeDynamicLayout>{children}</NodgeDynamicLayout>;
};

export default Layout;
