const SettingAccountService = ({ doPut,doPost }) => {
    const doUpdate = async (accountData) => {
        try {
            return await doPut({
                url: '/user/update',
                data: accountData
            })
        } catch (err) {
            throw err
        }
    }

    const doActivateBusiness = async (accountId) => {
        try {
            return await doPut({
                url: '/account/activate-business',
                data: accountId
            });
        } catch (err) {
            throw err;
        }
    }

    const doGetAccountProduct = async (accountId) => {
        try {
            return await doPost({
                url: '/account/product',
                data: accountId
            });
        } catch (err) {
            throw err;
        }
    }

    const doGetAccountPost = async (accountId) => {
        try {
            return await doPost({
                url: '/account/feed',
                data: accountId
            });
        } catch (err) {
            throw err;
        }
    }

    const doGetDetailAccount = async (accountId) => {
        try {
            return await doPost({
                url: '/account/get-account',
                data: accountId
            });
        } catch (err) {
            throw err;
        }
    }
    
    return { doUpdate, doActivateBusiness, doGetAccountProduct, doGetAccountPost, doGetDetailAccount};
}

export default SettingAccountService;