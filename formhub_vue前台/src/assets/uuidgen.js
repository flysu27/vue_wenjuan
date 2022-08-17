import UUID from "uuid";
export const uuid = () => UUID.v4().split("-").join("")