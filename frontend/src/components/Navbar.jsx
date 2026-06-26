import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (!user) return '/login';
        if (user.role === 'admin') return '/admin';
        if (user.role === 'investor') return '/investor';
        if (user.role === 'entrepreneur') return '/entrepreneur';
        return '/developer';
    };

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl z-50 px-8 py-4 flex justify-between items-center border-b border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo_new.png"
                        alt="IdeaBridge Logo"
                        className="h-[70px] w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="text-3xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        IdeaBridge
                    </span>
                </Link>
            </div>
            <div className="hidden md:flex gap-10 items-center font-bold text-slate-600">
                <Link to="/" className="hover:text-blue-600 transition-all text-sm">Home</Link>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-600 transition-all text-sm cursor-pointer">About</a>
                <Link to="/platform" className="hover:text-blue-600 transition-all text-sm">Platform</Link>
            </div>
            <div className="flex gap-6 items-center">
                {user ? (
                    <>
                        <Link
                            to={getDashboardLink()}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-tight"
                        >
                            {user.role === 'admin' ? 'Command Center' :
                                (user.role === 'investor' || user.role === 'entrepreneur') ? 'Executive Suite' :
                                    'Developer Suite'}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-slate-100 text-slate-700 font-bold py-2 px-6 rounded-xl text-xs hover:bg-slate-200 transition-all"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-slate-600 font-bold hover:text-blue-600 transition text-sm">Sign In</Link>
                        <Link to="/register" className="bg-blue-600 text-white font-bold py-2.5 px-8 rounded-xl text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
