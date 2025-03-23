import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

import { config } from "@/components/config";
import NodgeDynamicLayout from "@/components/shared/dynamic-layout";

const Layout = async ({ children }: { children: ReactNode }) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	// const refreshToken = cookieStore.get("refreshToken")?.value;

	if (!accessToken ) {
		redirect("/auth/login");
	}

	const tokenValue = jwt.verify(accessToken, config.jwtSecret as string) as {
		userId: string;
		username?: string;
	};

	if (!tokenValue?.userId) {
		redirect("/auth/login");
	}
	return <NodgeDynamicLayout>{children}</NodgeDynamicLayout>;
};

export default Layout;
