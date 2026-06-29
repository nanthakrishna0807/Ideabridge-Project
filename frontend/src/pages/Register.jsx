const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/auth/register", {
            ...formData,
            role,
        });

        console.log("Registration Success:", response.data);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        toast.success("Registration successful! Welcome to IdeaBridge.");

        const userRole = response.data.role?.toLowerCase();

        if (userRole === "admin") {
            navigate("/admin");
        } else if (userRole === "investor") {
            navigate("/investor");
        } else if (userRole === "entrepreneur") {
            navigate("/entrepreneur");
        } else if (userRole === "student" || userRole === "emerging") {
            navigate("/developer");
        } else {
            navigate("/developer");
        }

    } catch (error) {

        console.error("Registration Error:", error.response?.data);
        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );
    }
};