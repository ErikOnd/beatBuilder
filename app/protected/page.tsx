import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function ProtectedPoute() {
    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/api/auth/signin")
    }

    return(
        <>This is a protected route</>
    )
}