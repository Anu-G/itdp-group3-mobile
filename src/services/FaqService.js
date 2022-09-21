export const FaqService = ({doPost}) => {
    const doCreateFAQ = async (data) => {
        try {
            return await doPost({
                url: '/faq/add/faq',
                data: data
            })
        } catch (err) {
            throw err
        }
    }
    const doGetFAQ = async (data) => {
        try {
            return await doPost({
                url:'/faq/get/faq',
                data: data
            })
        } catch (e) {
            throw e
        }
    }
    const doDeleteFAQ = async (data) => {
        try {
            return await doPost({
                url:'/faq/delete/faq',
                data: data
            })
        } catch (e) {
            throw e
        }
    }
    return {doCreateFAQ,doGetFAQ,doDeleteFAQ}
}