import uuid from 'react-native-uuid'
import { Platform } from "react-native";
import { getDownloadURL } from 'firebase/storage'
import { firebase } from '../shared/firebaseStorage/FirebaseConfig'
import { checkErr } from '../utils/CommonUtils';

export const apiClientFactory = (client) => {
   const doPost = async ({ url = '', data = null }) => {
      try {
         const response = await client.post(url, data);
         return response;
      } catch (e) {
         throw e;
      }
   }

   const doGet = async ({ url = '', params = {} }) => {
      try {
         const response = await client.get(url, { params: params });
         return response;
      } catch (e) {
         throw e;
      }
   }

   const doStoreFile = async({url, data}) => {
      try {
         const promiseFetch = []
         const promiseBlob = []
         const promises = []
         let imgUrl = ''

         const response = fetch(data)
         promiseFetch.push(response)

         const blob = (await response).blob()
         promiseBlob.push(blob)

         const filename = `${uuid.v4().toString()}.${data.split(".").pop()}`
         const storageRef = firebase.storage().ref(`toktok-dev${url}`).child(filename)
         var ref = storageRef.put(await blob).then(() => getDownloadURL(storageRef).then((downloadURL) => imgUrl=downloadURL))
         promises.push(ref)

         await Promise.all(promiseFetch)
         await Promise.all(promiseBlob)
         await Promise.all(promises)

         return imgUrl

      } catch (err) {
         throw err
      }
   }

   const doStoreMultipleFiles = async({url, data}) => {
      try {
         const promiseFetch = []
         const promiseBlob = []
         const promises = []
         const links = []

         data.map(async(image) => {
            try {
               const response = fetch(image)
               promiseFetch.push(response)

               const blob = (await response).blob()
               promiseBlob.push(blob)

               const filename = `${uuid.v4().toString()}.${image.split(".").pop()}`
               const storageRef = firebase.storage().ref(`toktok-dev${url}`).child(filename)
               var ref = storageRef.put(await blob).then(() => getDownloadURL(storageRef).then((downloadURL) => links.push(downloadURL)))

               promises.push(ref)
               promiseFetch.pop()
               promiseBlob.pop()
            } catch (err) {
               console.log(err);
               checkErr(err)
            }
         })

         await Promise.all(promiseFetch)
         await Promise.all(promiseBlob)
         await Promise.all(promises)
         return links

      } catch (err) {
         console.log(err);
         throw err
      }
   }

   return { doPost, doGet, doStoreFile, doStoreMultipleFiles }
}