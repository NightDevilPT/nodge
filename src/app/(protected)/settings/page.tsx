import NodgeTabs from "@/components/shared/nodge-tabs";
import { Button } from "@/components/ui/button";
import React from "react";
import ProfileSetting from "./_components/profile";
import LayoutSetting from "./_components/layout";

const page = () => {
	const tabsData = [
		{
			trigger: "Profile",
			content: <div>Profile settings</div>,
			label: "profile",
		},
		{
			trigger: "Layout",
			content: <LayoutSetting />,
			label: "layout",
		},
	];

	return (
		<main className="w-full h-full p-3">
			<NodgeTabs tabs={tabsData} defaultValue="profile" />
		</main>
	);
};

export default page;
