export function convertScheduleIdServerToClient(id : string) {
    return "m_id_" + id;
}

export function convertScheduleIdClientToServer(id : string) {
    return id.substring(5);
}