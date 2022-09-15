export const ProfileService = ({ doPost, doGet }) => {
    const doGetNonBusinessProfile = async (account) => {
       try {
          return await doPost({
             url: '/non-business-profile/get/profile',
             data: account
          });
       } catch (err) {
          throw err;
       }
    }
 
    const addNonBusinessProfile = async (account) => {
       try {
          return await doPost({
             url: '/non-business-profile/add/profile',
             data: account
          });
       } catch (err) {
          throw err;
       }
    }
 
    const updateNonBusinessProfile = async (account) => {
       try {
          return await doPost({
             url: '/non-business-profile/update/profile',
             data: account
          });
       } catch (err) {
          throw err;
       }
    }
 
    const doGetBusinessProfile = async (user) => {
       try {
          return await doPost({
             url: '/business-profile/get/profile',
             data: user
          });
       } catch (err) {
          throw err;
       }
    }
 
    const addBusinessProfile = async (account) => {
       try {
          return await doPost({
             url: '/business-profile/add/profile',
             data: account
          });
       } catch (err) {
          throw err;
       }
    }
 
    const updateBusinessProfile = async (account) => {
       try {
          return await doPost({
             url: '/business-profile/update/profile',
             data: account
          });
       } catch (err) {
          throw err;
       }
    }
 
    return { doGetNonBusinessProfile, doGetBusinessProfile, updateNonBusinessProfile, addNonBusinessProfile, addBusinessProfile, updateBusinessProfile };
 }
 
 export const ProfileImageService = ({ doStoreFile }) => {
    const addNonBusinessProfileImage = async (file) => {
       try {
          return await doStoreFile({
             url: '/profile/non-business-profile',
             data: file
          });
       } catch (err) {
          throw err;
       }
    }
 
    const addBusinessProfileImage = async (file) => {
       try {
          return await doStoreFile({
             url: '/profile/business-profile',
             data: file
          });
       } catch (err) {
          throw err;
       }
    }
 
    return { addNonBusinessProfileImage, addBusinessProfileImage };
 }