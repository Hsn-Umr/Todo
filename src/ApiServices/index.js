let BASE_URL = 'http://54.144.155.145/api/';
let endpoint = {
    userRegistration: 'register',
    userLogin: 'login',
    userLogout: 'logout',
    refreshToken: 'refresh-token',
    addTask: 'item',
    getTasks: 'items',
    getSingleTask: 'item',
    deleteTask: 'item',
    updateTask: 'item',

};
class Services {
    getURL = key => {
        let Url = BASE_URL + key;
        console.log('url', Url);
        return Url;
    };
    userRegistration = (email, password, confirmPassword, callback) => {
        var formdata = new FormData();
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('password_confirmation', confirmPassword);

        console.log('user registration ', email + 'pwd ', password + 'c_pwd', confirmPassword);
        var requestOptions = {
            method: 'POST',
            body: formdata,
        };
        fetch(this.getURL(endpoint.userRegistration), requestOptions)
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    userLogin = (email, password, callback) => {
        var formdata = new FormData();
        formdata.append('email', email);
        formdata.append('password', password);

        console.log('user login ', email + ' pwd ', password);
        var requestOptions = {
            method: 'POST',
            body: formdata,
        };
        fetch(this.getURL(endpoint.userLogin), requestOptions)
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    userLogout = (token, callback) => {

        console.log('user logout ', token);

        fetch(this.getURL(endpoint.userLogout), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    refreshToken = (token, callback) => {

        console.log('user refresh token ', token);

        fetch(this.getURL(`${endpoint.refreshToken}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC81NC4xNDQuMTU1LjE0NVwvYXBpXC9sb2dpbiIsImlhdCI6MTYyOTA5OTUyNywiZXhwIjoxNjI5MTAzMTI3LCJuYmYiOjE2MjkwOTk1MjcsImp0aSI6IkVzbzJUNncyMVZDQXVIU3giLCJzdWIiOjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.TN7bAGi33Ni3x6yVS8N34wJk8HZrCpIzq1aPY_h8Z_Q`), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    addTask = (title, description, id, token, callback) => {
        var formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('id', id);

        console.log('add task ', title, description, id, token);

        fetch(this.getURL(endpoint.addTask), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formdata,
        })
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    getTasks = (token, callback) => {

        console.log('get tasks ', token);

        fetch(this.getURL(endpoint.getTasks), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    deleteTask = (token, id, callback) => {

        console.log('get tasks ', id);

        fetch(this.getURL(`${endpoint.deleteTask}/${id}`), {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };

    updateTask = (title, description, id, token, callback) => {

        console.log('add task ', `"${title}"`, description, id, token);

        fetch(this.getURL(`${endpoint.updateTask}/${id}`), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `${title}`,
                description: `${description}`
            })
        })
            .then(response => response.text())
            .then(result => callback({ isSuccess: true, response: JSON.parse(result) }))
            .catch(error => callback({ isSuccess: false, response: error }));
    };
}
const ApiSerivces = new Services();
export default ApiSerivces;
