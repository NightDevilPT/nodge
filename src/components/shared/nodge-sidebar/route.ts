import { FiHome } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { FaShareNodes, FaSquareShareNodes } from "react-icons/fa6";
import { FiKey, FiDatabase } from "react-icons/fi"; // Add appropriate icons
import { MdVpnKey } from "react-icons/md"; // Add filled icon for credentials
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
];
