import { betterAuth } from "better-auth";
import {checkout, polar, portal} from "@polar-sh/better-auth"
import {prismaAdapter} from "better-auth/adapters/prisma";
import { polarClient} from "./polar";
import prisma from "@/lib/db";

export const auth = betterAuth({
  database : prismaAdapter(prisma , {
    provider:"postgresql"
  }),
  emailAndPassword :{
    enabled : true,
    autoSignIn : true,
  },
  plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "0e55472f-7bd1-4d0f-ab09-06489e70f370",
                            slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/CtrlChecks-Pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal()
            ],
        }),
       
    ]
});


