// components/providers/i18n-provider.tsx
"use client";

import { useEffect, useState } from "react";
import i18n from "@/lib/config"; // Adjust the import path as necessary
import { I18nextProvider } from "react-i18next";

interface I18nProviderProps {
	children: React.ReactNode;
	lng?: string; // Initial language from server
	availableLanguages?: string[]; // Customizable available languages
}

export function I18nProvider({
	children,
	lng,
	availableLanguages = [
		"de",
		"en",
		"es",
		"fr",
		"hi",
		"it",
		"ja",
		"ko",
		"pt",
		"th",
		"tr",
		"vi",
		"zh",
	],
}: I18nProviderProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined") return;

		setMounted(true);

		// 1. Get saved language from localStorage
		const savedLanguage = localStorage.getItem("i18nextLng");

		// 2. Determine which language to use (priority: saved > server-provided > default)
		const languageToUse =
			savedLanguage && availableLanguages.includes(savedLanguage)
				? savedLanguage
				: lng && availableLanguages.includes(lng)
				? lng
				: i18n.options.lng &&
				  availableLanguages.includes(i18n.options.lng as string)
				? i18n.options.lng
				: "en";

		// 3. Set the language if different from current
		if (languageToUse && i18n.language !== languageToUse) {
			i18n.changeLanguage(languageToUse)
				.then(() => {
					// 4. Save to localStorage after successful change
					localStorage.setItem("i18nextLng", languageToUse);
				})
				.catch((error) => {
					console.error("Failed to change language:", error);
				});
		}

		// 5. Set up listener for future language changes
		const handleLanguageChange = (newLang: string) => {
			localStorage.setItem("i18nextLng", newLang);
		};

		i18n.on("languageChanged", handleLanguageChange);

		// Cleanup listener on unmount
		return () => {
			i18n.off("languageChanged", handleLanguageChange);
		};
	}, [lng, availableLanguages]);

	// Prevent hydration mismatch
	if (!mounted) {
		return null;
	}

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
