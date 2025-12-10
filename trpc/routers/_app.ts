import { inngest } from '@/app/inngest/client';
import { baseProcedure ,createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    
    try {
      await inngest.send({
        name : "execute/ai"},
      );
     return { success: true, message: "Job queued" }
    } catch (error) {
      console.error('AI Generation error:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to generate AI content: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkFlow: protectedProcedure.mutation(async () => {
    try {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: "vusalashivakumar@gmail.com"
        }
      })
      return { success: true, message: "Job queued" }
    } catch (error) {
      console.error('Inngest send error:', error);
      throw new Error(`Failed to queue job: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;