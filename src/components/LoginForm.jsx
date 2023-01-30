import axios from "axios";
import { useState } from "react"

const LoginForm =()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const authObjects = { 'Project-ID': "9b2a2208-9420-4e79-b2f1-4eee9d7f253d", 'User-Name': username, 'User-Secret': password }
        try {
            axios.get('https://api.chatengine.io/chats', { headers: authObjects });
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.reload();
        } catch (error) {
            console.log(error);
            setError('Oops, Incorrect credentials...');
        }
    }
    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Gossips</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} className="input" placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="Button"><span>Start GupShup</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;