import { FileText } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function PaperEmptyState({
    onUpload,
}:{
    onUpload:()=>void;
}){

    return(

        <Card className="flex flex-col items-center justify-center border-dashed p-16">

            <div className="rounded-full bg-primary/10 p-5">

                <FileText className="h-8 w-8 text-primary"/>

            </div>

            <h3 className="mt-6 text-xl font-semibold">

                No Papers Yet

            </h3>

            <p className="mt-2 max-w-md text-center text-muted-foreground">

                Upload your first research paper to begin semantic search,
                AI review, and draft generation.

            </p>

            <Button
                className="mt-8"
                onClick={onUpload}
            >

                Upload Paper

            </Button>

        </Card>

    );

}