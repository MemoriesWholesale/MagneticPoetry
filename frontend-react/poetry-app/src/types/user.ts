type User = {
    username:string,
    email:string,
    password:string,
    user_id?:number,
    token?:string|null,
    about_me?:string,
    created_on?:string,
    last_seen?:string
}

export default User