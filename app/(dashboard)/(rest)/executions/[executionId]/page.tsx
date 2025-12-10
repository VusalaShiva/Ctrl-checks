import { requireAuth } from "@/lib/auth-utils";


interface PageProps {
    params: Promise < {
        executionId: string;
    }>
};


// https://localhost:3000/executions/123

const Page = async ({ params } : PageProps) => { 
    await requireAuth();
    const { executionId } = await params;
    
    return (
        <p>Exection id : {executionId}</p>
    );
};

export default Page;