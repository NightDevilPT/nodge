// components/credentials/credential-input-form.tsx
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CredentialFormComponentProps } from "../credential-form";

interface CredentialInputFormProps extends CredentialFormComponentProps {
	showLockIcon?: boolean;
}

export function CredentialInputForm({
	form,
	fields,
	isSubmitting,
	showLockIcon = false,
}: CredentialInputFormProps) {
	return (
		<div className="space-y-4">
			{fields.map((f) => (
				<FormField
					key={f.name}
					control={form.control}
					name={`credentialsValue.${f.name}`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{f.label}
								{showLockIcon && f.type === "password" && (
									<span className="ml-1 text-xs text-green-600">
										🔒
									</span>
								)}
							</FormLabel>
							<FormControl>
								<Input
									type={f.type}
									placeholder={`Enter ${f.label.toLowerCase()}`}
									disabled={isSubmitting}
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			))}
		</div>
	);
}
