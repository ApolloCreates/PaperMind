import {
    Upload,
    Sparkles,
    Bot,
    Download,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
    const actions = [
        {
            title: "Upload Paper",
            description: "Add PDFs",
            icon: Upload,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Generate Review",
            description: "AI synthesis",
            icon: Sparkles,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Generate Topics",
            description: "Research ideas",
            icon: Bot,
            color: "bg-purple-100 text-purple-600",
        },
        {
            title: "Draft Editor",
            description: "Continue writing",
            icon: Download,
            color: "bg-orange-100 text-orange-600",
        },
    ];

    return (
        <Card className="rounded-2xl p-6 xl:sticky xl:top-24">
            <h2 className="mb-6 text-xl font-semibold">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <Card
                            key={action.title}
                            className="
        h-44
        cursor-pointer
        rounded-2xl
        border
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
        flex
        flex-col
        items-center
        justify-center
        text-center
    "
                        >

                            <div className={`mb-4 rounded-2xl p-4 ${action.color}`}>
                                <Icon className="h-7 w-7 text-primary" />
                            </div>

                            <h3 className="font-semibold">
                                {action.title}
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                {action.description}
                            </p>

                        </Card>

                    )

                })}
            </div>
        </Card>
    );
}