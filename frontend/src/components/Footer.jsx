import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-brandBlue text-white rounded-full flex items-center justify-center font-bold text-sm">
                            IB
                        </div>
                        <span className="text-xl font-bold text-white">IdeaBridge</span>
                    </Link>
                    <p className="max-w-sm mb-6">
                        The premium platform connecting exceptional startup developers with visionary investors. Secure, fast, and protected.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition">Twitter</a>
                        <a href="#" className="hover:text-white transition">LinkedIn</a>
                        <a href="#" className="hover:text-white transition">GitHub</a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:text-brandOrange transition">About Us</a></li>
                        <li><a href="#" className="hover:text-brandOrange transition">How It Works</a></li>
                        <li><a href="#" className="hover:text-brandOrange transition">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-brandOrange transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-brandOrange transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-brandOrange transition">NDA Policy</a></li>
                        <li><a href="#" className="hover:text-brandOrange transition">Security</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-center">
                &copy; {new Date().getFullYear()} IdeaBridge Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
