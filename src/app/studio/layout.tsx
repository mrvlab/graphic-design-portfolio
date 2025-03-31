import { lausanne300 } from '@/fonts/Lausanne';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`$ ${lausanne300.className}  lg:font-[0.75rem]`}>
        {children}
      </body>
    </html>
  );
}
