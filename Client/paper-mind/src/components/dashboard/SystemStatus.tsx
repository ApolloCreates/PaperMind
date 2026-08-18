import { Card } from "@/components/ui/card";

const items = [
  { label: "Backend Status", status: "Connected" },
  { label: "Vector Database", status: "Connected" },
  { label: "AI Model", status: "Ready" },
];

export function SystemStatus() {
  return (
    <Card className="border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">System Status</h3>
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{i.label}</span>
            <span className="inline-flex items-center gap-2 font-medium text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {i.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
