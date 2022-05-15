import { useFormik } from 'formik';
import { initialValues, validate, onSubmit } from '../../helpers/signin';

import NavBar from '../Shared/navbar/index';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// const styles = makeStyles((theme) => ({
//     label: {
//         fontSize: '18px',
//     },
//     root: {
//         '& .MuiFilledInput-root': {
//             background: '#c6d3d2',
//         },
//     },
// }));

function SignIn() {
    // const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: async(values) => {
            const res = await axios.post(
                'http://localhost:3001/auth/login',
                {
                    email: values.email,
                    password: values.password
                }
            )
            console.log("Res", res)
            const data = res.data;
            if (data?.res?.login === 'success' && data?.res?.token){
                localStorage.setItem("token", data.res.token)
                navigate('/home')
            }
        },
    });
    // const classes = styles();

    return (
        <>
            <NavBar />
            <div className="h-100  row align-items-center">
                <div className="card w-50 mx-auto mt-5">
                    <article className="card-body">
                        <button onClick={() => navigate('/sign-up')} className="float-end btn btn-outline-primary">Sign up</button>
                        <h4 className="card-title mb-4 mt-1">Sign in</h4>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group mb-2">
                                <label>Your email</label>
                                <input
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    // type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>
                            <div>
                                {formik.errors.email}
                            </div>
                            <div className="form-group mb-2">
                                <label>Your password</label>
                                <input
                                    name="password"
                                    className="form-control"
                                    placeholder="******"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passoword}
                                    type="password"
                                />
                            </div>
                            <div>
                                {formik.errors.password}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                            </div></form>
                    </article>
                </div>
            </div>
        </>
    );
};

export default SignIn;
