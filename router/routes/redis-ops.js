
const redis = require("redis"),
    client = redis.createClient(),
    subscriber = redis.createClient(),
    publish = redis.createClient();
const util = require('util');

module.exports = class RedisOps {
    static getUsers() {
        return new Promise((resolve, reject) => {
            let getKeys = util.promisify(client.keys).bind(client);
            let indianUser = [];
            let australianUser = [];
            let usUser = [];
            getKeys('india==*')
                .then(data => {
                    indianUser = data;
                    console.log("india", data);
                    return getKeys('austrelia==*')
                })
                .then(data => {
                    australianUser = data;
                    console.log("austrelia", data);
                    return getKeys('us==*')
                })
                .then(data => {
                    usUser = data;
                    console.log("us", data);
                    let obj = {
                        india: indianUser,
                        austrelia: australianUser,
                        us: usUser
                    }
                    return resolve(obj);
                })
                .catch(e => {
                    console.log("e", e);
                })
        })
    }
}