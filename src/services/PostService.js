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

   const doGetDataById = async (data) => {
      try {
         return await doPost({
            url: '/feed/id',
            data: data
         })
      } catch (err) {
         throw err
      }
   }

   const doEditData = async (editData) => {
      try {
         return await doPost({
            url: '/feed/update',
            data: editData
         })
      } catch (err) {
         throw err;
      }
   }

   const doDeleteData = async (id) => {
      try {
         return await doPost({
            url: '/feed/delete',
            data: id
         })
      } catch (err) {
         throw err;
      }
   }


   return { doPostData, doEditData, doDeleteData, doGetDataById };
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