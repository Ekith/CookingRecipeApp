// File: src/View/Login.tsx
import React, { useState } from 'react';
import { supabase } from '../App';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
                console.error('signIn error', error);
                return;
            }

            // Si tout va bien, data contient la session/l'utilisateur
            setMessage('Connexion réussie');
            // Rediriger vers la page principale (ajustez le chemin si nécessaire)
            navigate('/');
        } catch (err) {
            console.error('signIn unexpected error', err);
            setMessage('Une erreur est survenue lors de la connexion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="global-container">
            <h1 className="bigTitle">Login Page</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="text-and-entry">
                    <label htmlFor="email" className="text-entry">Email:</label>
                    <input
                        className="entry"
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="text-and-entry">
                    <label htmlFor="password" className="text-entry">Password:</label>
                    <input
                        className="entry"
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading} className="validateButton">
                    {loading ? 'Connexion...' : 'Login'}
                </button>
            </form>
            {message && <p className="sub-container error-text">{message}</p>}
        </div>
    );
}

export default Login;