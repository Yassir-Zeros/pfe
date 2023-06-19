import React, {useEffect, useState} from "react";
import "../style/table.css"
import PurpleOutlineButton from "./buttoon";
import {MdAdd, MdAddCircle} from "react-icons/md";
import {CiExport} from "react-icons/ci";
import axios from "axios";
import {MdOutlineDeleteForever} from "react-icons/md";
export default function Settings(){
    const [venInput, setVenInput] = useState(null);
    const [expInput,setExpInput] = useState(null)
    const [settings, setSettings] = useState([]);
    const fetchInfo = async () => {
        return await fetch("http://127.0.0.1:8000/api/settings")
            .then((response) => response.json())
            .then((data) => setSettings(data));
    }
    const  hundleSumbitVen = async (event) => {
        event.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/settings',{"type":"Ventilation","val":venInput}).then((res)=>{
            console.log(res);
        })
            .catch(error => {
                console.log(error);
            })
        fetchInfo()
        document.querySelector("#expForm").reset();
    }
    const  hundleSumbitExp = async (event) => {
        event.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/settings',{"type":"Expéditeur","val":expInput}).then((res)=>{
            console.log(res);
        })
            .catch(error => {
                console.log(error);
            })
        fetchInfo()
        document.querySelector("#expForm").reset();
    }
    const hundledelete = async (set)=>{
        console.log(set)
        await axios.delete(`http://127.0.0.1:8000/api/delSettings/${set.id}`).then((res)=>{
            console.log(res);
        })
            .catch(error => {
                console.log(error);
            })
        fetchInfo()
    }
    useEffect(() => {
        fetchInfo()
        console.log(settings)
    }, []);

return(
    <>
        <main className="table">
            <section className="table__header rounded">
                <h1>Settings</h1>
            </section>
            <section className="table__body">
                <table >
                    <tr>
                        <th>
                            Expéditeures
                        </th>
                        <td>
                            <select className="form-select">
                                <option selected>See All Expéditeures</option>
                                {settings.map((setting,index)=>(
                                    setting.type === "Expéditeur"?

                                            <option disabled>{setting.val}</option>
                                       :<></>
                                ))
                                }
                            </select>
                        </td>
                        <td>
                            <PurpleOutlineButton datToggle={"modal"} dataTarget={"#expModal"}> modify</PurpleOutlineButton>
                            <div class="modal fade" id="expModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Expéditeures</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                                <form onSubmit={hundleSumbitExp} id="expForm">
                                                    <table>
                                                        <tr>
                                                            <td><input className="form-control form-control-sm " type="text" placeholder="Expéditeur" onChange={e=>setExpInput(e.target.value)}required/></td>
                                                            <td>
                                                                <PurpleOutlineButton type={"submit"}><MdAddCircle size={20}/></PurpleOutlineButton>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </form>
                                            <table className="table table-striped-columns table-hover">
                                                    <tbody>
                                                    {settings.map((setting,index)=>(
                                                        setting.type === "Expéditeur"?
                                                            <div className="input-group mb-3 ">
                                                                <input disabled type="text" className="form-control form-control-sm" value={setting.val} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                                    <span className="form-control-sm bg-danger" onClick={()=>hundledelete(setting)} id="basic-addon2"><MdOutlineDeleteForever size={18} color={"white"}/></span>
                                                            </div>
                                                         :<></>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Ventilation
                        </th>
                        <td>
                            <select className="form-select">
                                <option selected>See All Ventilation</option>
                                {settings.map((setting, index) => (
                                    setting.type === "Ventilation" ?

                                        <option disabled>{setting.val}</option>
                                        : <></>
                                ))
                                }
                            </select>
                        </td>
                        <td>
                            <PurpleOutlineButton datToggle={"modal"}
                                                 dataTarget={"#venModal"}> modify</PurpleOutlineButton>
                            <div className="modal fade" id="venModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ventilation</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={hundleSumbitVen} id="venForm">
                                                <table>
                                                    <tr>
                                                        <td><input className="form-control form-control-sm " type="text" placeholder="Ventilation" onChange={e => setVenInput(e.target.value)} required/></td>
                                                        <td>
                                                            <PurpleOutlineButton type={"submit"}><MdAddCircle
                                                                size={20}/></PurpleOutlineButton>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </form>
                                            <table className="table table-striped-columns table-hover">
                                                <tbody>
                                                {settings.map((setting, index) => (
                                                    setting.type === "Ventilation" ?
                                                        <div className="input-group mb-3 ">
                                                            <input disabled type="text"
                                                                   className="form-control form-control-sm"
                                                                   value={setting.val} aria-label="Recipient's username"
                                                                   aria-describedby="basic-addon2"/>
                                                            <span className="form-control-sm bg-danger"
                                                                  onClick={() => hundledelete(setting)}
                                                                  id="basic-addon2"><MdOutlineDeleteForever size={18}
                                                                                                            color={"white"}/></span>
                                                        </div>
                                                        : <></>
                                                ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </section>
        </main>
    </>
)
}