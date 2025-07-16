"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/shared/nodge-language-switcher";

const NotFoundPage = () => {
	const router = useRouter();
	const { t } = useTranslation();

	return (
		<div
			className={`w-full h-screen bg-gradient-to-tr text-white flex flex-col justify-center items-center space-y-6 relative`}
		>
			<div className="absolute right-5 top-5">
				<LanguageSwitcher />
			</div>
			<div className="text-center">
				<h1
					className={`text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400 animate-pulse`}
				>
					404
				</h1>
				<p className={`text-2xl mt-4 text-gray-500`}>
					{t('notFoundPage.oopsWeCantSeemToFindThatPage')}
				</p>
				<span className={`text-sm text-gray-500`}>
					{t('notFoundPage.theResourceYouAreTringToAccessIsUnavailable')}
				</span>
			</div>

			{/* Back to Home Button */}
			<Button
				onClick={() => router.push("/")}
				className={`flex items-center rounded-md bg-gradient-to-r from-primary to-green-400 text-white dark:text-secondary font-semibold hover:scale-105 transition-transform`}
			>
				<FiHome size={20} />
				<span>{t('notFoundPage.goBackHome')}</span>
			</Button>
		</div>
	);
};

export default NotFoundPage;
