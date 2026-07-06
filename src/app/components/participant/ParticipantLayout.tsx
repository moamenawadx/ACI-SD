export function ParticipantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );
}
