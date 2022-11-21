export
interface User {
    userId: number,
    username: string,
    userEmail: string,
    userPassword: string,
    userFullName: string,
    userOccupation: string
}

export
interface NewUser {
    username: string,
    userEmail: string,
    userPassword: string,
    userFullName: string,
    userOccupation: string
}

export
interface UserDetails {
    id: number | undefined,
    username: string | undefined,
    email: string | undefined,
    password: string | undefined,
    fullname: string | undefined,
    token: string | undefined
}