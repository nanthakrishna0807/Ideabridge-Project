import React from 'react';
import { motion } from 'framer-motion';

const entrepreneurImages = [
    'https://www.datocms-assets.com/14946/1694678692-startup-idea-concept.png?auto=format&fit=max&w=1200',
    'https://2muchcoffee.com/blog/content/images/2020/06/top-10-platform-for-startup-to-launch-your-project-.png',
    'https://images.ctfassets.net/w6r2i5d8q73s/7sY6Er647cZWwzWrT7RrYW/644c5f84100732cb4f29b923bc9a2105/brainstorming_product_image_EN_standard_3_2.png?fm=webp&q=75',
];

const investorImages = [
    'https://cdn.prod.website-files.com/65c3566fb48eaadc908d6789/66f58ca287d43024f84f401f_Pitch%20deck.png',
    'https://images.klipfolio.com/website/public/f55b7700-a747-4fe2-ab3b-cd85b03640a6/startup-dashboard.png',
    'https://fastercapital.com/i/What-early-bird-investors-Really-Want-In-A-startup-Idea--How-to-evaluate-a-startup-idea.webp',
];

const developerImages = [
    'https://oxfordinstitute.in/photo/courses/full-stack/full-stack-course.webp',
    'https://miro.medium.com/v2/resize%3Afit%3A1060/1%2A_U387qUzyk5mMUAukaTqWw.png',
    'https://cdn.dribbble.com/userupload/45500370/file/still-5ad48b6c396ff2a3dc50c5b84b0bbe5c.png?format=webp&resize=400x300&vertical=center',
];

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const ImageRow = ({ images }) => (
    <div className="grid grid-cols-3 gap-4 my-8">
        {images.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 aspect-[4/3]">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
        ))}
    </div>
);

const StepItem = ({ emoji, title, children }) => (
    <motion.div variants={fadeIn} className="mb-6">
        <h4 className="text-lg font-bold text-slate-900 mb-2">{emoji} {title}</h4>
        <div className="text-slate-600 leading-relaxed text-sm pl-8">{children}</div>
    </motion.div>
);

