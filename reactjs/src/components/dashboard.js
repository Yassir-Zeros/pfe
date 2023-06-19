import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthUser from './AuthUser';
export default function Dashboard() {
    const [lists, setList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredlists, setFilteredlists] = useState([]);
    const { http } = AuthUser();
    //--display stuff --//
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUsers = filteredlists.slice(indexOfFirstUser, indexOfLastUser);
    const fetchInfo = async () => {
        return await fetch("http://127.0.0.1:8000/api/gestion")
            .then((response) => response.json())
            .then((data) => setList(data));
    }
    useEffect(() => {
        fetchInfo()
        fetchUserDetail()
    }, [])
    useEffect(() => {
        setFilteredlists(
            lists.filter(user =>
                user.sujet.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.employe.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [searchInput, lists]);
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
            setResponseMsg({ error: "" });
            return true;
        } else {
            setResponseMsg({ error: "File type allowed only jpg, png, jpeg" });
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
                } else { alert("error") }
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
                } else { alert("error") }
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
            employe: "user",
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

    return (
        <div className="container mt-5">
            <div className="col-12 bg-light">
                <div className="card table-card">
                    <div className="card-header">
                        <div className="row justify-content-between">
                            <h5 className="col-3" >Projects</h5>
                            <div className="col-2 ">
                                <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    Add
                                </button>
                                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add new one</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleSubmit} encType="multipart/form-data" id="imageForm">
                                                    <div className="mb-3">
                                                        <label htmlFor="intérêt" className="form-label">intérêt</label>
                                                        <input type="text" className="form-control" id="intérêt" aria-describedby="emailHelp" required onChange={handleChangeform} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="ubrique_envoyée" className="form-label">ubrique envoyée</label>
                                                        <input type="text" className="form-control" id="ubrique_envoyée" onChange={handleChangeform} required aria-describedby="emailHelp" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="destinataire" className="form-label">destinataire</label>
                                                        <input type="text" className="form-control" id="destinataire" aria-describedby="emailHelp" required onChange={handleChangeform} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="sujet" className="form-label">sujet</label>
                                                        <input type="text" className="form-control" id="sujet" aria-describedby="emailHelp" required onChange={handleChangeform} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="date" className="form-label">date</label>
                                                        <input type="date" className="form-control" id="date" aria-describedby="emailHelp" required onChange={handleChangeform} />
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
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-secondary">Print</button>
                            </div>
                        </div>
                        <div className="input-group pt-5">
                            <input type="text" className="form-control" onChange={handleChange} placeholder="Employe username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-5">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 " style={{ backgroundColor: "white" }}>
                            <thead>
                                <tr> <th>Num</th>
                                    <th>Date</th>
                                    <th>Sujet</th>
                                    <th>le destinataire</th>
                                    <th>Rubrique envoyée</th>
                                    <th>l'intérêt</th>
                                    <th>EMPLOYÉ</th>
                                    {userdetail.role === 1 ? (
                                        <th className="text-right">Update</th>
                                    ) : ""
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-inline-block align-middle">
                                                <div className="d-inline-block">
                                                    <h6>{user.id}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.date}</td>
                                        <td>{user.sujet}</td>
                                        <td>{user.destinataire}</td>
                                        <td>{user.ubrique_envoyée}</td>
                                        <td>{user.intérêt}</td>
                                        <td className="text-right text-center"><label className="badge rounded-pill text-bg-dark "></label>{user.employe}</td>
                                        {userdetail.role === 1 ? (
                                            <td className="text-right text-center"><button type="button" onClick={() => { updateValuies(user.id) }} className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">!</button></td>
                                        ) : ""
                                        }

                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">

                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={hundleUpdateSubmit} encType="multipart/form-data" id="imageForm">

                                                            <div className="mb-3">
                                                                <label htmlFor="intérêt" className="form-label">intérêt</label>
                                                                <input type="text" className="form-control" id="intérêt" value={formDataUpdate.intérêt} aria-describedby="emailHelp" onChange={handleChangeUpdateform} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="ubrique_envoyée" className="form-label">ubrique envoyée</label>
                                                                <input type="text" className="form-control" value={formDataUpdate.ubrique_envoyée} id="ubrique_envoyée" onChange={handleChangeUpdateform} aria-describedby="emailHelp" />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="destinataire" className="form-label">destinataire</label>
                                                                <input type="text" className="form-control" value={formDataUpdate.destinataire} id="destinataire" aria-describedby="emailHelp" onChange={handleChangeUpdateform} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="sujet" className="form-label">sujet</label>
                                                                <input type="text" className="form-control" value={formDataUpdate.sujet} id="sujet" aria-describedby="emailHelp" onChange={handleChangeUpdateform} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="date" className="form-label">date</label>
                                                                <input type="date" className="form-control" id="date" value={formDataUpdate.date} aria-describedby="emailHelp" onChange={handleChangeUpdateform} />
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary" >Save changes</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>

                                ))}
                                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(lists.length / usersPerPage)}>
                                    Next
                                </button>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}