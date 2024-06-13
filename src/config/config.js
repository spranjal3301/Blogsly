const config={
    appwriteUrl:String(import.meta.env.
        VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.
        VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId:String(import.meta.env.
        VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.
        VITE_APPWRITE_BUCKET_ID),
    appwriteDatabaseId:String(import.meta.env.
        VITE_APPWRITE_DATABASE_ID),
    tinymceAPIKEY:String(import.meta.env.
        VITE_TINYMCE_APIKEY),
    
}

export default config;