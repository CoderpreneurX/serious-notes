import Header from "./Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="auth" />
      {children}
    </>
  );
}
