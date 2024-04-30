import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main';

function InputFunction() {
    const [username, setUserName] = useState("");
    const [submit, setSubmit] = useState(false);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + username)
        if (username.trim()) {
            setSubmit(true);
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>Enter your username
                <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />
            </label>
        </form>
        {submit && <Main username={username} />}
    </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<InputFunction />);

export default InputFunction;
