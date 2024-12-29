"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const NodgeBreadcrumb = () => {
  const pathname = usePathname(); // Get the current path
  const pathArray = pathname.split("/").filter((segment) => segment);

  // Generate breadcrumb items
  const breadcrumbItems = pathArray.map((segment, index) => {
    const path = `/${pathArray.slice(0, index + 1).join("/")}`;
    const isActive = index === pathArray.length - 1; // Check if it's the current route

    return (
      <React.Fragment key={segment}>
        <BreadcrumbItem>
          {isActive ? (
            <BreadcrumbPage
              className={`bg-gradient-to-tr from-primary to-green-400 bg-clip-text text-transparent capitalize`}
            >
              {segment.replace(/-/g, " ")}
            </BreadcrumbPage>
          ) : (
            <Link href={path}>
              <BreadcrumbPage className="text-foreground hover:text-primary capitalize">
                {segment.replace(/-/g, " ")}
              </BreadcrumbPage>
            </Link>
          )}
        </BreadcrumbItem>
        {!isActive && <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>}
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Static Home Link */}
        <BreadcrumbItem>
          <Link href="/">
            <BreadcrumbPage
              className={`${
                pathArray.length === 0
                  ? "bg-gradient-to-tr from-primary to-green-400 bg-clip-text text-transparent"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </BreadcrumbPage>
          </Link>
        </BreadcrumbItem>
        {pathArray.length > 0 && <BreadcrumbSeparator>{"/"}</BreadcrumbSeparator>}
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NodgeBreadcrumb;
