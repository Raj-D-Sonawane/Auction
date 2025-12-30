import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loginUser } from "../../features/auth/authSlice"


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector((state) => state.auth.loading);

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/home")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <input
                    className="w-full p-2 border mb-2"
                    placeholder="Email"
                    {...register("email", { required: "Email is required " })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    className="w-full p-2 border mb-2"
                    placeholder="Password"
                    {...register("password", { required: "Password is required " })}
                />
                {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

                <button
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>




            </form>
        </div>
    )
}

export default Login