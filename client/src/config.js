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
        },
        course: {
            search: "/course/search",
            getDetail: "/course/getDetail",
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
            unsubscribe: "/subscription/unsubscribe"
        },
        report: {
            reportLink: "/report/link"
        }
    },
};
