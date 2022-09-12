export const authService = ({ doPost }) => {
    const doLogin = async (userCred = {}) => {
        try {
            return await doPost({ url: '/auth/login', data: userCred })
        } catch (e) {
            throw e;
        }
    }

    const doLogout = async _ => {
        try {
            return await doPost({
                url: '/auth/logout'
            });
        } catch (e) {
            throw (e);
        }
    }

    return { doLogin, doLogout }
}