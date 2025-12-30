import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { addPlayer } from "../../features/players/playerSlice";

function AddPlayer() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useAppDispatch();

    const onSubmit = async (data) => {
        await dispatch(addPlayer({
            name: data.name,
            role: data.role,
            basePrice: Number(data.basePrice),
            image: data.image || ""
        }));
        reset();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Add Player</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                    placeholder="Player Name"
                    {...register("name", { required: true })}
                    className="border p-2 w-full"
                />

                <select {...register("role")} className="border p-2 w-full">
                    <option>Batsman</option>
                    <option>Bowler</option>
                    <option>All-Rounder</option>
                    <option>Wicket Keeper</option>
                </select>

                <input
                    type="number"
                    placeholder="Base Price"
                    {...register("basePrice", { required: true })}
                    className="border p-2 w-full"
                />

                <input
                    placeholder="Image URL"
                    {...register("image")}
                    className="border p-2 w-full"
                />

                <button className="bg-blue-600 text-white px-4 py-2">
                    Add Player
                </button>
            </form>
        </div>
    );
}

export default AddPlayer;
