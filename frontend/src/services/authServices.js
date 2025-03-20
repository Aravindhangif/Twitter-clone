import { baseUrl } from "../constant/url.js";

export const fetchAuthUser = async () => {
    const res = await fetch(`${baseUrl}/api/auth/user`, { credentials: "include" });
    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json();
};
