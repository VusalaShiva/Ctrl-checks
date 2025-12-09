import { inngest } from '@/app/inngest/client';
import {createTRPCRouter,protectedProcedure } from '../init';
import prisma from '@/lib/db';


export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ctx}) => {
    return prisma.workflow.findMany();
  }),
  createWorkFlow: protectedProcedure.mutation(async() => {
    try {
      await inngest.send({
        name:"test/hello.world",
        data:{
          email:"vusalashivakumar@gmail.com"
        }
      })
      return  {success:true, message:"Job queued"}
    } catch (error) {
      console.error('Inngest send error:', error);
      throw new Error(`Failed to queue job: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    }),
  });
// export type definition of API
export type AppRouter = typeof appRouter;