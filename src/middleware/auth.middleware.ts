import { NextRequest, NextResponse } from "next/server";
import jwtService from "@/services/jwt.service";

export const authMiddleware =
	(handler: any) =>
	async (
		request: NextRequest,
		context: { params: any } // Include context for params
	) => {
		const accessToken = request.cookies.get("accessToken")?.value;
		const refreshToken = request.cookies.get("refreshToken")?.value;

		if (!accessToken && !refreshToken) {
			return NextResponse.json(
				{ message: "Authentication token is missing", status: 401 },
				{ status: 401 }
			);
		}

		try {
			// Verify Access Token
			const decodedAccessToken = jwtService.verifyToken(
				accessToken || "",
				"access"
			);

			if (decodedAccessToken) {
				// Access token is valid, attach userId to request and pass context
				(request as any).userId = decodedAccessToken.userId;
				return handler(request, context);
			}

			// Access token is invalid, verify Refresh Token
			const decodedRefreshToken = jwtService.verifyToken(
				refreshToken || "",
				"refresh"
			);

			if (!decodedRefreshToken) {
				return NextResponse.json(
					{
						message: "Session expired. Please log in again.",
						status: 401,
					},
					{ status: 401 }
				);
			}

			// Generate new tokens since the access token expired
			const tokens = jwtService.generateToken({
				userId: decodedRefreshToken.userId,
				email: decodedRefreshToken.email,
			});

			// Set new cookies
			const response = NextResponse.next();
			response.cookies.set("accessToken", tokens.accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 15 * 60, // 15 minutes
				path: "/",
			});

			response.cookies.set("refreshToken", tokens.refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 20 * 60, // 20 minutes
				path: "/",
			});

			// Attach the userId and pass to the next handler
			(request as any).userId = decodedRefreshToken.userId;

			return handler(request, context); // Continue to the handler
		} catch (err: any) {
			console.error("Token verification failed:", err);
			return NextResponse.json(
				{
					message: "Invalid or expired token. Please log in again.",
					status: 401,
				},
				{ status: 401 }
			);
		}
	};
