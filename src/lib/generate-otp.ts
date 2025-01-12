export function generateOtp(): number {
	// Generate a 6-digit OTP as a string
	return Math.floor(100000 + Math.random() * 900000);
}
