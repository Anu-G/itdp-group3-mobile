import uuid from 'react-native-uuid'

export const PostService = ({ doPost }) => {
   const doPostData = async (postData) => {
      try {
         return await doPost({
            url: '/feed/create',
            data: postData
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostData };
}


export const PostImageService = ({ doStoreMultipleFiles }) => {
   const doPostImage = async (image) => {
      try {
         let newDate = new Date()
         let date = newDate.toISOString().slice(0, 10)
         let time = newDate.toTimeString().slice(0, 8)
         let newUuid = uuid.v4().toString()
         let folderName = `${date} ${time} ${newUuid}`
         return await doStoreMultipleFiles({
            url: `/post/${folderName}`,
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostImage };
}