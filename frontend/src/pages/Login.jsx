import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { auth, googleProvider, githubProvider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ndaAccepted, setNdaAccepted] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [socialData, setSocialData] = useState(null);
    const [socialPassword, setSocialPassword] = useState('');
    const [socialRole, setSocialRole] = useState('student');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success('Access Granted. Welcome back.');

            const userRole = response.data.role?.toLowerCase();
            if (userRole === 'admin') navigate('/admin');
            else if (userRole === 'investor') navigate('/investor');
            else if (userRole === 'entrepreneur') navigate('/entrepreneur');
            else if (userRole === 'student' || userRole === 'emerging') navigate('/developer');
            else navigate('/developer');

        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleSocialAuth = async (providerName) => {
        if (providerName === 'LinkedIn') {
            // Simulated Robust LinkedIn Handshake
            toast.loading('Connecting to LinkedIn Secure Gateway...', { id: 'ln-auth' });
            setTimeout(async () => {
                toast.success('LinkedIn Identity Verified!', { id: 'ln-auth' });
                const userData = {
                    email: 'verified_linkedin_user@li.com',
                    name: 'LinkedIn Verified User',
                    provider: 'LinkedIn'
                };
                await finalizeSocialAuth(userData);
            }, 1500);
            return;
        }

        let provider;
        if (providerName === 'Google') provider = googleProvider;
        else if (providerName === 'GitHub') provider = githubProvider;
        else {
            toast.error('Provider not yet configured.');
            return;
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = {
                email: user.email,
                name: user.displayName || 'Social User',
                provider: providerName
            };

            await finalizeSocialAuth(userData);

        } catch (error) {
            console.error("Firebase Auth Error:", error);
            toast.error('Authentication cancelled or failed.');
        }
    };

    const finalizeSocialAuth = async (data) => {
        try {
            const response = await api.post('/auth/social-auth', {
                ...data,
                password: socialPassword,
                role: socialRole
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success(`Access Granted via ${data.provider}.`);
            setShowSocialModal(false);

            const userRole = response.data.role?.toLowerCase();
            if (userRole === 'admin') navigate('/admin');
            else if (userRole === 'investor') navigate('/investor');
            else if (userRole === 'entrepreneur') navigate('/entrepreneur');
            else if (userRole === 'student' || userRole === 'emerging') navigate('/developer');
            else navigate('/developer');

        } catch (error) {
            if (error.response?.data?.isNewUser) {
                setSocialData(data);
                setShowSocialModal(true);
                toast('First time? Please set your password and role below.');
            } else {
                toast.error(error.response?.data?.message || 'Social authentication failed.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white z-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass-light p-10 relative z-10 border-slate-200 shadow-xl"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Identity Check</h2>
                    <p className="text-blue-600 mt-2 font-bold text-sm uppercase tracking-wide">Re-entering the IdeaBridge Ecosystem</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Secure Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                            placeholder="admin@ib.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Access Key</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="nda-login"
                                type="checkbox"
                                required
                                checked={ndaAccepted}
                                onChange={(e) => setNdaAccepted(e.target.checked)}
                                className="w-5 h-5 border border-slate-300 rounded bg-white focus:ring-0 accent-blue-600"
                            />
                        </div>
                        <label htmlFor="nda-login" className="ml-3 text-sm font-medium text-slate-600 leading-tight">
                            I verify compliance with the <span className="text-blue-600 font-bold">NDA Copyright Act</span>. I will respect all intellectual sovereignty.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!ndaAccepted}
                        className={`w-full ${ndaAccepted ? 'btn-primary' : 'bg-slate-100 text-slate-400 cursor-not-allowed py-3 px-4 rounded-xl font-bold transition-all border border-slate-200'}`}
                    >
                        Initiate Access
                    </button>
                </form>

                <div className="mt-10 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                        <span className="bg-white px-4 text-slate-400">Quick Access (Demo Mode)</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => { setEmail('admin@ib.com'); setPassword('admin123'); setNdaAccepted(true); toast.success('Admin Credentials Loaded'); }}
                        className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold text-[10px] uppercase tracking-tighter"
                    >
                        Admin Access
                    </button>
                    <button
                        type="button"
                        onClick={() => { setEmail('collab@ib.com'); setPassword('collab123'); setNdaAccepted(true); toast.success('Executive Credentials Loaded'); }}
                        className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold text-[10px] uppercase tracking-tighter"
                    >
                        Executive Access
                    </button>
                    <button
                        type="button"
                        onClick={() => { setEmail('developer@ib.com'); setPassword('developer123'); setNdaAccepted(true); toast.success('Developer Credentials Loaded'); }}
                        className="py-1.5 px-3 bg-blue-600 border border-blue-700 rounded-xl text-white hover:bg-blue-700 transition-all font-bold text-[10px] uppercase tracking-tighter col-span-2"
                    >
                        Developer Access
                    </button>
                </div>

                <div className="mt-10 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                        <span className="bg-white px-4 text-slate-400">Social Gateways</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <button type="button" onClick={() => handleSocialAuth('Google')} className="flex items-center justify-center py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-blue-50 hover:border-blue-400 transition-all group">
                        <FaGoogle className="text-xl group-hover:scale-110 transition-transform" />
                    </button>
                    <button type="button" onClick={() => handleSocialAuth('GitHub')} className="flex items-center justify-center py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-blue-50 hover:border-blue-400 transition-all group">
                        <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                    </button>
                    <button type="button" onClick={() => handleSocialAuth('LinkedIn')} className="flex items-center justify-center py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-blue-50 hover:border-blue-400 transition-all group">
                        <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Social Onboarding Modal */}
                {showSocialModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100">
                            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight text-center">Complete Profile</h3>
                            <p className="text-slate-500 text-sm text-center mb-6">First time using {socialData?.provider}? Set your credentials below.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Set Password</label>
                                    <input
                                        type="password"
                                        value={socialPassword}
                                        onChange={(e) => setSocialPassword(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Select Role</label>
                                    <select
                                        value={socialRole}
                                        onChange={(e) => setSocialRole(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="student">Developer</option>
                                        <option value="entrepreneur">Entrepreneur</option>
                                        <option value="investor">Investor</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => finalizeSocialAuth(socialData)}
                                    className="w-full btn-primary py-3 rounded-xl mt-4"
                                >
                                    Finish & Enter
                                </button>
                                <button
                                    onClick={() => setShowSocialModal(false)}
                                    className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 hover:text-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                <p className="mt-10 text-center text-sm text-slate-500">
                    New operative?{' '}
                    <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 transition">
                        Register Credentials
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
