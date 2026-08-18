import { useState } from "react";

import { Upload, Loader2 } from "lucide-react";

import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useUploadPaper } from "@/hooks/useUploadPaper";

export function UploadPaperDialog({

    open,

    onOpenChange,

    projectId,

}:{

    open:boolean;

    onOpenChange:(v:boolean)=>void;

    projectId:string;

}){

    const [file,setFile]=useState<File|null>(null);

    const uploadMutation=useUploadPaper(projectId);

    async function handleUpload(){

        if(!file){

            toast.error("Please select a PDF.");

            return;

        }

        try{

            await uploadMutation.mutateAsync(file);

            toast.success("Paper uploaded successfully.");

            onOpenChange(false);

            setFile(null);

        }catch(e){

            toast.error("Upload failed.");

        }

    }

    return(

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        Upload Research Paper

                    </DialogTitle>

                </DialogHeader>

                <div className="mt-6">

                    <label
                        className="
                            flex
                            h-56
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border-2
                            border-dashed
                            border-muted
                            hover:border-primary
                            transition
                        "
                    >

                        <Upload className="mb-4 h-10 w-10 text-primary"/>

                        <p className="font-medium">

                            Drag PDF here

                        </p>

                        <p className="text-sm text-muted-foreground">

                            or click to browse

                        </p>

                        <input

                            hidden

                            type="file"

                            accept=".pdf"

                            onChange={(e)=>{

                                if(e.target.files){

                                    setFile(e.target.files[0]);

                                }

                            }}

                        />

                    </label>

                    {file && (

                        <div className="mt-4 rounded-lg border p-3">

                            {file.name}

                        </div>

                    )}

                </div>

                <Button
                    className="mt-6 w-full"
                    onClick={handleUpload}
                    disabled={uploadMutation.isPending}
                >

                    {uploadMutation.isPending && (

                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

                    )}

                    Upload Paper

                </Button>

            </DialogContent>

        </Dialog>

    )

}