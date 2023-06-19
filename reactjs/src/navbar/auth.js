import {Routes, Route, Link} from 'react-router-dom';
import CourrierDepart from '../components/courrierDepart';
import Test from '../components/test';
import {MdMarkEmailRead, MdNotificationsActive, MdOutgoingMail} from "react-icons/md"
import CourrierAr from '../components/courrier_ar';
import AuthUser from '../components/AuthUser';
import React, {useEffect, useState} from 'react';
import Users from '../components/users';
import Notification from '../components/notification';
import Settings from "../components/Settings";
import "../components/assets/sass/_main.scss"
import "../components/assets/sass/_aside.scss"
import {CgProfile} from "react-icons/cg";
import {RiUserStarFill} from "react-icons/ri";


function Auth() {

    const [userdetail, setUserdetail] = useState('');
    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            setUserdetail(res.data);
        });
    }

    const {token, logout} = AuthUser();
    const {http} = AuthUser();
    const logoutUser = () => {
        if (token !== undefined) {
            logout();
        }
    }
    useEffect(() => {
        if (!userdetail) {
            fetchUserDetail()
            console.log(userdetail)
        }
    }, [userdetail]);

    function renderelement() {
        if (userdetail) {
            return (
                <>
                    <div className="root">
                        <aside className="p-3 d-none d-md-block">
                            <h1>Prodware</h1>
                            <ul>
                                <li>
                                    <Link className={` ${window.location.pathname === '/' ? 'active' : ''}`} to="/"
                                    ><i className="me-3"><MdMarkEmailRead size={20}/></i>Courrier Arrivee</Link
                                    >
                                </li>
                                <li>
                                    <Link
                                        className={` ${window.location.pathname === '/courrier_depart' ? 'active' : ''}`}
                                        to="/courrier_depart"><i className="me-3"><MdOutgoingMail size={20}/></i>Courrier
                                        Depart</Link>
                                </li>
                                <li>
                                    <Link className={` ${window.location.pathname === '/notification' ? 'active' : ''}`}
                                          to="/notification"><i className="fa-solid fa-tag me-3"><MdNotificationsActive
                                        size={20}/></i>Notification</Link>
                                </li>
                                {userdetail.role === 1 ? (
                                    <>
                                    <li>
                                        <Link className={` ${window.location.pathname === '/users' ? 'active' : ''}`}
                                              to="/users"><i className="fa-solid fa-tag me-3"><RiUserStarFill
                                            size={20}/></i>Users</Link>
                                    </li>
                                    <li>
                                    <Link className={` ${window.location.pathname === '/settings' ? 'active' : ''}`}
                                          to="/settings"><i className="fa-solid fa-tag me-3"><RiUserStarFill
                                        size={20}/></i>Settings</Link>
                                </li>
                                    </>
                                    
                                ) : (<></>)}
                                <li onClick={logoutUser} className="bg-light rounded">
                                    <a>
                                        <i className='bx bx-log-out icon'></i>
                                        <span className="text nav-text">Logout</span>
                                    </a>
                                </li>
                            </ul>

                        </aside>
                        <main className="p-4">
                            <div className="d-flex mb-3 align-items-center justify-content-between">
                                <div>
                                    <h2>{userdetail.name}</h2>
                                    <span>Here's all your clients</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="notification me-4">
                                        <i className="fa-regular fa- me-3bell fs-5"></i>
                                    </div>
                                    <div className="profile p-3 rounded d-flex align-items-center">
                                        <CgProfile size={45}/>
                                        <div className="ms-3">
                                            <h5>{userdetail.name}</h5>
                                            <small>{userdetail.email}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Routes>
                                <Route path="/" element={<CourrierAr/>}/>
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/notification" element={<Notification/>}/>
                                <Route path="/courrier_depart" element={<CourrierDepart/>}/>
                                <Route path="/test" element={<Test/>}/>
                            </Routes>
                        </main>
                    </div>
                </>)
        } else {
            return (
                <center>
                    Loding ...
                </center>
            )

        }
    }

    return (
        renderelement()
    );
}

export default Auth;
