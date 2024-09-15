import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addData, registerUser } from "../services/firebase"
import { set } from "../store/userSlice"

export const Register = () => {
    let [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        address: '',
    })

    let [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = e => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setLoading(true)

        registerUser(form.email, form.password)
            .then(uInfo => {
                const data = {
                    name: form.name,
                    address: form.address,
                    email: form.email,
                    uid: uInfo.user.uid
                }

                addData('users', data)
                    .then(resp => {
                        dispatch(set(data))
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
                    <h2>Register</h2>
                </div>
            </div>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" id="name" className="form-control" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" name="address" id="address" className="form-control" value={form.address} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? <i className="fa-solid fa-refresh fa-spin"></i> : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
}