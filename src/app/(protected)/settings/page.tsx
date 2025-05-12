"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileSetting from "./_components/profile-setting";
import NodgeTabs from "@/components/shared/nodge-tabs";
import AppearanceSetting from "./_components/appearance-setting";

const SettingPage = () => {
	const searchQuery = useSearchParams();
	const router = useRouter();
	return (
		<main className="w-full h-full flex flex-col gap-3 p-3">
			<NodgeTabs
				tabs={[
					{
						label: "Profile",
						trigger: (
							<span
								className="text-sm"
								onClick={() =>
									router.push(`/settings?tab=Profile`)
								}
							>
								Profile
							</span>
						),
						content: <ProfileSetting />,
					},
					{
						label: "Appearance",
						trigger: (
							<span
								className="text-sm"
								onClick={() =>
									router.push(`/settings?tab=Appearance`)
								}
							>
								Appearance
							</span>
						),
						content: <AppearanceSetting />,
					},
				]}
				defaultValue={searchQuery.get("tab") || "Profile"}
			/>
		</main>
	);
};

export default SettingPage;
