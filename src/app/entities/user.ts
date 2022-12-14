export interface User {
    userId: number,
    username: string,
    userEmail: string,
    userPassword: string,
    userFullName: string,
    userOccupation: string
}
export interface NewUser {
    username: string,
    userEmail: string,
    userPassword: string,
    userFullName: string,
    userOccupation: string
}
export interface UserDetails {
    id: number,
    username: string,
    email: string,
    password: string,
    fullname: string,
    occupation: string;
    token: string
}
export interface ParticipantDetails {
    userId: number;
    userFullName: String;
    userEmail: String;
    participantStatus: String;
    attendanceProved: boolean;

}
