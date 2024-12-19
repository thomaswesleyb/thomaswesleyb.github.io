import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black text-white px-4 py-2">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold"></div>
                <button
                    className="md:hidden text-black"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="hover:text-neutral-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-neutral-400">About</Link></li>
                    <li><Link to="/projects" className="hover:text-neutral-400">Projects</Link></li>
                    <li><Link to="/contact" className="hover:text-neutral-400">Contact</Link></li>
                </ul>
            </div>
            {isOpen && (
                <ul className="md:hidden mt-4 space-y-2">
                    <li><Link to="/" className="hover:text-neutral-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-neutral-400">About</Link></li>
                    <li><Link to="/projects" className="hover:text-neutral-400">Projects</Link></li>
                    <li><Link to="/contact" className="hover:text-neutral-400">Contact</Link></li>
                </ul>
            )}
        </nav>
    );
}
