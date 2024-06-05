import axios from 'axios';
import supabase from '../../utils/config';
import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../context/auth.context';
import { useNavigate, useParams } from 'react-router-dom';
import closeBtn from "../../assets/X.png"
import "./AddGroup.css"

const API_URL = import.meta.env.VITE_API_URL

function AddGroup({ setShowAddGroup }) {

    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [selectUsers, setSelectUsers] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        groupAuthor: user._id,
        groupUsers: user._id,
        groupPic: ''
    });


    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeUsers = (e) => {
        const users_selected = e.map((user) => user.value);
        setFormData({
            ...formData,
            groupUsers: users_selected
        });
    };

    const handleSelectUsers = () => {
        axios
            .get(
                `${API_URL}/user`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                let data = response.data;
                data = data.map((user) => { return { value: user._id, label: `${user.name} ${user.lastName}` } });
                setSelectUsers(data.filter((userFilter) => userFilter.value !== user._id));
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            groupUsers: formData.groupUsers.push(user._id)
        });

        axios.post(
            `${API_URL}/groups/`,
            formData,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((data) => { navigate("/home") })
            .catch((error) => { console.log("there has been an error") })

        setShowAddGroup(false);
    };

    const uploadImage = async (e) => {
        const groupFile = e.target.files[0];
        const randomName = `group_picture_${user._id}_${Math.ceil(Math.random() * 1000000)}`
        const { data, error } = await supabase.storage
            .from("fair-share")
            .upload(`${randomName}.png`, groupFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.log("Error uploading file: ", error.message);
            return;
        };

        const pic_path = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

        setFormData({
            ...formData,
            "groupPic": pic_path
        });
    };

    useEffect(() => {
        handleSelectUsers()
    }, []);

    return (
        <div className='formWrap'>
            <img onClick={() => setShowAddGroup(false)} className='closeBtn' src={closeBtn} alt="" />
            <div className='groupFrom'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label>Users:</label>
                        <Select options={selectUsers} name="users" onChange={handleChangeUsers} isMulti />
                    </div>
                    <div>
                        <label> Image:</label>
                        <input
                            type="file"
                            name="image"
                            value={formData.image}
                            onChange={uploadImage}
                        />
                        {formData.groupPic && <img className='group-picture' src={formData.groupPic}></img>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div >
        </div >
    );
}

export default AddGroup;