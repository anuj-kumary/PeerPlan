import { account } from "../appwrite";

type Preferences = {
  github: string;
  linkedin: string;
  twitter: string;
};

export const updatePreferences = async (preferences: Preferences) => {
  try {
    const preferencesResponse = await account.updatePrefs(preferences);
    return preferencesResponse;
  } catch (error) {
    console.error(error);
  }
};

export const updateName = async (name: string) => {
  try {
    const nameResponse = await account.updateName(name);
    return nameResponse;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (password: string) => {
  try {
    const passwordResponse = await account.updatePassword(password);
    return passwordResponse;
  } catch (error) {
    console.error(error);
  }
};
