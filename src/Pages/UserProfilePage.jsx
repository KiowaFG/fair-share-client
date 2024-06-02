import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import supabase from "../utils/config";
import "./UserProfilePage.css"
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const UserProfilePage = () => {

    const storedToken = localStorage.getItem("authToken");
    const { user, setUser, avatarPic, setAvatarPic } = useContext(AuthContext);
    const [userData, setUserData] = useState("")
    const [messageOutput, setMessageOutput] = useState("")

    const getUser = () => {
        axios
            .get(
                `${API_URL}/user/${user._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => setUserData(response.data))//setGroups(response.data))
            .catch((error) => console.log(error));
    };

    const uploadImage = async (e) => {
        const avatarFile = e.target.files[0];
        const randomName = `profile_picture_${user._id}_${Math.ceil(Math.random() * 1000000)}`
        const { data, error } = await supabase.storage
            .from("fair-share")
            .upload(`${randomName}.png`, avatarFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.log("Error uploading file: ", error.message);
            return;
        };

        const pic_path = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

        axios
            .put(
                `${API_URL}/user/${user._id}`,
                {profilePic: pic_path},
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((profilePicUpdated) => {
                setMessageOutput(profilePicUpdated.data.message);
            })
            .catch((error) => {
                setMessageOutput(error.response.data.message);
            });

        setAvatarPic(
        `${import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/${data.fullPath}`
        );
    };

    const handleInput = (e) => {
        setMessageOutput(null);
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .put(
                `${API_URL}/user/${user._id}`,
                userData,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((userUpdated) => {
                setMessageOutput(userUpdated.data.message);
                setUser({ ...user, name: userData.name }); // check with Marcel!
            })
            .catch((error) => {
                setMessageOutput(error.response.data.message);
            });
    };

    useEffect(() => {
        user && getUser();
    }, [user]);

    return (
        <div className="user-profile-container">
            <h3>{userData && `Hello ${user.name}!`}</h3>
            <img src={avatarPic} />
            <div>
                <form className="user-profile-form">
                    <label htmlFor="name">
                        User Name
                    </label>
                    <input
                        onChange={handleInput}
                        type="text"
                        name="name"
                        value={userData && userData.name}
                    />
                    <label htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        onChange={handleInput}
                        type="text"
                        name="lastName"
                        value={userData && userData.lastName}
                    />
                    <label htmlFor="dateOfBirth">
                        Date Of Birth
                    </label>
                    <input
                        onChange={handleInput}
                        type="date"
                        name="dateOfBirth"
                        value={userData && userData.dateOfBirth.split("T")[0]}
                    />
                    <label htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input
                        onChange={handleInput}
                        type="text"
                        name="phoneNumber"
                        value={userData && userData.phoneNumber}
                    />
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        onChange={handleInput}
                        type="text"
                        name="email"
                        value={userData && userData.email}
                    />
                    <label htmlFor="profile">
                        Profile Picture
                    </label>
                    <input
                        onChange={uploadImage}
                        type="file"
                        name="profile"
                    />
                    <button>Remove file</button> {/* ask Marcel */}
                    <button onClick={handleSubmit}>Save</button>
                </form>
                <p>{messageOutput && messageOutput}</p>
            </div>
        </div>
    )
}

export default UserProfilePage;