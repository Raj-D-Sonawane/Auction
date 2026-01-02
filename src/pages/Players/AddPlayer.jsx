import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { addPlayer, updatePlayer } from "../../features/players/playerSlice";
import { useLocation, useNavigate } from "react-router-dom";

function AddPlayer() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const editingPlayer = location.state; // null or player object

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: editingPlayer
            ? {
                name: editingPlayer.name,
                role: editingPlayer.role,
                basePrice: editingPlayer.basePrice,
                image: editingPlayer.image,
            }
            : {},
    });

    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            role: data.role,
            basePrice: Number(data.basePrice),
            image: data.image || "",
        };

        try {
            if (editingPlayer) {
                // ✏️ UPDATE
                await dispatch(
                    updatePlayer({
                        id: editingPlayer.$id,
                        data: payload,
                    })
                ).unwrap();

                alert("Player updated successfully ✅");
            } else {
                // ➕ ADD
                await dispatch(addPlayer(payload)).unwrap();
                alert("Player added successfully ✅");
            }

            reset();
            navigate("/players");
        } catch (error) {
            alert("Something went wrong ❌");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">
                {editingPlayer ? "Edit Player" : "Add Player"}
            </h2>

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

                <button className="bg-blue-600 text-white px-4 py-2 w-full">
                    {editingPlayer ? "Update Player" : "Add Player"}
                </button>
            </form>
        </div>
    );
}

export default AddPlayer;
