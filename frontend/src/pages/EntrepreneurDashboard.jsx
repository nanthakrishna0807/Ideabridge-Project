import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const DEMO_PROJECTS = [
    { _id: 'e1', title: 'NeuroAssist AI', problemStatement: 'Mental health diagnostics are slow and expensive.', solution: 'AI-powered chatbot for mental health screening.', techStack: 'Python, TensorFlow, React', marketPotential: '$4.2B', ownerID: { name: 'Aisha Patel' }, status: 'Seed Stage' },
    { _id: 'e2', title: 'GreenChain', problemStatement: 'Carbon offset tracking lacks transparency.', solution: 'Blockchain-based carbon credit marketplace.', techStack: 'Solidity, Ethereum, React', marketPotential: '$2.1B', ownerID: { name: 'Carlos Mendez' }, status: 'MVP' },
];

const EntrepreneurDashboard = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: user.name || '',
        ventureName: user.profileDetails?.ventureName || '',
        industry: user.profileDetails?.industry || '',
        vision: user.profileDetails?.vision || ''
    });

    const [ventureForm, setVentureForm] = useState({
        title: '', problemStatement: '', solution: '', techStack: '', marketPotential: '', demoURL: '', pptURL: ''
    });

    useEffect(() => {
        if (activeTab === 'portfolio') fetchMyVentures();
        if (activeTab === 'explore ideas') fetchAllProjects();
    }, [activeTab]);

    const fetchMyVentures = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects/my');
            setProjects(res.data.length > 0 ? res.data : DEMO_PROJECTS);
        } catch (error) {
            setProjects(DEMO_PROJECTS);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            setAllProjects(res.data.length > 0 ? res.data : DEMO_PROJECTS);
        } catch (error) {
            setAllProjects(DEMO_PROJECTS);
        } finally {
            setLoading(false);
        }
    };

    const handleSendRequest = async (projectId) => {
        try {
            await api.post(`/projects/${projectId}/request`);
            toast.success("Collaboration request sent!");
            fetchAllProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send request");
        }
    };

    const handleAcceptRequest = async (projectId, userId, status) => {
        try {
            await api.put(`/projects/${projectId}/request/${userId}`, { status });
            toast.success(`Request ${status}!`);
            fetchMyVentures();
        } catch (error) {
            toast.error("Failed to update request");
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/auth/profile', {
                name: profileForm.name,
                profileDetails: {
                    ventureName: profileForm.ventureName,
                    industry: profileForm.industry,
                    vision: profileForm.vision
                }
            });
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            toast.success("Entrepreneur profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handleLaunchVenture = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', ventureForm);
            toast.success("Venture launched successfully!");
            setVentureForm({ title: '', problemStatement: '', solution: '', techStack: '', marketPotential: '', demoURL: '', pptURL: '' });
            setActiveTab('portfolio');
        } catch (error) {
            toast.error("Failed to launch venture");
        }
    };

    const inputClass = "block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none placeholder-slate-400";

    return (
        <div className="min-h-screen bg-white flex text-slate-800">
            <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col pt-8">
                <div className="px-6 mb-10">
                    <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Founder Hub</h2>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Entrepreneur Portal</p>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {['portfolio', 'explore ideas', 'launch venture', 'profile'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-5 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                                } capitalize`}
                        >
                            {tab === 'portfolio' ? 'My Ventures' : tab}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {activeTab === 'portfolio' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">My Ventures</h3>
                            <p className="text-slate-500 mb-8 font-medium">Managing {projects.length} active projects</p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {projects.map((project) => (
                                    <div key={project._id} className="glass-light p-6 border-slate-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-xl font-bold text-blue-600">{project.title}</h4>
                                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                {project.status || 'Active'}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">{project.problemStatement}</p>
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 pt-4">
                                            <span>Market: {project.marketPotential}</span>
                                            <span className="text-blue-600">Requests: {project.collaborationRequests?.length || 0}</span>
                                        </div>
                                        {project.collaborationRequests?.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                                                <p className="text-xs font-bold text-slate-900 mb-2">Collaboration Requests</p>
                                                {project.collaborationRequests.map(req => (
                                                    <div key={req.user?._id || Math.random()} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs">
                                                        <span className="font-medium text-slate-700">{req.user?.name || 'Unknown'} ({req.status})</span>
                                                        {req.status === 'Pending' && (
                                                            <div className="flex gap-2">
                                                                <button onClick={() => handleAcceptRequest(project._id, req.user._id, 'Accepted')} className="text-blue-600 font-bold hover:underline">Accept</button>
                                                                <button onClick={() => handleAcceptRequest(project._id, req.user._id, 'Rejected')} className="text-red-600 font-bold hover:underline">Reject</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'explore ideas' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Explore Network Ideas</h3>
                            <p className="text-slate-500 mb-8 font-medium">Discover projects to collaborate on.</p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {allProjects.map((project) => {
                                    const hasRequested = project.collaborationRequests?.some(r => r.user?._id === user._id || r.user === user._id);
                                    return (
                                        <div key={project._id} className="glass-light p-6 border-slate-200 shadow-sm hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-xl font-bold text-blue-600">{project.title}</h4>
                                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                    {project.status || 'Active'}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">{project.problemStatement}</p>
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 pt-4 mt-auto">
                                                <span className="text-slate-500">Owner: {project.ownerID?.name || 'Unknown'}</span>
                                                {hasRequested ? (
                                                    <span className="text-slate-400 font-bold">Request Sent</span>
                                                ) : (
                                                    <button onClick={() => handleSendRequest(project._id)} className="text-blue-600 hover:text-blue-700 font-bold transition">Send Request</button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'launch venture' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-light p-10 border-slate-200 shadow-xl">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Launch New Venture</h3>
                            <form onSubmit={handleLaunchVenture} className="space-y-6">
                                <input type="text" placeholder="Startup Name" className={inputClass} value={ventureForm.title} onChange={(e) => setVentureForm({ ...ventureForm, title: e.target.value })} required />
                                <textarea placeholder="What problem are you solving?" rows="3" className={inputClass} value={ventureForm.problemStatement} onChange={(e) => setVentureForm({ ...ventureForm, problemStatement: e.target.value })} required></textarea>
                                <textarea placeholder="Your innovative solution" rows="3" className={inputClass} value={ventureForm.solution} onChange={(e) => setVentureForm({ ...ventureForm, solution: e.target.value })} required></textarea>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Tech Stack" className={inputClass} value={ventureForm.techStack} onChange={(e) => setVentureForm({ ...ventureForm, techStack: e.target.value })} required />
                                    <input type="text" placeholder="Market Size (e.g. $1B)" className={inputClass} value={ventureForm.marketPotential} onChange={(e) => setVentureForm({ ...ventureForm, marketPotential: e.target.value })} required />
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 text-lg">Initialize Venture</button>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-light p-10 border-slate-200 shadow-xl">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Founder Profile</h3>
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Legal Name</label>
                                        <input type="text" className={inputClass} value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Main Venture</label>
                                        <input type="text" className={inputClass} value={profileForm.ventureName} onChange={(e) => setProfileForm({ ...profileForm, ventureName: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Industry</label>
                                    <input type="text" className={inputClass} value={profileForm.industry} onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company Vision</label>
                                    <textarea className={inputClass} rows="4" value={profileForm.vision} onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn-primary px-10">Sync Profile</button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EntrepreneurDashboard;
