import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const currentUserId = searchParams.get("currentUserId"); // Optional: exclude current user

    // Build the search conditions
    const searchConditions = query
      ? {
          OR: [
            {
              username: {
                contains: query,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              email: {
                contains: query,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              profile: {
                OR: [
                  {
                    firstName: {
                      contains: query,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    lastName: {
                      contains: query,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            },
          ],
        }
      : {};

    // Build the where clause
    const whereClause = {
      isVerified: true,
      ...(currentUserId && { id: { not: currentUserId } }), // Exclude current user if provided
      ...searchConditions,
    };

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        username: true,
        email: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      take: 10,
      orderBy: {
        username: "asc", // Sort alphabetically
      },
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "No verified users found" },
        { status: 404 }
      );
    }

    // Format the response with combined name if profile exists
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.profile
        ? `${user.profile.firstName} ${user.profile.lastName}`.trim() ||
          user.username
        : user.username,
      email: user.email,
      avatar: user.profile?.avatar || undefined,
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching verified users:", error);
    return NextResponse.json(
      { message: "Failed to fetch verified users" },
      { status: 500 }
    );
  }
}