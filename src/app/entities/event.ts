export interface Event {
    eventCode: string;
    eventName: string;
    eventType: string;
    eventDate: string;
    fingerprint: string
}
export interface NewEvent {
    eventName: string;
    eventCode: string;
    eventType: string;
    eventDate: string;
}
export interface EventDetails {
    id: string,
    name: string,
    code: string,
    type: string,
    date: string,
}