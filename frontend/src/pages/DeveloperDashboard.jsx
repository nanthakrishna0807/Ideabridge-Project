import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const DEMO_PROJECTS = [
    { _id: 'd1', title: 'NeuroAssist AI', problemStatement: 'Mental health diagnostics are slow and expensive, leaving millions undiagnosed.', solution: 'AI-powered chatbot that screens for mental health conditions using NLP analysis.', techStack: 'Python, TensorFlow, React, Node.js', marketPotential: '$4.2B Mental Health Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'V Capital' }, { name: 'MindFund' }] },
    { _id: 'd2', title: 'GreenChain', problemStatement: 'Carbon offset tracking lacks transparency and accountability.', solution: 'Blockchain-based carbon credit marketplace with real-time verification.', techStack: 'Solidity, Ethereum, React, IPFS', marketPotential: '$2.1B Carbon Credit Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'EcoVC' }] },
    { _id: 'd3', title: 'MedScan Pro', problemStatement: 'Rural areas lack access to diagnostic imaging specialists.', solution: 'Mobile app that uses computer vision to pre-screen X-rays and MRIs.', techStack: 'PyTorch, Flutter, Firebase, GCP', marketPotential: '$8.9B Medical Imaging AI', demoURL: '#', pptURL: '#', NDAstatus: 'Pending', investorsInterested: [] },
    { _id: 'd4', title: 'EduVerse XR', problemStatement: 'Traditional education fails to engage Gen-Z learners effectively.', solution: 'Immersive VR/AR classroom platform with AI-driven personalized lessons.', techStack: 'Unity, C#, WebXR, Firebase', marketPotential: '$12.6B EdTech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'LearnCapital' }, { name: 'EdTech VC' }, { name: 'FutureMinds' }] },
    { _id: 'd5', title: 'AgriSense IoT', problemStatement: 'Small farmers lose 30% of crops due to lack of real-time monitoring.', solution: 'IoT sensor network with AI predictions for soil, weather, and pest control.', techStack: 'Arduino, MQTT, Python, React', marketPotential: '$6.3B Precision Agriculture', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'AgriVenture' }] },
    { _id: 'd6', title: 'FinGuard AI', problemStatement: 'Fraud detection systems have high false-positive rates costing banks millions.', solution: 'Real-time transaction analysis using ensemble ML models.', techStack: 'Scikit-learn, Kafka, PostgreSQL, Next.js', marketPotential: '$10.4B Fraud Detection Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'FinTech Alpha' }, { name: 'SecureVC' }] },
    { _id: 'd7', title: 'CloudKitchen OS', problemStatement: 'Ghost kitchen operations lack unified order and inventory management.', solution: 'SaaS platform integrating multi-platform orders with supply chain AI.', techStack: 'Node.js, MongoDB, React, Stripe', marketPotential: '$1.8B Cloud Kitchen Software', demoURL: '#', pptURL: '#', NDAstatus: 'Pending', investorsInterested: [] },
    { _id: 'd8', title: 'LegalBot Pro', problemStatement: 'Small businesses cannot afford legal counsel for routine contracts.', solution: 'AI contract generator and reviewer with compliance checking.', techStack: 'GPT-4 API, Next.js, Supabase', marketPotential: '$3.5B Legal Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'LawVC' }] },
    { _id: 'd9', title: 'QuantumLeap AI', problemStatement: 'Drug discovery takes 10+ years and billions in R&D costs.', solution: 'Quantum computing simulation for molecular interaction prediction.', techStack: 'Qiskit, Python, AWS Braket, React', marketPotential: '$7.1B Quantum Computing in Pharma', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'PharmaTech' }, { name: 'Quantum Fund' }] },
    { _id: 'd10', title: 'SafeRoute', problemStatement: 'Women and night-shift workers face safety concerns during commute.', solution: 'AI-powered route safety scoring with real-time community alerts.', techStack: 'React Native, Node.js, MongoDB, Maps API', marketPotential: '$2.8B Personal Safety Apps', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Impact Fund' }] },
    { _id: 'd11', title: 'DataMesh Platform', problemStatement: 'Enterprise data silos lead to inconsistent analytics and poor decisions.', solution: 'Decentralized data mesh architecture with automated governance.', techStack: 'Apache Spark, Kafka, Kubernetes, React', marketPotential: '$15.2B Data Management', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Enterprise Partners' }] },
    { _id: 'd12', title: 'SolarGrid AI', problemStatement: 'Solar panel installations suffer from 15% efficiency loss due to poor placement.', solution: 'Drone + AI system for optimal solar panel positioning and maintenance.', techStack: 'Computer Vision, DJI SDK, Python, AWS', marketPotential: '$5.6B Solar Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Pending', investorsInterested: [] },
    { _id: 'd13', title: 'PetSync', problemStatement: 'Pet health monitoring is reactive, leading to expensive emergency vet visits.', solution: 'Wearable IoT collar with AI health prediction for pets.', techStack: 'BLE, TensorFlow Lite, React Native', marketPotential: '$1.2B Pet Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'AnimalVC' }] },
    { _id: 'd14', title: 'CryptoGuard Wallet', problemStatement: 'Crypto wallets are complex and vulnerable to phishing attacks.', solution: 'Biometric-secured crypto wallet with AI-powered phishing detection.', techStack: 'Web3.js, React, Solidity, WebAuthn', marketPotential: '$4.8B Crypto Security', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Blockchain Capital' }, { name: 'CryptoVC' }] },
    { _id: 'd15', title: 'StyleAI Fashion', problemStatement: 'Online fashion shopping has 40% return rates due to poor fit prediction.', solution: 'AI body measurement + virtual try-on using AR technology.', techStack: 'ARKit, TensorFlow, Swift, Node.js', marketPotential: '$6.5B Fashion Tech', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Fashion Fund' }] },
    { _id: 'd16', title: 'TrafficFlow AI', problemStatement: 'Urban traffic congestion costs economies $87B annually in lost productivity.', solution: 'Smart traffic signal optimization using real-time AI analysis.', techStack: 'YOLOv8, Edge Computing, Python, IoT', marketPotential: '$9.3B Smart City Solutions', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Smart City VC' }] },
    { _id: 'd17', title: 'WasteZero', problemStatement: 'Recycling contamination rates exceed 25% in municipal systems.', solution: 'Computer vision sorting system for automated waste classification.', techStack: 'OpenCV, Raspberry Pi, Python, Cloud', marketPotential: '$2.3B Waste Management Tech', demoURL: '#', pptURL: '#', NDAstatus: 'Pending', investorsInterested: [] },
    { _id: 'd18', title: 'HireGenius', problemStatement: 'Tech hiring processes are biased and take average 42 days to fill roles.', solution: 'AI-powered skill assessment with blind hiring and predictive matching.', techStack: 'NLP, React, Django, PostgreSQL', marketPotential: '$3.8B HR Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Worktech Partners' }] },
    { _id: 'd19', title: 'FoodSafe Chain', problemStatement: 'Foodborne illness outbreaks take weeks to trace back to source.', solution: 'Blockchain food supply chain tracking with IoT temperature sensors.', techStack: 'Hyperledger, IoT, React, Node.js', marketPotential: '$4.1B Food Safety Tech', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'FoodTech VC' }] },
    { _id: 'd20', title: 'SleepWell AI', problemStatement: 'Sleep disorders affect 70M Americans but diagnosis requires expensive sleep labs.', solution: 'Smartphone-based sleep analysis using audio and motion AI models.', techStack: 'TensorFlow Lite, React Native, AWS', marketPotential: '$5.2B Sleep Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'HealthTech VC' }, { name: 'Wellness Fund' }] },
    { _id: 'd21', title: 'AquaPure AI', problemStatement: 'Water quality testing in developing regions is expensive and slow.', solution: 'Portable AI-powered water quality analyzer using spectroscopy.', techStack: 'Computer Vision, Embedded C, Python', marketPotential: '$3.4B Water Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'Impact Water Fund' }] },
    { _id: 'd22', title: 'BuildVision 3D', problemStatement: 'Construction project delays cost the industry $177B annually.', solution: 'AI + drone-based construction progress monitoring with BIM integration.', techStack: 'Point Cloud, Three.js, Python, AWS', marketPotential: '$7.8B ConTech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Pending', investorsInterested: [] },
    { _id: 'd23', title: 'GenomicsHub', problemStatement: 'Genomic data analysis is bottlenecked by lack of accessible tools.', solution: 'Cloud-based genomics analysis platform for researchers and clinicians.', techStack: 'Bioinformatics, Python, React, GCP', marketPotential: '$8.1B Genomics Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'BioTech Capital' }] },
    { _id: 'd24', title: 'EventPulse', problemStatement: 'Event organizers lack real-time attendee engagement analytics.', solution: 'AI-powered event analytics platform with sentiment analysis and heatmaps.', techStack: 'NLP, WebSocket, React, MongoDB', marketPotential: '$1.9B Event Tech Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'EventVC' }] },
    { _id: 'd25', title: 'CyberShield AI', problemStatement: 'SMBs face 43% of cyberattacks but lack the budget for enterprise security.', solution: 'AI-powered cybersecurity suite designed and priced for small businesses.', techStack: 'ML, Python, React, Elasticsearch', marketPotential: '$11.5B SMB Cybersecurity', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'CyberVC' }, { name: 'SecureFund' }, { name: 'TechShield' }] },
    { _id: 'd26', title: 'TutorMind AI', problemStatement: 'Personalized tutoring is unaffordable for 80% of students globally.', solution: 'AI tutor that adapts to individual learning styles with gamification.', techStack: 'GPT-4 API, React, Firebase, Stripe', marketPotential: '$5.9B AI Education Market', demoURL: '#', pptURL: '#', NDAstatus: 'Approved', investorsInterested: [{ name: 'EdTech Fund' }] },
    { _id: 'd27', title: 'DroneDeliver Pro', problemStatement: 'Last-mile delivery costs account for 53% of total shipping expenses.', solution: 'Autonomous drone delivery network for urban and suburban areas.', techStack: 'ROS, Python, Computer Vision, AWS', marketPotential: '$9.7B Drone Delivery Market', demoURL: '#', pptURL: '#', NDAstatus: 'Pending', investorsInterested: [] },
];

const DeveloperDashboard = () => {
    const [activeTab, setActiveTab] = useState('my projects');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [ndas, setNdas] = useState([]);
    const [loading, setLoading] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: user.name || '',
        startupName: user.profileDetails?.startupName || '',
        domain: user.profileDetails?.domain || '',
        skills: user.profileDetails?.skills || '',
        description: user.profileDetails?.description || ''
    });

    const [projectForm, setProjectForm] = useState({
        title: '', problemStatement: '', solution: '', techStack: '', marketPotential: '', demoURL: '', pptURL: ''
    });

    const [ndaForm, setNdaForm] = useState({
        founderName: user.name || '', startupName: '', description: ''
    });

    useEffect(() => {
        if (activeTab === 'explore projects') fetchOtherProjects();
        if (activeTab === 'my projects') fetchMyProjects();
        if (activeTab === 'nda status') fetchMyNDAs();
    }, [activeTab]);

    const fetchOtherProjects = async () => {
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

    const fetchMyProjects = async () => {
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

    const handleSendRequest = async (projectId) => {
        try {
            await api.post(`/projects/${projectId}/request`);
            toast.success("Collaboration request sent!");
            fetchOtherProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send request");
        }
    };

    const handleAcceptRequest = async (projectId, userId, status) => {
        try {
            await api.put(`/projects/${projectId}/request/${userId}`, { status });
            toast.success(`Request ${status}!`);
            fetchMyProjects();
        } catch (error) {
            toast.error("Failed to update request");
        }
    };

    const fetchMyNDAs = async () => {
        setLoading(true);
        try {
            const res = await api.get('/nda');
            setNdas(res.data);
        } catch (error) {
            toast.error("Failed to fetch NDA status");
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
                    startupName: profileForm.startupName,
                    domain: profileForm.domain,
                    skills: profileForm.skills,
                    description: profileForm.description
                }
            });
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    const handlePostIdea = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', projectForm);
            toast.success("Idea posted successfully!");
            setProjectForm({ title: '', problemStatement: '', solution: '', techStack: '', marketPotential: '', demoURL: '', pptURL: '' });
            setActiveTab('my projects');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post idea");
        }
    };

    const handleApplyNDA = async (e) => {
        e.preventDefault();
        try {
            await api.post('/nda/apply', ndaForm);
            toast.success("NDA application submitted!");
            fetchMyNDAs();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply for NDA");
        }
    };

    const inputClass = "block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none placeholder-slate-400";

    return (
        <div className="min-h-screen bg-white flex text-slate-800">
            <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col pt-8">
                <div className="px-6 mb-10">
                    <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Developer Panel</h2>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest capitalize">{user.role} Developer</p>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {['profile', 'post idea', 'my projects', 'explore projects', 'nda status', 'selection tracker'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-5 py-4 rounded-xl font-bold text-sm transition-all ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                                } capitalize`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-light p-10 border-slate-200 shadow-xl">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Your Profile</h3>
                            <form onSubmit={handleProfileUpdate} className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
                                    <input type="text" className={inputClass} value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Startup Name</label>
                                    <input type="text" className={inputClass} placeholder="e.g. Acme Corp" value={profileForm.startupName} onChange={(e) => setProfileForm({ ...profileForm, startupName: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Domain</label>
                                    <input type="text" className={inputClass} placeholder="e.g. AI / FinTech" value={profileForm.domain} onChange={(e) => setProfileForm({ ...profileForm, domain: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Skills</label>
                                    <input type="text" className={inputClass} placeholder="React, Node.js" value={profileForm.skills} onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })} />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                                    <textarea className={inputClass} rows="4" placeholder="Brief about your startup" value={profileForm.description} onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}></textarea>
                                </div>
                                <div className="col-span-2">
                                    <button type="submit" className="btn-primary">Save Profile</button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === 'post idea' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-light p-10 border-slate-200 shadow-xl">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Post Startup Idea</h3>
                            <form onSubmit={handlePostIdea} className="space-y-6">
                                <input type="text" placeholder="Idea Title" className={inputClass} value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
                                <textarea placeholder="Problem Statement" rows="3" className={inputClass} value={projectForm.problemStatement} onChange={(e) => setProjectForm({ ...projectForm, problemStatement: e.target.value })} required></textarea>
                                <textarea placeholder="Solution" rows="3" className={inputClass} value={projectForm.solution} onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })} required></textarea>
                                <input type="text" placeholder="Tech Stack" className={inputClass} value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} required />
                                <input type="text" placeholder="Market Potential" className={inputClass} value={projectForm.marketPotential} onChange={(e) => setProjectForm({ ...projectForm, marketPotential: e.target.value })} required />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="url" placeholder="Demo Video Link" className={inputClass} value={projectForm.demoURL} onChange={(e) => setProjectForm({ ...projectForm, demoURL: e.target.value })} />
                                    <input type="url" placeholder="PPT Link (Google Drive/Canva)" className={inputClass} value={projectForm.pptURL} onChange={(e) => setProjectForm({ ...projectForm, pptURL: e.target.value })} />
                                </div>
                                <button type="submit" className="w-full btn-primary">Submit Project</button>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === 'my projects' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">My Posted Ideas</h3>
                            <p className="text-slate-500 mb-8 font-medium">{projects.length} projects in your portfolio</p>
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-32 bg-slate-900 rounded-xl"></div>
                                    <div className="h-32 bg-slate-900 rounded-xl"></div>
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-12 glass-dark border-blue-500/20">
                                    <p className="text-slate-500">You haven't posted any ideas yet.</p>
                                    <button onClick={() => setActiveTab('post idea')} className="mt-4 text-blue-400 font-bold hover:text-white transition">Post your first idea</button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {projects.map((project) => (
                                        <motion.div key={project._id} whileHover={{ scale: 1.02 }} className="glass-light p-6 border-slate-200 shadow-sm hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="text-lg font-bold text-blue-600">{project.title}</h4>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${project.NDAstatus === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                                                    project.NDAstatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                    {project.NDAstatus || 'Pending'} NDA
                                                </span>
                                            </div>
                                            <p className="text-slate-500 mb-4 text-sm line-clamp-2">{project.problemStatement}</p>
                                            <p className="text-xs text-slate-600 mb-4 font-mono">{project.techStack}</p>
                                            <div className="flex justify-between items-center text-sm border-t border-slate-800 pt-4">
                                                <span className="text-slate-500">Investors: <span className="font-bold text-blue-400">{project.investorsInterested?.length || 0}</span></span>
                                                <div className="flex gap-3">
                                                    {project.pptURL && <a href={project.pptURL} target="_blank" className="text-xs text-cyan-400 hover:text-white font-bold transition">📄 PPT</a>}
                                                    {project.demoURL && <a href={project.demoURL} target="_blank" className="text-xs text-blue-400 hover:text-white font-bold transition">🎬 Demo</a>}
                                                </div>
                                            </div>
                                            
                                            {project.collaborationRequests?.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                                                    <p className="text-xs font-bold text-slate-400 mb-2">Collaboration Requests</p>
                                                    {project.collaborationRequests.map(req => (
                                                        <div key={req.user?._id || Math.random()} className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg text-xs">
                                                            <span className="font-medium text-slate-300">{req.user?.name || 'Unknown'} ({req.status})</span>
                                                            {req.status === 'Pending' && (
                                                                <div className="flex gap-2 text-white">
                                                                    <button onClick={() => handleAcceptRequest(project._id, req.user._id, 'Accepted')} className="text-green-400 font-bold hover:underline">Accept</button>
                                                                    <button onClick={() => handleAcceptRequest(project._id, req.user._id, 'Rejected')} className="text-red-400 font-bold hover:underline">Reject</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'explore projects' && (
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

                    {activeTab === 'nda status' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">NDA Management</h3>
                            {ndas.length > 0 ? (
                                <div className="space-y-6">
                                    {ndas.map((nda) => (
                                        <div key={nda._id} className="glass-light p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-slate-200 shadow-sm">
                                            <div>
                                                <h4 className="font-bold text-slate-900">{nda.startupName}</h4>
                                                <p className="text-sm text-slate-500">{nda.description}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${nda.status === 'Approved' ? 'bg-green-50 text-green-600 border border-green-200' :
                                                    nda.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-200' :
                                                        'bg-blue-50 text-blue-600 border border-blue-200'
                                                    }`}>
                                                    {nda.status}
                                                </span>
                                                {nda.approvalDate && <p className="text-[10px] text-slate-400 mt-1 italic font-bold">Approved on {new Date(nda.approvalDate).toLocaleDateString()}</p>}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-8 border-t border-slate-800 text-center">
                                        <p className="text-slate-600 text-sm mb-4">Need another NDA for a new project?</p>
                                        <button onClick={() => setNdas([])} className="btn-secondary">Apply for New NDA</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="glass-dark p-10 max-w-lg mx-auto border-blue-500/20">
                                    <div className="w-16 h-16 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                    <h4 className="text-xl font-black text-center mb-6 uppercase">Apply for Your Startup NDA</h4>
                                    <form onSubmit={handleApplyNDA} className="space-y-4">
                                        <input type="text" placeholder="Startup Name" className={inputClass} value={ndaForm.startupName} onChange={(e) => setNdaForm({ ...ndaForm, startupName: e.target.value })} required />
                                        <textarea placeholder="Tell us about your startup vision..." className={inputClass} rows="4" value={ndaForm.description} onChange={(e) => setNdaForm({ ...ndaForm, description: e.target.value })} required></textarea>
                                        <button className="w-full btn-primary">Submit NDA Application</button>
                                    </form>
                                    <p className="text-xs text-slate-600 mt-4 text-center italic">Admin will review and approve via digital signature.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'selection tracker' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Selection Tracker</h3>
                            <p className="text-slate-500 mb-8 font-medium">See which entrepreneurs and investors have expressed interest.</p>
                            {loading ? (
                                <div className="animate-pulse h-32 bg-slate-900 rounded-xl"></div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-12 glass-dark border-blue-500/20">
                                    <p className="text-slate-500">You need to post ideas before they can be tracked.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {projects.filter(p => p.investorsInterested?.length > 0).map((project) => (
                                        <div key={project._id} className="glass-light p-6 border-l-4 border-blue-600 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-lg font-bold text-slate-900">{project.title}</h4>
                                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200 uppercase tracking-widest">
                                                    {project.investorsInterested?.length || 0} Interested
                                                </span>
                                            </div>
                                            <ul className="divide-y divide-slate-800">
                                                {project.investorsInterested?.map((entity, idx) => (
                                                    <li key={idx} className="py-3 flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                                                {entity.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <span className="font-medium text-slate-300">{entity.name}</span>
                                                        </div>
                                                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded">
                                                            {entity.role || 'Investor'}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DeveloperDashboard;
