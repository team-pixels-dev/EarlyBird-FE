export function serverToClient(id : string) {
    return "m_id_" + id;
}

export function clientToServer(id : string) {
    return id.substring(5);
}