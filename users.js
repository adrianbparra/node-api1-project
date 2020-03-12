
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


    let user = await findId(id)

    users = await users.filter(user=> user.id !== id)

    return user
}

async function findId (id) {
    return users.filter( user => id === user.id)[0]
}

async function updateId (id, changes) {

    
    
    users = await users.map(user=> {
        
        if(user.id === id){
            
            return {
             ...user,
             name: changes.name ? changes.name : user.name,
             bio: changes.bio ? changes.bio : user.bio
            
            }
        }
        return user
    })

    let user = await findId(id)

    return user
}

module.exports = {
    users,
    userAdd,
    remove,
    find,
    findId,
    updateId,

}