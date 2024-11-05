import { account, OAuthProvider } from "../appwrite"
import { v4 as generateUniqueId } from 'uuid';

export const loginWithGoogle = async () => {
    try {
        const redirectURL = `${window.location.origin}/auth-callback`;
        await account.createOAuth2Session(OAuthProvider.Google, redirectURL)
    } catch (error) {
        console.error(error)
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current')
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        console.error(error)
    }
}

export const emailSignUp = async (email: string, password: string) => {
    try {
        const data = await account.create(generateUniqueId(), email, password)
        return data
    } catch (error) {
        console.error(error)
    }
}

export const emailSignIn = async (email: string, password: string) => {
    try {
        const data = await account.createEmailPasswordSession(email, password)
        return data
    } catch (error) {
        console.error(error)
    }
}