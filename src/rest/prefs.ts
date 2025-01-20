import { account } from "../appwrite"

type Preferences = {
    name: string
}

export const updatePreferences = async (preferences:Preferences ) => {
    try {
        await account.updatePrefs(preferences)
    } catch (error) {
        console.error(error)
    }
}