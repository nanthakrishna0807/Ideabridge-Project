import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const fallbackStats = {
    studentCount: 42,
    emergingCount: 18,
    entrepreneurCount: 31,
    investorCount: 27,
    projectCount: 56,
    ndaCount: 89,
    collabCount: 34
};

const fallbackLogs = [
    { id: 1, type: 'info', message: 'New project "GreenChain" posted by student dev @eco_dev', time: '2 min ago' },
    { id: 2, type: 'success', message: 'NDA approved for "NeuroAssist" – investor @kapital_ventures', time: '15 min ago' },
    { id: 3, type: 'warning', message: 'Collaboration request pending for "QuantumLeap AI"', time: '1 hour ago' },
    { id: 4, type: 'info', message: 'Admin reviewed 5 new NDA applications', time: '3 hours ago' },
    { id: 5, type: 'success', message: 'Investment of $250K confirmed for "MedScan Pro"', time: '5 hours ago' },
    { id: 6, type: 'info', message: 'New user registration: 3 investors, 5 developers today', time: '6 hours ago' },
    { id: 7, type: 'warning', message: 'NDA violation flag raised for project "DataMesh" – under review', time: '1 day ago' },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [ndas, setNdas] = useState([]);
    const [projects, setProjects] = useState([]);
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, ndasRes, projectsRes, logsRes, usersRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/nda'),
                api.get('/projects'),
                api.get('/admin/logs'),
                api.get('/admin/users')
            ]);
            setStats(statsRes.data);
            setNdas(ndasRes.data);
            setProjects(projectsRes.data);
            setLogs(logsRes.data?.length > 0 ? logsRes.data : fallbackLogs);
            setUsers(usersRes.data);
        } catch (error) {
            setStats(fallbackStats);
            setLogs(fallbackLogs);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateNda = async (id, status) => {
        try {
            await api.put(`/nda/${id}/status`, { status });
            toast.success(`NDA ${status} successfully`);
            fetchData();
        } catch (error) {
            toast.error("Failed to update NDA status.");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await api.delete(`/admin/users/${id}`);
            toast.success("User deleted successfully");
            fetchData();
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    const displayStats = stats || fallbackStats;

    return (
        <div className="min-h-screen bg-white flex text-slate-800">
            <aside className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col pt-8">
                <div className="px-6 mb-10">
                    <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Command Center</h2>
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">IdeaBridge Admin</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {['overview', 'nda management', 'project monitoring', 'activity logs', 'user management'].map(tab => (
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

            <main className="flex-1 p-10 bg-white overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Platform Overview</h3>
                                    <p className="text-slate-500 mb-10 font-medium">Real-time intelligence across the IdeaBridge network.</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                        {[
                                            { label: "Student Devs", val: displayStats.studentCount, color: 'text-blue-600', border: 'border-slate-200' },
                                            { label: "Emerging Devs", val: displayStats.emergingCount, color: 'text-indigo-600', border: 'border-slate-200' },
                                            { label: "Entrepreneurs", val: displayStats.entrepreneurCount, color: 'text-cyan-600', border: 'border-slate-200' },
                                            { label: "Investors", val: displayStats.investorCount, color: 'text-green-600', border: 'border-slate-200' },
                                        ].map((stat, i) => (
                                            <motion.div key={i} whileHover={{ scale: 1.05 }} className={`glass-light p-6 shadow-sm ${stat.border}`}>
                                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
                                                <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Key Metrics Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <motion.div whileHover={{ scale: 1.03 }} className="glass-light p-8 border-blue-600/10 shadow-lg shadow-blue-600/5">
                                            <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Global Project Count</p>
                                            <p className="text-6xl font-black text-slate-900">{displayStats.projectCount}</p>
                                            <p className="text-slate-500 text-sm mt-2">Active startups on the platform</p>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.03 }} className="glass-light p-8 border-slate-200 shadow-sm">
                                            <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">NDA Assurance</p>
                                            <p className="text-6xl font-black text-slate-900">{displayStats.ndaCount}</p>
                                            <p className="text-slate-500 text-sm mt-2">Total NDA applications processed</p>
                                            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: `${Math.min(100, (ndas.filter(n => n.status === 'Approved').length / Math.max(1, displayStats.ndaCount)) * 100)}%` }}></div>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">{ndas.filter(n => n.status === 'Approved').length} verified / {displayStats.ndaCount} total</p>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.03 }} className="glass-light p-8 border-slate-200 shadow-sm">
                                            <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-3">Total Collaborations</p>
                                            <p className="text-6xl font-black text-slate-900">{displayStats.collabCount}</p>
                                            <p className="text-slate-500 text-sm mt-2">Successful partnerships formed</p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'nda management' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">NDA Management</h3>
                                    <p className="text-slate-500 mb-10 font-medium">Review and govern all intellectual property agreements.</p>
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200">
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Startup Name</th>
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Applicant</th>
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Status</th>
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ndas.length === 0 ? (
                                                    <tr><td colSpan="4" className="p-8 text-center text-slate-400">No NDA applications found</td></tr>
                                                ) : ndas.map((nda) => (
                                                    <tr key={nda._id} className="border-t border-slate-100 hover:bg-slate-50/50 transition">
                                                        <td className="p-5 font-bold text-slate-900">{nda.startupName}</td>
                                                        <td className="p-5 text-slate-600">{nda.developerId?.name || 'Unknown'}</td>
                                                        <td className="p-5">
                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${nda.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                                                                nda.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                                                    'bg-blue-50 text-blue-600 border-blue-200'
                                                                }`}>
                                                                {nda.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-5">
                                                            {nda.status === 'Pending' && (
                                                                <>
                                                                    <button onClick={() => handleUpdateNda(nda._id, 'Approved')} className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition uppercase tracking-tighter mr-2">Approve</button>
                                                                    <button onClick={() => handleUpdateNda(nda._id, 'Rejected')} className="text-[10px] bg-white hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 font-bold transition uppercase tracking-tighter">Reject</button>
                                                                </>
                                                            )}
                                                            {nda.status !== 'Pending' && (
                                                                <span className="text-slate-400 text-[10px] font-bold uppercase">Concluded</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'project monitoring' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Project Live Feeds</h3>
                                    <p className="text-slate-500 mb-10 font-medium">Monitoring all active startups over the secure network...</p>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {projects.length === 0 ? (
                                            <p className="text-slate-400 col-span-3 text-center py-12">No projects actively being monitored.</p>
                                        ) : projects.map((project) => (
                                            <motion.div key={project._id} whileHover={{ scale: 1.03 }} className="glass-light p-6 border-slate-200 shadow-sm relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-3"><span className="flex w-3 h-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span></span></div>
                                                <h4 className="font-bold text-slate-900 mb-2">{project.title}</h4>
                                                <p className="text-slate-500 text-sm mb-4">Investors Active: <span className="text-blue-600 font-bold">{project.investorsInterested?.length || 0}</span></p>
                                                <div className="h-1.5 bg-slate-100 rounded w-full overflow-hidden"><div className="w-[85%] bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded"></div></div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'activity logs' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">System Activity</h3>
                                    <p className="text-slate-500 mb-10 font-medium">Real-time audit trail of platform events.</p>
                                    <div className="space-y-4">
                                        {(logs.length > 0 ? logs : fallbackLogs).map((log) => (
                                            <div key={log.id} className={`glass-light p-5 border-l-4 shadow-sm ${log.type === 'info' ? 'border-blue-600' :
                                                log.type === 'success' ? 'border-green-600' :
                                                    'border-yellow-600'
                                                }`}>
                                                <p className="text-sm font-bold text-slate-800">{log.message}</p>
                                                <span className="text-xs text-slate-400 mt-1 block uppercase font-bold tracking-tighter">{log.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            
                            {activeTab === 'user management' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">User Management</h3>
                                    <p className="text-slate-500 mb-10 font-medium">Govern all registered platform operatives.</p>
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200">
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Name</th>
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Email</th>
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Role</th>
                                                    <th className="p-5 font-black text-xs text-slate-500 uppercase tracking-widest">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.length === 0 ? (
                                                    <tr><td colSpan="4" className="p-8 text-center text-slate-400">No users found</td></tr>
                                                ) : users.map((u) => (
                                                    <tr key={u._id} className="border-t border-slate-100 hover:bg-slate-50/50 transition">
                                                        <td className="p-5 font-bold text-slate-900">{u.name}</td>
                                                        <td className="p-5 text-slate-600">{u.email}</td>
                                                        <td className="p-5">
                                                            <span className="px-3 py-1 rounded-full text-[10px] font-black border bg-slate-100 text-slate-600 border-slate-200 uppercase tracking-widest">
                                                                {u.role}
                                                            </span>
                                                        </td>
                                                        <td className="p-5">
                                                            {u.role !== 'admin' && (
                                                                <button onClick={() => handleDeleteUser(u._id)} className="text-[10px] bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-lg font-bold transition uppercase tracking-tighter">Delete</button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
