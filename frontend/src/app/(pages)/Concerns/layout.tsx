// app/Concerns/layout.tsx
import SideBar from "./components/SideBar";

export default function ConcernsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-screen-2xl px-6 sm:px-10 lg:px-16 py-8">
        {/* Children will contain the header and main content */}
        <div className="flex flex-col gap-6">
          {/* This wrapper allows pages to control their own header */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            {/* Page content (including header) */}
            <div className="flex-1">
              {children}
            </div>
            
            {/* Sidebar - fixed width, always on the right */}
            <div className="w-full lg:w-72 shrink-0">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}