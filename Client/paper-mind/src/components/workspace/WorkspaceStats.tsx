import {
  FileText,
  PenSquare,
  Bot,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import type {
  WorkspaceStats as Stats,
} from "@/types/workspace";

export function WorkspaceStats({
  stats,
}: {
  stats: Stats;
}) {

  const items = [

    {
      title: "Research Papers",
      value: stats.papers,
      icon: FileText,
    },

    {
      title: "Drafts",
      value: stats.drafts,
      icon: PenSquare,
    },

    {
      title: "AI Reviews",
      value: stats.reviews,
      icon: Bot,
    },

  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">

      {items.map((item) => {

        const Icon = item.icon;

        return (

          <Card
            key={item.title}
            className="rounded-2xl p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">

                  {item.title}

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                  {item.value}

                </h2>

              </div>

              <div className="rounded-xl bg-primary/10 p-3">

                <Icon className="h-6 w-6 text-primary" />

              </div>

            </div>

          </Card>

        );

      })}

    </div>
  );
}