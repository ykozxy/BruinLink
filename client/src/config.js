// This file contains configs of the client

module.exports = {
    // The base url to backend server
    baseUrl: "http://localhost:3031",

    // Routes of each api
    api: {
        account: {
            login: "/account/login",
            register: "/account/register",
            emailVerify: "/account/emailVerify",
            changeEmail: "/account/changeEmail",
            changePassword: "/account/changePassword",
            resetPassword: "/account/resetPassword",
            getEmail: "/account/getEmail",
        },
        course: {
            search: "/course/search",
            getDetail: "/course/getDetail",
            getDepartments: "/course/getDepartments",
        },
        club: {
            search: "/club/search",
            getDetail: "/club/getDetail",
        },
        upload: {
            uploadLink: "/upload/link",
            uploadQrCode: "/upload/qrcode",
        },
        subscription: {
            subscribe: "/subscription/subscribe",
            unsubscribe: "/subscription/unsubscribe",
            getSubscriptions: "/subscription/getSubscriptions",
        },
    },

    // The cool down time (seconds) between sending verification codes
    resendCodeCoolDown: 30,
};
