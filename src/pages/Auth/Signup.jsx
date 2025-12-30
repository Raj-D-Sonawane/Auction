import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { signupUser } from "../../features/auth/authSlice"

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const result = await dispatch(signupUser(data));
        console.log("Signup Data:", data);
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/login");
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

                <input
                    className="w-full p-2 border mb-2"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input
                    className="w-full p-2 border mb-2"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    type="password"
                    className="w-full p-2 border mb-4"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "min 8 characters" }
                    })}
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Signup
                </button>
            </form>
        </div>


    )
}

export default Signup