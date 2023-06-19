import { useState } from "react"
import AuthUser from './AuthUser';
export default function Login() {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () =>{
        // api call
        http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user,res.data.access_token);
            console.log(res.data)
        })
    }

    return(<>
            <div className="login container-fluid">
                <div className="row">
                    <div className="col-md-6 d-none d-md-block bg-image"></div>
                    <div className="col-md-6 form-parent">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1>Log in</h1>
                                <p>
                                    Lorem ipsum, dolor sit Adipisci voluptate suscipit eos?
                                    Voluptatem, quisquam.
                                </p>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label"
                                        >Email address</label
                                        >
                                        <input
                                            onChange={e=>setEmail(e.target.value)}
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter your email"
                                            aria-describedby="emailHelp"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label"
                                        >Password</label
                                        >
                                        <input
                                            onChange={e => setPassword(e.target.value)}
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            id="exampleInputPassword1"
                                        />
                                    </div>
                                    <button type="button" onClick={submitForm} className="btn btn-primary p-2">
                                        Sign in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </>

    )
}