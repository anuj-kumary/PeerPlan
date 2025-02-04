import { ID } from "appwrite";
import { storage } from "../appwrite";

export const getUserPhotoUrl = (fileId:string) => {
    return storage.getFileView(import.meta.env.VITE_APP_BUCKET_ID, fileId);
  };

  export const handleUpload = async (file:File) => {
    if (file) {
      const response = await storage.createFile(
        import.meta.env.VITE_APP_BUCKET_ID, 
        ID.unique(),
        file
      );
      return response
    } else {
      alert("Please select a file first.");
    }
  };