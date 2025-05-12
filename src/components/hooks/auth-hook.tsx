import { rpc } from "@/lib/rpc"
import { handleEden } from "@/utils/base"
import { useMutation } from "@tanstack/react-query"

export const AuthHook = () => {

    const signUpMutation = useMutation({
        mutationFn: async (...args: Parameters<typeof rpc.api.auth.signup.post>) => {
            return handleEden(await rpc.api.auth.signup.post(...args))
        }
    })

    const signInMutation = useMutation({
        mutationFn: async (...args: Parameters<typeof rpc.api.auth.signin.post>) => {
            return handleEden(await rpc.api.auth.signin.post(...args))
        }
    })

    const signOutMutation = useMutation({
        mutationFn: async () => handleEden(await rpc.api.auth.signout.post())
    })

    return {
        signUpMutation,
        signInMutation,
        signOutMutation,
    }
    
}