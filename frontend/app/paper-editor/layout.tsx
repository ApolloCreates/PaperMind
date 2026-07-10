import { Sidebar } from '@/components/sidebar';
import { TopNav } from '@/components/top-nav';

export default function PaperEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
