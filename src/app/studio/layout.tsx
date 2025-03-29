export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={'antialiased lg:font-[0.75rem]'}>{children}</body>
    </html>
  );
}
