import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getDataWhere, loginUser } from "../services/firebase"
import { set } from "../store/userSlice"

export const Login = () => {
    let [form, setForm] = useState({
        email: '',
        password: ''
    })

    let [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = e => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setLoading(true)

        loginUser(form.email, form.password)
            .then(uInfo => {
                getDataWhere('users', 'uid', '==', uInfo.user.uid)
                    .then(resp => {
                        resp.forEach(doc => {
                            dispatch(set(doc.data()))
                        })
                        navigate('/')
                    })
                    .catch(err => {})
            })
            .catch(err => {})
            .finally(() => {setLoading(false)})
    }

    return <main className="row">
        <div className="col-6 mx-auto my-3">
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Login</h2>
                </div>
            </div>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn " disabled={loading}>
                            {loading ? <i className="fa-solid fa-refresh fa-spin"></i> : 'Log In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
}