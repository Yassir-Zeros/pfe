
import PurpleOutlineButton from "./buttoon";
import { FcCheckmark } from "react-icons/fc"
import React, { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import axios from "axios";
export default function Notification() {
    const [lists, setList] = useState([]);
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState('');
    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            setUserdetail(res.data);
        });
    }
    const fetchInfo = async () => {
        return await fetch(`http://127.0.0.1:8000/api/notif/${userdetail.name}`)
            .then((response) => response.json())
            .then((data) => setList(data));
    }
    //--display stuff --//
    useEffect(async () => {
        fetchUserDetail()
        console.log(userdetail)
    }, []);
    useEffect(() => {
        if (userdetail.name) {
            fetchInfo();
        }
    }, [userdetail.name]);

    //--end user detail--
    const hundelSetData = async (id) => {
        await axios.put(`http://127.0.0.1:8000/api/update/${id}`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("succes")
                } else { alert("error") }
            })
            .catch(error => {
                console.log(error);
            });

        fetchInfo()
    }
    return (
        <div className="mt-1 data-table">
            <div className="data-table-main mt-3">
                <table>
                    <thead>
                    <tr>
                        <td> Num </td>
                        <td> Date </td>
                        <td> Sujet </td>
                        <td> Destinataire </td>
                        <td> Expéditeur</td>
                        <td> Ventilation</td>
                        <td> Employe </td>
                        <td>type courriel</td>
                        <td>Date de commission</td>
                        <td>La date précisée</td>
                        <td >status</td>
                        <td className="text-right">Update</td>
                    </tr>
                    </thead>
                    <tbody>
                    {lists.map((user, index) => (
                        <tr key={index}>
                            <td><h6>{user.id}</h6></td>
                            <td> {user.date} </td>
                            <td> {user.sujet} </td>
                            <td> {user.destinataire} </td>
                            <td>
                                {user.ubrique_envoyée}
                            </td>
                            <td>{user.intérêt} </td>
                            <td>{user.employe}</td>
                            <td className="text-center"><label
                                className="badge rounded-pill text-bg-dark "></label>{user.type_courriel}</td>
                            {user.type_courriel === "travail effectué" ? (
                                <>
                                    <td className="text-center">{user.datec}</td>
                                    <td className="text-center">{user.datep}</td>
                                </>
                            ) : (
                                <>
                                    <td className="text-center">-</td>
                                    <td className="text-center">-</td>
                                </>
                            )}
                            <td><span className="badge text-bg-danger">En Attendant</span></td>
                            <td className="text-right text-center">
                                <PurpleOutlineButton>
                                    <span onClick={() => hundelSetData(user.id)}> <FcCheckmark/></span>
                                </PurpleOutlineButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )}