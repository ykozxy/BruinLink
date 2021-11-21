/*
* Check if the input email is valid.
* */
function checkEmailFormat(email) {
    // Regex for checking email address.
    // Cited from: https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs/39425165
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkUrlFormat(url) {
    // Cited from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    let re = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
    return re.test(url);
}

module.exports = {
    checkEmailFormat: checkEmailFormat,
    checkUrlFormat: checkUrlFormat,
};