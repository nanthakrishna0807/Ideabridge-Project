import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const visionItems = [
    { icon: '🌉', title: 'Build a Trusted Innovation Bridge', desc: 'Create a reliable digital platform that connects students, developers, and entrepreneurs in a secure environment.' },
    { icon: '🔐', title: 'Ensure Idea Safety', desc: 'Establish a system where innovative ideas are protected through transparency and NDA-based collaboration.' },
    { icon: '🚀', title: 'Foster Startup Growth', desc: 'Support the transformation of creative ideas into scalable and impactful startup ventures.' },
    { icon: '🎓', title: 'Empower Young Innovators', desc: 'Encourage students and solo developers to confidently participate in real-world entrepreneurial projects.' },
    { icon: '🌐', title: 'Create a Fair & Ethical Ecosystem', desc: 'Promote honesty, intellectual property respect, and equal opportunity in every collaboration.' },
];

const coreGoals = [
    { icon: '🎓', title: 'Empower Students', desc: 'Provide real-world opportunities for students and solo developers to collaborate on startup projects, gain practical experience, and showcase their skills.' },
    { icon: '🤝', title: 'Secure Collaboration', desc: 'Enable safe, transparent communication between students, developers, and entrepreneurs through structured workflows and verified interactions.' },
    { icon: '📜', title: 'Idea Protection', desc: 'Ensure intellectual property safety by supporting NDA-based agreements and preventing unauthorized use or idea theft.' },
    { icon: '🚀', title: 'Innovation Acceleration', desc: 'Help transform innovative ideas into scalable and sustainable startup solutions through technical support and structured collaboration.' },
    { icon: '🌐', title: 'Bridge the Gap', desc: 'Reduce the disconnect between talented students and visionary entrepreneurs by creating a trusted digital ecosystem.' },
    { icon: '💼', title: 'Ethical Startup Ecosystem', desc: 'Promote fairness, transparency, and mutual growth in every collaboration on the platform.' },
];

const LandingPage = () => {

    // Backend API Test
    useEffect(() => {
        fetch("/api/test")
            .then(res => res.json())
            .then(data => {
                console.log("Backend Response:", data);
            })
            .catch(err => {
                console.error("Backend Error:", err);
            });
    }, []);

    return (
        <div className="w-full bg-white">

            {/* Hero Section */}
            <section className="relative pt-32 pb-40 px-6 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white z-0"></div>

                <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
                    >
                        <div className="mb-8 inline-block px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider">
                            Secure Innovation Ecosystem
                        </div>

                        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-12 text-slate-900">
                            IdeaBridge – <br />
                            <span className="text-gradient">Connect. Innovate. Succeed.</span>
                        </h1>

                        <div className="flex flex-wrap gap-6">
                            <Link to="/register?role=student" className="btn-primary px-10 py-5 text-lg">
                                Join as Developer
                            </Link>

                            <Link to="/register?role=investor" className="btn-secondary px-10 py-5 text-lg text-white">
                                Join as Investor
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6 relative"
                    >
                        <div className="grid grid-cols-2 gap-6">

                            <div className="card-premium h-56 p-0 group overflow-hidden relative">
                                <img src="/connect.jpg" alt="Connect" className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-4 left-6 z-10">
                                    <span className="text-2xl font-black text-slate-900 drop-shadow-sm">Connect</span>
                                </div>
                            </div>

                            <div className="card-premium h-56 p-0 group overflow-hidden relative">
                                <img src="/innovate.jpg" alt="Innovate" className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-4 left-6 z-10">
                                    <span className="text-2xl font-black text-slate-900 drop-shadow-sm">Innovate</span>
                                </div>
                            </div>

                        </div>

                        <div className="card-premium h-64 p-0 group overflow-hidden relative">
                            <img src="/succeed.jpg" alt="Succeed" className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110" />
                            <div className="absolute bottom-8 left-10 z-10">
                                <span className="text-4xl font-black text-slate-900 drop-shadow-sm uppercase tracking-widest">
                                    Succeed
                                </span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Vision Section */}
            <section id="about" className="py-28 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
                            🌍 Vision of IdeaBridge
                        </h2>

                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Our driving principles that shape the future of secure innovation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visionItems.map((item, i) => (
                            <div key={i} className="card-premium border-none bg-white">
                                <div className="text-5xl mb-6">{item.icon}</div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

        </div>
    );
};

export default LandingPage;