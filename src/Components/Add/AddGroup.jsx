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
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        groupAuthor: user._id,
        groupUsers: user._id,
        groupPic: "https://tgcxojdndrjkwxfwxjvw.supabase.co/storage/v1/object/public/fair-share/profile_picture_6659aedd0ba6e3a417794481_388493.png"
    });


    const handleChange = (e) => {
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

        if (Object.values(formData).includes("")) {
            setErrorMessage("Please fill all the information");
            setTimeout(() => { setErrorMessage(null) }, 2000);
        } else {
            setFormData({
                ...formData,
                groupUsers: formData.groupUsers.push(user._id)
            });

            axios.post(
                `${API_URL}/groups/`,
                formData,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    setErrorMessage("Group added!");
                    setTimeout(() => {
                        setErrorMessage(null);
                        setShowAddGroup(false);
                        navigate(`/details/${response.data._id}`)
                    }, 2000);
                })
                .catch((error) => { console.log("there has been an error") })
        };
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
        <div className='formWraperWraper-group'>
            <div className='formWraper-group'>
                {/* <img onClick={() => setShowAddGroup(false)} className='closeBtn' src={closeBtn} alt="" /> */}
                <div className='groupFrom'>
                    <form onSubmit={handleSubmit}>
                        <div className='column-form'>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange} />
                        </div>
                        <div className='column-form'>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange} />
                        </div>
                        <div className='column-form'>
                            <label>Users:</label>
                            <Select options={selectUsers} name="users" onChange={handleChangeUsers} isMulti />
                        </div>
                        <div className='column-form'>
                            <label> Image:</label>
                            <div className='row-form1'>
                                <input
                                    type="file"
                                    name="image"
                                    value={formData.image}
                                    onChange={uploadImage}
                                />
                                {formData.groupPic && <img className='group-form-picture' src={formData.groupPic}></img>}
                            </div>
                        </div>
                        <div className='row-form2'>
                            <button className='button-form' type="submit">Submit</button>
                            <button className='button-form' onClick={() => setShowAddGroup(false)} type="submit">Cancel</button>
                        </div>
                        {errorMessage && <p className={errorMessage === "Group added!" ? "message-green" : "message-red"}>{errorMessage}</p>}
                    </form>
                </div >
            </div >
        </div>
    );
}

export default AddGroup;