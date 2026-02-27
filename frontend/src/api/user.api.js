
import api from "./client";

export const getCurrentUSer = () => {
    return api.get("user/current")
}

