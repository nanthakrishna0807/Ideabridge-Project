const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB.');

        // Clear out earlier data
        await User.deleteMany();
        await Project.deleteMany();

        console.log('Inserting specific Demo accounts...');

        // Admin Account
        const admin = new User({
            name: 'IdeaBridge Admin',
            email: 'admin@ib.com',
            password: 'admin123',
            role: 'admin'
        });

        // Developer (Student Role)
        const agentStudent = new User({
            name: 'Agent Student',
            email: 'developer@ib.com',
            password: 'developer123',
            role: 'student',
            profileDetails: { startupName: 'QuantumLeap AI', domain: 'Education', skills: 'React, Node.js' }
        });

        // Investor
        const agentInvestor = new User({
            name: 'Agent Investor',
            email: 'collab@ib.com',
            password: 'collab123',
            role: 'investor',
            profileDetails: { company: 'Venture Capital X', investmentDomain: 'FinTech', budgetRange: '$1M+' }
        });

        // Extra accounts for completeness (using slight variations if needed, but primary ones are as requested)
        const agentDeveloper = new User({
            name: 'Agent Developer',
            email: 'dev@ib.com',
            password: 'developer123',
            role: 'emerging',
            profileDetails: { startupName: 'SkyNet Labs', domain: 'AI/ML', skills: 'Python, PyTorch' }
        });

        const agentEntrepreneur = new User({
            name: 'Agent Entrepreneur',
            email: 'ent@ib.com',
            password: 'collab123',
            role: 'entrepreneur',
            profileDetails: { startupName: 'GreenGrid Solutions', domain: 'CleanTech', description: 'Renewable energy distribution.' }
        });

        await admin.save();
        await agentStudent.save();
        await agentInvestor.save();
        await agentDeveloper.save();
        await agentEntrepreneur.save();

        console.log('Demo Users Inserted Successfully!');

        // Insert some dummy projects owned by agents for demo
        const projects = [
            { title: 'NeuroAssist AI', problemStatement: 'Mental health diagnostics are slow and expensive.', solution: 'AI chatbot for mental health screening.', techStack: 'Python, TensorFlow, React', marketPotential: '$4.2B', ownerID: agentStudent._id },
            { title: 'GreenChain', problemStatement: 'Carbon offset tracking lacks transparency.', solution: 'Blockchain carbon credit marketplace.', techStack: 'Solidity, Ethereum, React', marketPotential: '$2.1B', ownerID: agentDeveloper._id },
            { title: 'MedScan Pro', problemStatement: 'Rural areas lack diagnostic imaging.', solution: 'Mobile CV for X-ray pre-screening.', techStack: 'PyTorch, Flutter', marketPotential: '$8.9B', ownerID: agentStudent._id },
            { title: 'EduVerse XR', problemStatement: 'Traditional education fails Gen-Z.', solution: 'VR/AR classroom platform.', techStack: 'Unity, C#, WebXR', marketPotential: '$12.6B', ownerID: agentDeveloper._id },
            { title: 'AgriSense IoT', problemStatement: 'Farmers lose 30% crops.', solution: 'IoT + AI crop monitoring.', techStack: 'Arduino, MQTT, Python', marketPotential: '$6.3B', ownerID: agentEntrepreneur._id },
            { title: 'FinGuard AI', problemStatement: 'High false-positive fraud detection.', solution: 'Real-time ML ensemble analysis.', techStack: 'Scikit-learn, Kafka', marketPotential: '$10.4B', ownerID: agentStudent._id },
            { title: 'CloudKitchen OS', problemStatement: 'Ghost kitchens lack unified ops.', solution: 'SaaS multi-platform order management.', techStack: 'Node.js, MongoDB, React', marketPotential: '$1.8B', ownerID: agentDeveloper._id },
            { title: 'LegalBot Pro', problemStatement: 'Small businesses can\'t afford lawyers.', solution: 'AI contract generator & reviewer.', techStack: 'GPT-4 API, Next.js', marketPotential: '$3.5B', ownerID: agentStudent._id },
            { title: 'QuantumLeap AI', problemStatement: 'Drug discovery is slow and expensive.', solution: 'Quantum simulation for molecules.', techStack: 'Qiskit, Python, AWS', marketPotential: '$7.1B', ownerID: agentDeveloper._id },
            { title: 'SafeRoute', problemStatement: 'Commute safety concerns.', solution: 'AI route safety scoring.', techStack: 'React Native, Node.js', marketPotential: '$2.8B', ownerID: agentEntrepreneur._id },
            { title: 'DataMesh Platform', problemStatement: 'Enterprise data silos.', solution: 'Decentralized data mesh architecture.', techStack: 'Apache Spark, Kafka', marketPotential: '$15.2B', ownerID: agentStudent._id },
            { title: 'CyberShield AI', problemStatement: 'SMBs face 43% of cyberattacks.', solution: 'AI cybersecurity for small business.', techStack: 'ML, Python, React', marketPotential: '$11.5B', ownerID: agentDeveloper._id },
            { title: 'TutorMind AI', problemStatement: 'Personalized tutoring is unaffordable.', solution: 'AI tutor with gamification.', techStack: 'GPT-4, React, Firebase', marketPotential: '$5.9B', ownerID: agentEntrepreneur._id },
            { title: 'SolarGrid AI', problemStatement: 'Solar panel efficiency loss.', solution: 'Drone + AI panel optimization.', techStack: 'CV, DJI SDK, Python', marketPotential: '$5.6B', ownerID: agentStudent._id },
            { title: 'HireGenius', problemStatement: 'Tech hiring bias and delays.', solution: 'AI blind hiring & matching.', techStack: 'NLP, React, Django', marketPotential: '$3.8B', ownerID: agentDeveloper._id },
            { title: 'BioSynth', problemStatement: 'Synthetic biology modeling is complex.', solution: 'Cloud-based DNA sequence designer.', techStack: 'Python, Docker, React', marketPotential: '$4.5B', ownerID: agentEntrepreneur._id },
            { title: 'UrbanFlow', problemStatement: 'Traffic congestion in smart cities.', solution: 'Real-time traffic signal optimization.', techStack: 'C++, OpenCV, MQTT', marketPotential: '$9.2B', ownerID: agentStudent._id },
            { title: 'OceanClean', problemStatement: 'Microplastic detection in oceans.', solution: 'Autonomous underwater plastic scanners.', techStack: 'PyTorch, Raspberry Pi', marketPotential: '$1.5B', ownerID: agentDeveloper._id },
            { title: 'MarketMind', problemStatement: 'Retailers struggle with inventory.', solution: 'Predictive demand forecasting.', techStack: 'Scikit-learn, AWS', marketPotential: '$6.8B', ownerID: agentEntrepreneur._id },
            { title: 'HealthHub', problemStatement: 'Medical records are fragmented.', solution: 'Secure patient-owned health ledger.', techStack: 'Solidity, React Native', marketPotential: '$12.1B', ownerID: agentStudent._id },
            { title: 'PropTech Pro', problemStatement: 'Real estate valuation is opaque.', solution: 'AI-driven commercial property appraiser.', techStack: 'Node.js, MongoDB', marketPotential: '$3.2B', ownerID: agentDeveloper._id },
            { title: 'SwiftPay', problemStatement: 'Cross-border remittance fees.', solution: 'Stablecoin-based instant transfer.', techStack: 'Stellar, Go, React', marketPotential: '$18.4B', ownerID: agentEntrepreneur._id },
            { title: 'AeroLink', problemStatement: 'Last-mile drone delivery logistics.', solution: 'Unified drone traffic control system.', techStack: 'Python, Erlang', marketPotential: '$2.9B', ownerID: agentStudent._id },
            { title: 'NanoScan', problemStatement: 'Food contamination detection.', solution: 'Handheld molecular food scanner.', techStack: 'Spectroscopy, Python', marketPotential: '$5.1B', ownerID: agentDeveloper._id },
            { title: 'WealthWise', problemStatement: 'Financial literacy for teens.', solution: 'Gamified investment simulator.', techStack: 'Unity, Firebase', marketPotential: '$1.2B', ownerID: agentEntrepreneur._id },
            { title: 'CodeGuard', problemStatement: 'Security vulnerabilities in legacy code.', solution: 'Automated AI security auditor.', techStack: 'Rust, LLVM', marketPotential: '$8.7B', ownerID: agentStudent._id },
            { title: 'SupplyChain XR', problemStatement: 'Warehouse training is hazardous.', solution: 'VR-based forklift & safety training.', techStack: 'Unity, Meta Quest', marketPotential: '$4.3B', ownerID: agentDeveloper._id },
            { title: 'SleepTight', problemStatement: 'Insomnia affects productivity.', solution: 'AI-integrated smart sleeping mask.', techStack: 'Bluetooth LE, React', marketPotential: '$7.4B', ownerID: agentEntrepreneur._id },
            { title: 'BuildPoint', problemStatement: 'Construction site waste.', solution: 'AI optimization for prefab building.', techStack: 'C#, AutoCAD API', marketPotential: '$11.2B', ownerID: agentStudent._id },
            { title: 'VoiceAuth', problemStatement: 'Password-based auth is weak.', solution: 'Biometric voice identifier.', techStack: 'DeepSpeech, Python', marketPotential: '$6.1B', ownerID: agentDeveloper._id },
            { title: 'EcoTrack', problemStatement: 'Individual carbon footprint tracking.', solution: 'Lifestyle-based emissions tracker.', techStack: 'React Native, Node.js', marketPotential: '$2.5B', ownerID: agentEntrepreneur._id }
        ];

        await Project.insertMany(projects);

        console.log('Demo Projects Inserted Successfully!');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
