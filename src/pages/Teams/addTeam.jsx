import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { addTeam } from "../../features/teams/teamSlice";

function AddTeam() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useAppDispatch();

    const onSubmit = async (data) => {
        await dispatch(addTeam({
            name: data.name,
            budget: Number(data.budget),
            logo: data.logo || ""
        }));
        reset();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Add Team</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                    placeholder="Team Name"
                    {...register("name", { required: true })}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Budget"
                    {...register("budget", { required: true })}
                    className="border p-2 w-full"
                />

                <input
                    placeholder="Logo URL"
                    {...register("logo")}
                    className="border p-2 w-full"
                />

                <button className="bg-green-600 text-white px-4 py-2">
                    Add Team
                </button>
            </form>
        </div>
    );
}

export default AddTeam;
