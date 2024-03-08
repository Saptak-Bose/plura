export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
