import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";


export default function checkAuth({ auth_token, id }: { auth_token: string, id: string }) {
    const decoded = jwtDecode(auth_token);
    if (!decoded.sub) {
        console.log("auth_token is invalid");
        throw new Error("Auth Token is not valid")
    }

    if (decoded.sub !== id) {
        console.log("auth_token and id mismatch");
        throw new Error("Auth Token and id mismatch")
    };
}