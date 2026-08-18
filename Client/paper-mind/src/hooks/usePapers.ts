import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getProjectPapers,
    deletePaper,
} from "@/services/paper.service";

export function usePapers(
    projectId:string,
){

    return useQuery({

        queryKey:[
            "papers",
            projectId,
        ],

        queryFn:()=>getProjectPapers(
            projectId
        )

    });

}

export function useDeletePaper(
    projectId:string,
){

    const qc=useQueryClient();

    return useMutation({

        mutationFn:deletePaper,

        onSuccess(){

            qc.invalidateQueries({

                queryKey:[
                    "papers",
                    projectId,
                ]

            });

            qc.invalidateQueries({

                queryKey:[
                    "workspace",
                    projectId,
                ]

            });

        }

    });

}