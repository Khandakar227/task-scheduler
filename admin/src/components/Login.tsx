import { FormEvent, useState } from "react";
import { ADMIN_API_URL } from "../assets/config";
import { toast } from "react-toastify";
import { useAdmin } from "../contexts/AdminContext";

export default function Login() {
    const { setAdmin } = useAdmin();
    const [loading, setLoading] = useState(false);

    async function loginAsAdmin(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const cred = Object.fromEntries(formData);
        try {
            setLoading(true);
            const res = await fetch(`${ADMIN_API_URL}/login`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cred)
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.message);
            } else {
                console.log(data);
                setAdmin(data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error((error as Error).message)
        } finally { setLoading(false) }
    }
    return (
        <section className="min-h-screen p-4 flex justify-center items-center bg-slate-100">
            <div className="p-4 rounded-md shadow max-w-md w-full bg-white">
                <form onSubmit={loginAsAdmin}>
                    <input type="text" name="name" id="name" className="w-full my-2 p-2 outline-none rounded-md shadow-sm" placeholder="Name" />
                    <input type="password" name="password" id="password" className="w-full my-2 p-2 outline-none rounded-md shadow-sm" placeholder="Password" />
                    <button disabled={loading} className="w-full rounded-md px-4 py-2 bg-green-600 text-white">{loading ? "Loading..." : "Log in"}</button>
                </form>
            </div>
        </section>
    )
}