const PlatformGuide = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
                        🚀 IdeaBridge Platform
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        IdeaBridge is a collaborative platform that connects <span className="font-bold text-blue-600">Entrepreneurs</span>, <span className="font-bold text-blue-600">Investors</span>, and <span className="font-bold text-blue-600">Mentors</span> to transform innovative ideas into successful startups.
                    </p>
                </motion.div>

                {/* ─── Entrepreneur Section ─── */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                        <span className="text-4xl">👨‍💼</span> Entrepreneur Instructions
                    </h2>
                    <div className="h-1 w-24 bg-blue-600 rounded-full mb-6"></div>

                    <ImageRow images={entrepreneurImages} />

                    <div className="glass-light p-8 border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Step-by-Step Workflow</h3>

                        <StepItem emoji="1️⃣" title="Register on IdeaBridge">
                            <p>Sign up on the platform.</p>
                            <p>Select the <strong>Entrepreneur</strong> role during registration.</p>
                        </StepItem>

                        <StepItem emoji="2️⃣" title="Access Entrepreneur Dashboard">
                            <p>After login, you will be redirected to the Entrepreneur Dashboard.</p>
                            <p>Here you can manage your startup ideas.</p>
                        </StepItem>

                        <StepItem emoji="3️⃣" title="Submit Your Startup Idea">
                            <p>Enter details like:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>Idea title</li>
                                <li>Problem statement</li>
                                <li>Proposed solution</li>
                                <li>Market potential</li>
                                <li>Technology used</li>
                            </ul>
                        </StepItem>

                        <StepItem emoji="4️⃣" title="Request Feedback">
                            <p>Mentors on the platform can review your idea.</p>
                            <p>You receive suggestions and improvements.</p>
                        </StepItem>

                        <StepItem emoji="5️⃣" title="Connect with Investors">
                            <p>Investors can browse ideas posted on the platform.</p>
                            <p>If interested, they can contact you for discussion.</p>
                        </StepItem>

                        <StepItem emoji="6️⃣" title="Collaborate and Grow">
                            <p>Work with mentors and investors to refine your idea.</p>
                            <p>Move from idea stage → startup launch.</p>
                        </StepItem>
                    </div>
                </motion.section>

                {/* ─── Investor Section ─── */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                        <span className="text-4xl">💰</span> Investor Instructions
                    </h2>
                    <div className="h-1 w-24 bg-green-600 rounded-full mb-6"></div>

                    <ImageRow images={investorImages} />

                    <div className="glass-light p-8 border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Step-by-Step Workflow</h3>

                        <StepItem emoji="1️⃣" title="Register as Investor">
                            <p>Create an account on IdeaBridge.</p>
                            <p>Select <strong>Investor</strong> role.</p>
                        </StepItem>

                        <StepItem emoji="2️⃣" title="Login to Investor Dashboard">
                            <p>Access the list of startup ideas submitted by entrepreneurs.</p>
                        </StepItem>

                        <StepItem emoji="3️⃣" title="Explore Startup Ideas">
                            <p>Review:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>Problem and solution</li>
                                <li>Market opportunity</li>
                                <li>Business model</li>
                                <li>Innovation level</li>
                            </ul>
                        </StepItem>

                        <StepItem emoji="4️⃣" title="Evaluate Opportunities">
                            <p>Identify promising ideas that align with your investment interests.</p>
                        </StepItem>

                        <StepItem emoji="5️⃣" title="Connect with Entrepreneurs">
                            <p>Reach out through the platform to discuss potential collaboration.</p>
                        </StepItem>

                        <StepItem emoji="6️⃣" title="Support Startup Growth">
                            <p>Provide funding, advice, or strategic connections to help the startup succeed.</p>
                        </StepItem>
                    </div>
                </motion.section>

                {/* ─── Developer Section ─── */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                        <span className="text-4xl">👨‍💻</span> Developer Instructions
                    </h2>
                    <div className="h-1 w-24 bg-indigo-600 rounded-full mb-6"></div>

                    <ImageRow images={developerImages} />

                    <div className="glass-light p-8 border-slate-200 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Step-by-Step Workflow</h3>

                        <StepItem emoji="1️⃣" title="Setup Development Environment">
                            <p>Install:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>Node.js</li>
                                <li>MongoDB</li>
                                <li>VS Code</li>
                            </ul>
                        </StepItem>

                        <StepItem emoji="2️⃣" title="Backend Setup">
                            <p>Use Node.js + Express.</p>
                            <p>Create APIs for:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>User authentication</li>
                                <li>Idea submission</li>
                                <li>Dashboard data</li>
                            </ul>
                        </StepItem>

                        <StepItem emoji="3️⃣" title="Database Integration">
                            <p>Use MongoDB with Mongoose.</p>
                            <p>Store:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>User accounts</li>
                                <li>Startup ideas</li>
                                <li>Feedback and interactions</li>
                            </ul>
                        </StepItem>

                        <StepItem emoji="4️⃣" title="Frontend Development">
                            <p>Build UI using:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>React or HTML/CSS/JS</li>
                            </ul>
                            <p className="mt-2">Create pages:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>Login/Register</li>
                                <li>Entrepreneur Dashboard</li>
                                <li>Investor Dashboard</li>
                            </ul>
                        </StepItem>

                        <StepItem emoji="5️⃣" title="API Integration">
                            <p>Connect frontend forms with backend APIs.</p>
                            <p>Use fetch or axios for requests.</p>
                        </StepItem>

                        <StepItem emoji="6️⃣" title="Testing and Deployment">
                            <p>Test platform functionality.</p>
                            <p>Deploy using services like:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                                <li>Vercel</li>
                                <li>Render</li>
                                <li>Netlify</li>
                            </ul>
                        </StepItem>
                    </div>
                </motion.section>

                {/* ─── How IdeaBridge Connects Everyone ─── */}
                <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                    <div className="glass-light p-10 border-blue-100 bg-blue-50/30 text-center shadow-lg">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
                            🌉 How IdeaBridge Connects Everyone
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: '1️⃣', text: 'Entrepreneurs submit ideas' },
                                { step: '2️⃣', text: 'Mentors review and improve them' },
                                { step: '3️⃣', text: 'Investors discover promising startups' },
                                { step: '4️⃣', text: 'Collaboration turns ideas into businesses' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <p className="text-3xl mb-3">{item.step}</p>
                                    <p className="font-bold text-slate-700 text-sm">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-slate-600 text-lg">
                            This ecosystem helps innovators move from concept to real startup faster.
                        </p>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default PlatformGuide;
