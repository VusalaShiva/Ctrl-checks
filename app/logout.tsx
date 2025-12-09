"use client"

import { Button } from "@/components/ui/button"
import { authClient} from "@/lib/auth-clients"
import { useRouter } from "next/navigation"


export const LogoutButton = () => {
    const router = useRouter();
    const onSuccess = () => {
        router.push("/login")
    }
    return (
        <Button onClick={() => authClient.signOut({

            fetchOptions : {
                onSuccess : () => {
                    router.push("/login")
                }
            }
        })}>
            Logout
        </Button>
    )
}