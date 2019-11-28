async function backendGet(API_URL, callback) {
    await $.ajax({
        url: API_URL,
        type: 'GET',
        success: (data) => {
            callback(null, data);
        },
        error: () => {
            callback(new Error("Ajax Failed"));
        }
    })
}

async function backendPost(API_URL, data, callback) {
    await $.ajax({
        url: API_URL,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: (data) => {
            callback(null, data);
        },
        error: () => {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.checkLogin = async (callback) => {
    await backendGet('/api/check-login/', callback);
};

exports.getCitiesList = async (callback) => {
    await backendGet('/api/get-cities/', callback);
};

exports.registration = async (user, callback) => {
    await backendPost('/api/registration/', user, callback);
};

exports.login = async (user, callback) => {
    await backendPost('/api/login/', user, callback);
};

exports.logout = async (callback) => {
    await backendGet('/api/logout/', callback);
};

exports.getComments = async (city, callback) => {
  await backendPost('/api/get-comments/', city, callback);
};

exports.writeComment = async (comment, callback) => {
  await backendPost('/api/write-comments/', comment, callback);
};

exports.getBackpack = async (callback) => {
    await backendGet('/api/get-backpack/', callback);
};

exports.setBackpack = async (backpack, callback) => {
    await backendPost('/api/set-backpack/', backpack, callback);
};