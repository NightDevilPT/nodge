import { FiKey } from "react-icons/fi"; // Add appropriate icons
import { GoHomeFill } from "react-icons/go";
import { FiHome, FiSettings } from "react-icons/fi";
import { MdSettings, MdVpnKey } from "react-icons/md"; // Add filled icon for credentials
import { FaShareNodes, FaSquareShareNodes } from "react-icons/fa6";
import { NodeSidebarRouteProps } from "@/interface/route.interface";

export const nodgeSidebarRoute: NodeSidebarRouteProps[] = [
  {
    id: crypto.randomUUID(),
    icon: FiHome,
    fillIcon: GoHomeFill,
    label: "Home",
    link: "/",
  },
  {
    id: crypto.randomUUID(),
    icon: FaShareNodes,
    fillIcon: FaSquareShareNodes,
    label: "Workflow",
    link: "/workflow",
  },
  {
    id: crypto.randomUUID(),
    icon: FiKey,
    fillIcon: MdVpnKey,
    label: "Credentials",
    link: "/credentials", // Corrected route link
  },
  {
    id: crypto.randomUUID(),
    icon: FiSettings,
    fillIcon: MdSettings,
    label: "Settings",
    link: "/settings", // Corrected route link
  },
];
