
let users = [];


async function userAdd (usr) {
    users.push(usr)
    let user = await users.filter(user => usr.id === user.id)
    return user[0]
}

async function find () {
    return users
}

async function remove (id) {
    // let user = await users.filter(user => user.id === id)


    users = users.filter(user => user.id !== id)

    return users
}

async function findId (id) {
    const user = users.filter( user => id === user.id)

    return user
}

module.exports = {
    users,
    userAdd,
    remove,
    find
}