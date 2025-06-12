import { decryptData, encryptData } from "@/services/crypto.service";

export class SecurityUtils {
	/**
	 * Create secure credential value (just encrypted, no bcrypt/jwt)
	 */
	static createSecureCredentialValue(
		credentialsValue: Record<string, any>
	): string {
		try {
			return `${encryptData({ date: Date.now() })}NODGE${encryptData(
				credentialsValue
			)}NODGE${encryptData({ date: Date.now() })}`;
		} catch (error) {
			console.error("Encryption error:", error);
			throw new Error("Failed to encrypt credential value");
		}
	}

	/**
	 * Decrypt secure credential value to get original data
	 */
	static decryptSecureCredentialValue(
		secureValue: string
	): Record<string, any> | null {
		try {
			// Handle the case where value is already decrypted (for backward compatibility)
			if (typeof secureValue === "object") return secureValue;

			// Handle the NODGE format
			if (secureValue.includes("NODGE")) {
				const parts = secureValue.split("NODGE");
				if (parts.length >= 2) {
					const decrypted = decryptData(parts[1]);
					return typeof decrypted === "object"
						? decrypted
						: JSON.parse(decrypted);
				}
			}

			// Fallback to direct decryption
			const decrypted = decryptData(secureValue);
			return typeof decrypted === "object"
				? decrypted
				: JSON.parse(decrypted);
		} catch (error) {
			console.error("Decryption error:", error);
			return null;
		}
	}

	/**
	 * Validate encrypted string format
	 */
	static isValidEncryptedFormat(secureValue: string): boolean {
		return typeof secureValue === "string" && secureValue.includes(":");
	}
}
