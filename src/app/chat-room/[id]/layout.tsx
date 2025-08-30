import { NavigationBar } from "@/ui/frontend/components/navigation/NavigationBar";

export default function ChatRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
