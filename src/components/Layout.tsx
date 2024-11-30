import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: { children: JSX.Element }) {
	return (
		<>
			{children}
			<Toaster />
		</>
	);
}
