const TimelineService = ({ doPost, doDelete }) => {
    const doGetTimeline = async (user) => {
       try {
          return await doPost({
             url: '/feed/timeline',
             data: user
          });
       } catch (err) {
          throw err;
       }
    }

   const doGetDetailTimeline = async (user) => {
      try {
         return await doPost({
            url: '/feed/id',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }
 
    const doGetTimelineByCategory = async (user) => {
       try {
          return await doPost({
             url: '/feed/category',
             data: user
          });
       } catch (err) {
          throw err;
       }
    }

   const doGetTimelineByAccount = async (user) => {
      try {
         return await doPost({
            url: '/feed/account',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }

   const doGetTimelineByKeyword = async (user) => {
      try {
         return await doPost({
            url: '/feed/search',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }
    const doPostTimelineLike = async (data) => {
       try {
          return await doPost({
             url: '/feed/like',
             data: data
          })
       } catch (err) {
          throw err;
       }
    }
 
    const doDeleteTimelineLike = async (data) => {
       try {
          return await doPost({
             url: '/feed/unlike',
             data: data
          })
       } catch (err) {
          throw err;
       }
    }
 
    const doPostComment = async (user) => {
       try {
          return await doPost({
             url: '/comment/create',
             data: user
          });
       } catch (err) {
          throw err
       }
    }
 
    return { doGetTimeline, doGetDetailTimeline, doGetTimelineByCategory, doGetTimelineByAccount, doGetTimelineByKeyword, doPostTimelineLike, doDeleteTimelineLike, doPostComment };
 
 }
 
 export default TimelineService;