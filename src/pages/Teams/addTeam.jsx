import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { addTeam, updateTeam } from "../../features/teams/teamSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddTeam() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const editingTeam = location.state; // edit mode data

    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm();

    /* ================= PREFILL FORM (EDIT MODE) ================= */
    useEffect(() => {
        if (editingTeam) {
            setValue("name", editingTeam.name);
            setValue("budget", editingTeam.budget);
            setValue("logo", editingTeam.logo);
        }
    }, [editingTeam, setValue]);

    /* ================= SUBMIT ================= */
    const onSubmit = async (data) => {
        try {
            if (editingTeam) {
                await dispatch(
                    updateTeam({
                        id: editingTeam.$id,
                        data: {
                            name: data.name,
                            budget: Number(data.budget),
                            logo: data.logo || "",
                        },
                    })
                ).unwrap();

                alert("Team updated successfully ✅");
            } else {
                await dispatch(
                    addTeam({
                        name: data.name,
                        budget: Number(data.budget),
                        logo: data.logo || "",
                    })
                ).unwrap();

                alert("Team added successfully ✅");
            }

            reset();
            navigate("/teams");
        } catch (err) {
            alert("Something went wrong ❌");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
                {editingTeam ? "Edit Team" : "Add Team"}
            </h2>

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
                    {editingTeam ? "Update Team" : "Add Team"}
                </button>
            </form>
        </div>
    );
}

export default AddTeam;
