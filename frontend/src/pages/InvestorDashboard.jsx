import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const DEMO_PROJECTS = [
    { _id: 'i1', title: 'NeuroAssist AI', problemStatement: 'Mental health diagnostics are slow and expensive.', solution: 'AI chatbot for mental health screening.', techStack: 'Python, TensorFlow, React', marketPotential: '$4.2B', demoURL: '#', pptURL: '#', ownerID: { name: 'Aisha Patel', profileDetails: { domain: 'HealthTech' } } },
    { _id: 'i2', title: 'GreenChain', problemStatement: 'Carbon offset tracking lacks transparency.', solution: 'Blockchain carbon credit marketplace.', techStack: 'Solidity, Ethereum, React', marketPotential: '$2.1B', demoURL: '#', pptURL: '#', ownerID: { name: 'Carlos Mendez', profileDetails: { domain: 'CleanTech' } } },
    { _id: 'i3', title: 'MedScan Pro', problemStatement: 'Rural areas lack diagnostic imaging.', solution: 'Mobile CV for X-ray pre-screening.', techStack: 'PyTorch, Flutter', marketPotential: '$8.9B', demoURL: '#', pptURL: '#', ownerID: { name: 'Dr. Lin Wei', profileDetails: { domain: 'HealthTech' } } },
    { _id: 'i4', title: 'EduVerse XR', problemStatement: 'Traditional education fails Gen-Z.', solution: 'VR/AR classroom platform.', techStack: 'Unity, C#, WebXR', marketPotential: '$12.6B', demoURL: '#', pptURL: '#', ownerID: { name: 'Priya Sharma', profileDetails: { domain: 'EdTech' } } },
    { _id: 'i5', title: 'AgriSense IoT', problemStatement: 'Farmers lose 30% crops.', solution: 'IoT + AI crop monitoring.', techStack: 'Arduino, MQTT, Python', marketPotential: '$6.3B', demoURL: '#', pptURL: '#', ownerID: { name: 'James Okafor', profileDetails: { domain: 'AgriTech' } } },
    { _id: 'i6', title: 'FinGuard AI', problemStatement: 'High false-positive fraud detection.', solution: 'Real-time ML ensemble analysis.', techStack: 'Scikit-learn, Kafka', marketPotential: '$10.4B', demoURL: '#', pptURL: '#', ownerID: { name: 'Sarah Kim', profileDetails: { domain: 'FinTech' } } },
    { _id: 'i7', title: 'CloudKitchen OS', problemStatement: 'Ghost kitchens lack unified ops.', solution: 'SaaS multi-platform order management.', techStack: 'Node.js, MongoDB, React', marketPotential: '$1.8B', demoURL: '#', pptURL: '#', ownerID: { name: 'Ahmed Hassan', profileDetails: { domain: 'FoodTech' } } },
    { _id: 'i8', title: 'LegalBot Pro', problemStatement: 'Small businesses can\'t afford lawyers.', solution: 'AI contract generator & reviewer.', techStack: 'GPT-4 API, Next.js', marketPotential: '$3.5B', demoURL: '#', pptURL: '#', ownerID: { name: 'Maria Garcia', profileDetails: { domain: 'LegalTech' } } },
    { _id: 'i9', title: 'QuantumLeap AI', problemStatement: 'Drug discovery is slow and expensive.', solution: 'Quantum simulation for molecules.', techStack: 'Qiskit, Python, AWS', marketPotential: '$7.1B', demoURL: '#', pptURL: '#', ownerID: { name: 'Dr. Alex Novak', profileDetails: { domain: 'BioTech' } } },
    { _id: 'i10', title: 'SafeRoute', problemStatement: 'Commute safety concerns.', solution: 'AI route safety scoring.', techStack: 'React Native, Node.js', marketPotential: '$2.8B', demoURL: '#', pptURL: '#', ownerID: { name: 'Zara Thompson', profileDetails: { domain: 'SafetyTech' } } },
    { _id: 'i11', title: 'DataMesh Platform', problemStatement: 'Enterprise data silos.', solution: 'Decentralized data mesh architecture.', techStack: 'Apache Spark, Kafka', marketPotential: '$15.2B', demoURL: '#', pptURL: '#', ownerID: { name: 'Ravi Krishnan', profileDetails: { domain: 'Enterprise' } } },
    { _id: 'i12', title: 'CyberShield AI', problemStatement: 'SMBs face 43% of cyberattacks.', solution: 'AI cybersecurity for small business.', techStack: 'ML, Python, React', marketPotential: '$11.5B', demoURL: '#', pptURL: '#', ownerID: { name: 'Elena Volkov', profileDetails: { domain: 'CyberSec' } } },
    { _id: 'i13', title: 'TutorMind AI', problemStatement: 'Personalized tutoring is unaffordable.', solution: 'AI tutor with gamification.', techStack: 'GPT-4, React, Firebase', marketPotential: '$5.9B', demoURL: '#', pptURL: '#', ownerID: { name: 'Kenji Tanaka', profileDetails: { domain: 'EdTech' } } },
    { _id: 'i14', title: 'SolarGrid AI', problemStatement: 'Solar panel efficiency loss.', solution: 'Drone + AI panel optimization.', techStack: 'CV, DJI SDK, Python', marketPotential: '$5.6B', demoURL: '#', pptURL: '#', ownerID: { name: 'Sophie Laurent', profileDetails: { domain: 'CleanTech' } } },
    { _id: 'i15', title: 'HireGenius', problemStatement: 'Tech hiring bias and delays.', solution: 'AI blind hiring & matching.', techStack: 'NLP, React, Django', marketPotential: '$3.8B', demoURL: '#', pptURL: '#', ownerID: { name: 'David Chen', profileDetails: { domain: 'HRTech' } } },
];

