import { appwriteService } from "./appwrite";

export default async ({ res, _req, log, error: errorCallback }) => {
  try {
    const usersCount = await appwriteService.getUsersList();
    return res.json({ usersCount }, 200);
  } catch (error) {
    errorCallback(error.message);
    return res.json(
      { message: "Something went wrong", error: error.message },
      500
    );
  }
};
