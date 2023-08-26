'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import http from '@/utils/http';
import SITE from 'SITE';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [formVariant, setFormVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

    const router = useRouter();

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(formVariant === 'LOGIN'){
            handleLoginSubmit();
        } else {
            handleRegisterSubmit();
        }
    }

    function handleLoginSubmit() {
        const data = JSON.stringify({
            'username': username,
            'password': password,
            'device_name': 'web',
        });
        http.post('/login', data).then(function (res) {
            console.log(res);
            if (res.status === 200) {
                router.push('/account');
                console.log(res.data.token)
            }
        }).catch(function (err) {
            if (err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error('An error occurred.');
            }
        }).finally(function () {

        });
    }

    function handleRegisterSubmit() {
        http.post('/register', JSON.stringify({
            'name': name,
            'email': email,
            'username': username,
            'password': password,
            'password_confirmation': passwordConfirmation,
        })).then(function (res) {
            console.log(res)
            if (res.status == 200) {
                router.push('/account');
            }
        }).catch(function (err) {
            console.log(err)
            if (err.response.data.message) {
                toast.error(err.response.data.message)
            } else {
                toast.error('An error occurred.');
            }
        }).finally(function () {

        });
    }

    return (
        <section className="px-4 py-4">
            <h2 className="text-2xl font-bold">{formVariant === 'LOGIN' ? 'Login' : 'Register'}</h2>
            {formVariant === 'LOGIN' &&
            <>
                <a href={SITE.google_redirect_url}>Google</a>            
                <a href={SITE.github_redirect_url}>Github</a>            
            </>    
            }

            <form onSubmit={handleSubmit} method="post" className="mb-5">
                {formVariant === 'REGISTER' &&
                    <>
                        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required placeholder="Full Name" title="Full Name" autoComplete="first-name" className="border border-gray-500 w-full mb-5" />
                        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required title="Email" autoComplete="email" placeholder="Email" className="border border-gray-500 w-full mb-5" />
                    </>
                }
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required title="Email" autoComplete="username" className="border border-gray-500 w-full mb-5" />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required title="Password" autoComplete="current-password" className="border border-gray-500 w-full mb-5" />
                {formVariant === 'REGISTER' &&
                    <input type="password" name="password_confirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required title="Confirm Password" autoComplete="new-password" className="border border-gray-500 w-full mb-5" />
                }
                <button type="submit" className="border border-blue-500 px-10 py-2">{formVariant === 'LOGIN' ? 'Login' : 'Register'}</button>
            </form>
            {formVariant === 'LOGIN' ?
                <button type="button" onClick={() => setFormVariant('REGISTER')}>Create an account</button> :
                <button type="button" onClick={() => setFormVariant('LOGIN')}>Already have an account ? Login.</button>
            }


        </section>
    );
}
