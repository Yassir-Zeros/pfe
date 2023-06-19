
import PurpleOutlineButton from "./buttoon";
import {MdAddCircle} from "react-icons/md"
import {RxUpdate} from 'react-icons/rx';
import {CiExport} from 'react-icons/ci';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AuthUser from './AuthUser';

export default function CourrierAr() {
    const [lists, setList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredlists, setFilteredlists] = useState([]);
    const [mailState, setMailState] = useState("all");
    const {http} = AuthUser();
    const [settings, setSettings] = useState([]);
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        return await fetch("http://127.0.0.1:8000/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }
    const fetchSettings = async () => {
        return await fetch("http://127.0.0.1:8000/api/settings")
            .then((response) => response.json())
            .then((data) => setSettings(data));
    }
    
    //--display stuff --//
    const [currentPage, setCurrentPage] = useState(1);
    const [mailsPerPage] = useState(6);
    const indexOfLastMail = currentPage * mailsPerPage;
    const indexOfFirstMail = indexOfLastMail - mailsPerPage;
    let currentLists = filteredlists.slice(indexOfFirstMail, indexOfLastMail);
    const fetchInfo = async () => {
        return await fetch("http://127.0.0.1:8000/api/gestion")
            .then((response) => response.json())
            .then((data) => setList(data));
    }
    useEffect(() => {
        fetchSettings()
        fetchInfo()
        fetchUsers()
        fetchUserDetail()
    }, [])
    useEffect(() => {
        let filteredMails = [];
        if (mailState === "recu") {
            filteredMails = lists.filter((user) => user.status === "1" && (
                user.sujet.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.employe.toLowerCase().includes(searchInput.toLowerCase())
            ));
        } else if (mailState === "en_att") {
            filteredMails = lists.filter((user) => user.status === "0" && (
                user.sujet.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.employe.toLowerCase().includes(searchInput.toLowerCase())
            ));
        } else {
            filteredMails = lists.filter((user) =>
                user.sujet.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.employe.toLowerCase().includes(searchInput.toLowerCase())
            );
        }
        setFilteredlists(filteredMails);
    }, [searchInput, lists, mailState]);

    //--end display stuff--
    //--store stuff--
    const [image, setImage] = useState("");
    const [responseMsg, setResponseMsg] = useState({
        status: "",
        message: "",
        error: "",
    });
    const [formData, setFormData] = useState({})
    const handleImageChange = (e) => {
        const imagesArray = [];
        let isValid = "";

        for (let i = 0; i < e.target.files.length; i++) {
            isValid = fileValidate(e.target.files[i]);
            imagesArray.push(e.target.files[i]);
        }
        setImage(imagesArray);
    };

    const fileValidate = (file) => {
        if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
        ) {
            setResponseMsg({error: ""});
            return true;
        } else {
            setResponseMsg({error: "File type allowed only jpg, png, jpeg"});
            return false;
        }
    };
    const handleChangeform = event => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
            type: "reçu",
            employe: userdetail.name,
        });
    }
    const handleSubmit = async event => {
        event.preventDefault();
        console.log("works")
        const data = new FormData();
        for (let i = 0; i < image.length; i++) {
            data.append("images[]", image[i]);
        }
        await axios.post("http://localhost:8000/api/images", data).then((response) => {
            if (response.status === 200) {
                setResponseMsg({
                    status: response.data.status,
                    message: response.data.message,
                });
                document.querySelector("#imageForm").reset();
            }
        })
            .catch((error) => {
                console.error(error);
            });
        await axios.post('http://127.0.0.1:8000/api/gestion', formData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("succes")
                } else {
                    alert("error")
                }
            })
            .catch(error => {
                console.log(error);
            })

        await fetchInfo()
    }
    const handleChange = event => {
        setSearchInput(event.target.value);
    }
    //--end store stuff--
    //--update stuff--
    const [formDataUpdate, setFormDataUpdate] = useState({})
    const hundleUpdateSubmit = async (event) => {
        console.log(formDataUpdate)
        event.preventDefault();
        await axios.put(`http://127.0.0.1:8000/api/gestion/${formDataUpdate.id}`, formDataUpdate)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("succes")
                } else {
                    alert("error")
                }
            })
            .catch(error => {
                console.log(error);
            });
        await fetchInfo()
    }
    const handleChangeUpdateform = event => {
        setFormDataUpdate({
            ...formDataUpdate,
            [event.target.id]: event.target.value,
            type: "reçu",
        });
    }
    const updateValuies = (id) => {
        setFormDataUpdate(filteredlists.find((result => result.id === id)))
    }
    //--end update stuff--
    //--user detail stuff--
    const [userdetail, setUserdetail] = useState([]);
    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            setUserdetail(res.data);

        });
    }

    //--end user detail--
    return (<>
            <div className="mt-1 data-table">
                <div className="data-table-header row">
                    <div className="tabs d-flex align-items-end col">
                        <div className={`tab${mailState === "all" ? " active" : ""} p-3`} onClick={() => {setMailState("all"); console.log(mailState)}}>All</div>
                        <div className={`tab${mailState === "recu" ? " active" : ""} py-3 px-4`} onClick={() => {setMailState("recu"); console.log(mailState)}}>Recu</div>
                        <div className={`tab${mailState === "en_att" ? " active" : ""} py-3 px-4`} onClick={() => {setMailState("en_att"); console.log(mailState)}}>En Attendant</div>
                    </div>

                    <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add new one</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data" id="imageForm">
                                        <div className="mb-3">
                                            <label htmlFor="sujet" className="form-label">sujet</label>
                                            <input type="text" className="form-control" id="sujet"
                                                   aria-describedby="emailHelp" required onChange={handleChangeform}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="destinataire" className="form-label">destinataire</label>
                                            <select className="form-select" id="destinataire"
                                                   aria-describedby="emailHelp" required onChange={handleChangeform}>
                                                    {users.map((setting, index) => (
                                                    
                                                        <option value={setting.name}>{setting.name}</option>
                                                ))
                                                }
                                                </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="ubrique_envoyée" className="form-label">Expéditeur</label>
                                            <select
                                                className="form-select"
                                                id="ubrique_envoyée"
                                                onChange={handleChangeform}>
                                                {settings.map((setting, index) => (
                                                    setting.type === "Expéditeur" ?

                                                        <option value={setting.val}>{setting.val}</option>
                                                        : <></>
                                                ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="intérêt" className="form-label">Ventilation</label>
                                            <select
                                                className="form-select"
                                                id="intérêt"
                                                onChange={handleChangeform}>
                                                {settings.map((setting, index) => (
                                                    setting.type === "Ventilation" ?

                                                        <option value={setting.val}>{setting.val}</option>
                                                        : <></>
                                                ))
                                                }
                                            </select>
                                        </div>
                                        <div className="container ">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                multiple
                                                                onChange={handleImageChange}
                                                                className="form-control"
                                                            />
                                                            <span className="text-danger">
                                                            {responseMsg.error}
                                                        </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <PurpleOutlineButton dataDismiss={"modal"}
                                                                 type={"reset"}>Close</PurpleOutlineButton>
                                            <PurpleOutlineButton dataDismiss={"modal"} type={"submit"}>Save
                                                change </PurpleOutlineButton>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="actions d-flex col-md-8 mt-3 mt-md-0">
                        <input onChange={handleChange} className="form-control mt-2 rounded me-3" placeholder="Search for clients, Business ..."/>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i className="fa-solid fa-bars me-3"></i>
                            Create new note
                        </button>
                    </div>
                </div>
                <div className="data-table-main mt-3">
                    <table>
                        <thead>
                        <tr>
                            <td>Num</td>
                            <td>Date</td>
                            <td>Sujet</td>
                            <td>Destinataire</td>
                            <td>Expéditeur</td>
                            <td>Ventilation</td>
                            <td>Employe</td>
                            <td>Status</td>
                            {userdetail.role === 1 ? (
                                <td>Update</td>
                            ) : ""
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {currentLists.map((mail, index) => (
                            <tr key={index}>
                                <th>{mail.id}</th>
                                <td>{mail.date}</td>
                                <td>{mail.sujet}</td>
                                <td>{mail.destinataire}</td>
                                <td>
                                    {mail.ubrique_envoyée}
                                </td>
                                <td>{mail.intérêt} </td>
                                <td>{mail.employe}</td>
                                <td>{mail.status === "0" ? (
                                        <>
                                            <span className="text-danger">en attendant</span>
                                        </>
                                    ) :
                                    (<span className="center text-success">reçu</span>)


                                }
                                </td>
                                {userdetail.role === 1 ? (
                                    <td className="text-right text-center">
                                        <PurpleOutlineButton onClick={() => {
                                            updateValuies(mail.id)
                                        }} datToggle={"modal"} dataTarget={"#exampleModal"}>
                                            <RxUpdate/>
                                        </PurpleOutlineButton>

                                    </td>
                                ) : ""
                                }
                                <div className="modal fade" id="exampleModal" tabIndex="-1"
                                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h6>Modifier</h6>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={hundleUpdateSubmit} encType="multipart/form-data"
                                                      id="imageForm">
                                                    <div className="mb-3">
                                                        <label htmlFor="sujet" className="form-label">sujet</label>
                                                        <input type="text" className="form-control"
                                                               value={formDataUpdate.sujet} id="sujet"
                                                               aria-describedby="emailHelp"
                                                               onChange={handleChangeUpdateform}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="destinataire"
                                                               className="form-label">destinataire</label>
                                                        <input type="text" className="form-control"
                                                               value={formDataUpdate.destinataire} id="destinataire"
                                                               aria-describedby="emailHelp"
                                                               onChange={handleChangeUpdateform}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="ubrique_envoyée"
                                                               className="form-label">Expéditeur</label>
                                                        <select className="form-select"
                                                                value={formDataUpdate.ubrique_envoyée}
                                                                onChange={handleChangeUpdateform} id="ubrique_envoyée">
                                                            {settings.map((setting, index) => (
                                                                setting.type === "Expéditeur" ?

                                                                    <option value={setting.val}>{setting.val}</option>
                                                                    : <></>
                                                            ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="intérêt" className="form-label">Ventilation</label>
                                                        <select className="form-select" value={formDataUpdate.intérêt}
                                                                onChange={handleChangeUpdateform} id="intérêt">
                                                            {settings.map((setting, index) => (
                                                                setting.type === "Ventilation" ?

                                                                    <option value={setting.val}>{setting.val}</option>
                                                                    : <></>
                                                            ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <input type="date" hidden className="form-control" id="date"
                                                           value={formDataUpdate.employe} aria-describedby="emailHelp"
                                                           onChange={handleChangeUpdateform}/>
                                                    <div className="modal-footer">
                                                        <PurpleOutlineButton dataDismiss={"modal"}
                                                                             type={"reset"}>Close</PurpleOutlineButton>
                                                        <PurpleOutlineButton dataDismiss={"modal"} type={"submit"}>Save
                                                            change </PurpleOutlineButton>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="m-2 d-grid gap-2 d-md-block">
                <PurpleOutlineButton className={"me-2"} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </PurpleOutlineButton>
                <PurpleOutlineButton onClick={() => setCurrentPage(currentPage + 1)}
                                     disabled={currentPage === Math.ceil(lists.length / mailsPerPage)}>
                    Next
                </PurpleOutlineButton>
            </div>
        </>

    )
}