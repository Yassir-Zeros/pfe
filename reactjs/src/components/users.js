import "../style/table.css"
import PurpleOutlineButton from "./buttoon";
import { MdAddCircle } from "react-icons/md"
import { CiExport } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
export default function Users() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [formData, setFormData] = useState({});
    const {http} = AuthUser();
    const fetchInfo = async () => {
        return await fetch("http://127.0.0.1:8000/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }
    useEffect(() => {
        fetchInfo()
    }, [])
    useEffect(() => {
        setFilteredUsers(
            users.filter(user => user.name.toLowerCase().includes(searchInput.toLowerCase()))
        );
        console.log("opened")
    }, [users])

    const handleSubmit  = async (event) => {
        console.log(formData)
        event.preventDefault();
        http.post('/users',formData).then((res)=>{
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
              await fetchInfo()
    }
    const hundelDelete = (idUser) => {
        console.log(idUser)
    }

    const handleChange = event => {
        setSearchInput(event.target.value);
    }

    const handleChangeform = event => {
        console.log("modal")
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
       
    }
    //--end user detail--
    return (
        <main className="table">
            <section className="table__header rounded" >
                <h1>Users</h1>
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add new one</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <label htmlFor="employe" className="form-label">Name :</label>
                                                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={handleChangeform} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="intérêt" className="form-label">Email :</label>
                                                        <input type="text" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChangeform} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="ubrique_envoyée" className="form-label">Password :</label>
                                                        <input type="password" className="form-control" id="password" onChange={handleChangeform} aria-describedby="emailHelp" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="ubrique_envoyée" className="form-label">Role :</label>
                                                        <select
                                                            className="form-select"
                                                            size="2"
                                                            id="role"
                                                            aria-label="size 2 select example"
                                                            onChange={handleChangeform}>
                                                            <option value="1">Admin</option>
                                                            <option value="0">User</option>
                                                        </select>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary" data-bs-toggle="modal">Save changes</button>
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                <div className="export__file">
                    <PurpleOutlineButton datToggle={"modal"} dataTarget={"#exampleModal2"}>
                        Add new <MdAddCircle style={{ fontSize: "20px" }} />
                    </PurpleOutlineButton>
                </div>
            </section>
            <section className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                                    <th>Email</th>
                                    <th >Role</th>
                                    <th >Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-inline-block align-middle">
                                                <div className="d-inline-block">
                                                    <h6>{user.name}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        {user.role == 1 ?(<td>Admin</td>):(<td>User</td>)}
                                        <td className="text-right">
                                            <button type="button" className="btn btn-primary btn-sm mx-2" data-bs-toggle="modal" data-bs-target={`#exampleModal-${index}`}> edit</button><button type="button" className="btn btn-danger btn-sm" onClick={hundelDelete(user.id)}> delete</button>
                                        </td>
                                        <div className="modal fade" id={`exampleModal-${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">test</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {user.name}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" >Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}