const InvestorDashboard = () => {
    const [activeTab, setActiveTab] = useState('search');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [projects, setProjects] = useState([]);
    const [myInvestments, setMyInvestments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewedProject, setViewedProject] = useState(null);
    const [hasAgreedNDA, setHasAgreedNDA] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDomain, setFilterDomain] = useState('All Domains');

    const [profileForm, setProfileForm] = useState({
        name: user.name || '',
        company: user.profileDetails?.company || '',
        investmentDomain: user.profileDetails?.investmentDomain || '',
        budgetRange: user.profileDetails?.budgetRange || ''
    });

    useEffect(() => {
        if (activeTab === 'search') fetchAllProjects();
        if (activeTab === 'my investments') fetchMyInvestments();
    }, [activeTab]);

    const fetchAllProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data.length > 0 ? res.data : DEMO_PROJECTS);
        } catch (error) {
            setProjects(DEMO_PROJECTS);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyInvestments = async () => {
        setLoading(true);
        try {
            const res = await api.get('/invest/my-investments');
            setMyInvestments(res.data);
        } catch (error) {
            toast.error("Failed to fetch investments");
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/auth/profile', {
                name: profileForm.name,
                profileDetails: {
                    company: profileForm.company,
                    investmentDomain: profileForm.investmentDomain,
                    budgetRange: profileForm.budgetRange
                }
            });
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            toast.success("Investor profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handleCollabRequest = async (projectId) => {
        try {
            await api.post('/invest/request', { projectID: projectId, message: "Interested in collaboration." });
            toast.success("Collaboration request sent!");
            setActiveTab('my investments');
        } catch (error) {
            toast.error("Failed to send request");
        }
    };

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDomain = filterDomain === 'All Domains' || p.ownerID?.profileDetails?.domain === filterDomain;
        return matchesSearch && matchesDomain;
    });

    const domains = Array.from(new Set(projects.map(p => p.ownerID?.profileDetails?.domain).filter(Boolean)));
    const inputClass = "block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none placeholder-slate-400";

    return (
        <div className="min-h-screen bg-white flex text-slate-800">
            <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col pt-8">
                <div className="px-6 mb-10">
                    <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Investor Panel</h2>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest capitalize">{user.role}</p>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {['search', 'my investments', 'profile'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setViewedProject(null); setHasAgreedNDA(false); }}
                            className={`w-full text-left px-5 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                                } capitalize`}
                        >
                            {tab === 'search' ? 'Search Startups' : tab}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="w-full text-left px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-900/20 rounded-lg transition">Terminate Session</button>
                </div>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {activeTab === 'search' && !viewedProject && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Discover Startups</h3>
                                    <p className="text-slate-500 font-medium">{filteredProjects.length} startups available for investment</p>
                                </div>
                                <div className="flex w-full md:w-auto gap-3">
                                    <input
                                        type="text"
                                        placeholder="Search by keywords..."
                                        className="flex-1 md:w-64 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm placeholder-slate-400"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <select
                                        className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                                        value={filterDomain}
                                        onChange={(e) => setFilterDomain(e.target.value)}
                                    >
                                        <option>All Domains</option>
                                        {domains.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-slate-900 rounded-2xl"></div>)}
                                </div>
                            ) : filteredProjects.length === 0 ? (
                                <div className="text-center py-20 glass-dark border-blue-500/20">
                                    <p className="text-slate-500 text-lg">No startups match your current filters.</p>
                                    <button onClick={() => { setSearchQuery(''); setFilterDomain('All Domains'); }} className="mt-2 text-blue-400 font-bold hover:text-white transition">Clear all filters</button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((project) => (
                                        <motion.div
                                            key={project._id}
                                            whileHover={{ scale: 1.03 }}
                                            className="glass-light p-6 flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                            onClick={() => setViewedProject(project)}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="text-lg font-bold group-hover:text-blue-600 transition line-clamp-1 text-slate-900">{project.title}</h4>
                                                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-blue-200">
                                                    {project.ownerID?.profileDetails?.domain || 'Tech'}
                                                </span>
                                            </div>
                                            <p className="text-slate-500 text-sm line-clamp-3 flex-grow mb-6 leading-relaxed">
                                                {project.problemStatement}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                                                        {project.ownerID?.name?.charAt(0)}
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-medium">{project.ownerID?.name}</span>
                                                </div>
                                                <span className="text-xs font-black text-cyan-400">{project.marketPotential}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {viewedProject && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-light p-10 border-slate-200 shadow-xl">
                            <button
                                onClick={() => { setViewedProject(null); setHasAgreedNDA(false); }}
                                className="text-slate-400 hover:text-slate-900 font-bold flex items-center gap-1 mb-8 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back to Discovery
                            </button>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{viewedProject.title}</h2>
                                    <p className="text-blue-600 font-bold">Founded by {viewedProject.ownerID?.name}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {!hasAgreedNDA && (
                                        <span className="bg-yellow-900/20 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black border border-yellow-500/20 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                            NDA Restriction Active
                                        </span>
                                    )}
                                    <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">NDA REF: IB-{viewedProject._id.slice(-6).toUpperCase()}</span>
                                </div>
                            </div>

                            {!hasAgreedNDA ? (
                                <div className="bg-slate-900/50 border border-blue-500/10 rounded-2xl p-10 text-center">
                                    <div className="w-20 h-20 bg-blue-900/30 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 blue-glow">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 uppercase">Access Sensitive Startup Data</h3>
                                    <p className="text-slate-500 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                                        You are requesting access to full project details. Agreement to the IdeaBridge Global Startup NDA is mandatory.
                                    </p>
                                    <div className="max-w-md mx-auto">
                                        <label className="flex items-center gap-4 cursor-pointer p-5 bg-slate-900 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition select-none mb-8">
                                            <input
                                                type="checkbox"
                                                className="w-6 h-6 rounded border-blue-500/30 bg-slate-900 accent-blue-500"
                                                onChange={(e) => setHasAgreedNDA(e.target.checked)}
                                            />
                                            <div className="text-left">
                                                <p className="text-xs font-black text-slate-500 uppercase tracking-tighter mb-0.5">Agreement Checkpoint</p>
                                                <span className="text-sm font-bold text-blue-400">I agree not to copy, redistribute or misuse this idea.</span>
                                            </div>
                                        </label>
                                        <p className="text-[11px] text-slate-600 text-center px-4">By checking the box above, you enter into a legally binding non-disclosure agreement.</p>
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-8">
                                            <div>
                                                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div> Problem Statement
                                                </h4>
                                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-blue-500/10 text-slate-300 leading-relaxed">
                                                    {viewedProject.problemStatement}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-cyan-500 rounded-full"></div> Proposed Solution
                                                </h4>
                                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-blue-500/10 text-slate-300 leading-relaxed">
                                                    {viewedProject.solution}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="glass-dark p-6 border-blue-500/30 blue-glow">
                                                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Technical Insight</h4>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] text-slate-600 uppercase font-black mb-1">Architecture</p>
                                                        <p className="text-sm font-medium text-white">{viewedProject.techStack}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-slate-600 uppercase font-black mb-1">Market Scope</p>
                                                        <p className="text-sm font-medium text-white">{viewedProject.marketPotential}</p>
                                                    </div>
                                                    <div className="pt-4 space-y-3">
                                                        <a href={viewedProject.pptURL || '#'} target="_blank" className="block w-full text-center py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-500/30">DOWNLOAD PITCH DECK</a>
                                                        <a href={viewedProject.demoURL || '#'} target="_blank" className="block w-full text-center py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition">WATCH PRODUCT DEMO</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="glass-dark p-6 border-cyan-500/30">
                                                <h3 className="text-lg font-black text-white mb-2">Collaboration</h3>
                                                <p className="text-xs text-slate-500 mb-6 leading-relaxed">Ready to invest? Send a request to establish a direct line with the founder.</p>
                                                <button
                                                    onClick={() => handleCollabRequest(viewedProject._id)}
                                                    className="w-full btn-primary text-sm"
                                                >
                                                    SEND COLLABORATION REQUEST
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'my investments' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">My Portfolio & Requests</h3>
                            {loading ? (
                                <div className="space-y-4 animate-pulse">
                                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-900 rounded-2xl"></div>)}
                                </div>
                            ) : myInvestments.length === 0 ? (
                                <div className="text-center py-20 glass-dark border-blue-500/20">
                                    <div className="w-16 h-16 bg-blue-900/30 text-blue-400 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                    </div>
                                    <p className="text-slate-500">You haven't sent any collaboration requests yet.</p>
                                    <button onClick={() => setActiveTab('search')} className="mt-4 text-blue-400 font-bold hover:text-white transition">Discover startups</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myInvestments.map((inv) => (
                                        <motion.div key={inv._id} whileHover={{ scale: 1.01 }} className="glass-light p-6 flex flex-col md:flex-row justify-between items-center border-slate-200 shadow-sm hover:shadow-md transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-600 border border-blue-200">
                                                    {inv.projectID?.title?.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{inv.projectID?.title || 'Unknown Startup'}</h4>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Sent on {new Date(inv.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <span className={`mt-4 md:mt-0 px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${inv.collaborationStatus === 'Accepted' ? 'bg-green-50 text-green-600 border-green-200' :
                                                inv.collaborationStatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                                    'bg-blue-50 text-blue-600 border-blue-200 animate-pulse'
                                                }`}>
                                                {inv.collaborationStatus}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-light p-10 max-w-2xl mx-auto border-slate-200 shadow-lg">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                                <div className="w-2 h-8 bg-blue-600 rounded-full"></div> Investor Profile
                            </h3>
                            <form onSubmit={handleProfileUpdate} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                                        <input type="text" className={inputClass} value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Investment Firm</label>
                                        <input type="text" className={inputClass} placeholder="Your Company Name" value={profileForm.company} onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Domain</label>
                                        <input type="text" className={inputClass} placeholder="e.g. AI / Sustainability" value={profileForm.investmentDomain} onChange={(e) => setProfileForm({ ...profileForm, investmentDomain: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Budget Portfolio</label>
                                        <input type="text" className={inputClass} placeholder="e.g. $100k - $2M" value={profileForm.budgetRange} onChange={(e) => setProfileForm({ ...profileForm, budgetRange: e.target.value })} />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="btn-primary">SAVE INVESTOR DATA</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default InvestorDashboard;
