export default function Footer() {
    return (
        <footer className="py-6 bg-black text-white text-center">
            <p className="text-sm text-neutral-500">© T. Wesley Bailey 2024. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
                <a href="https://www.linkedin.com/in/bailey-wesley/" className="hover:text-neutral-400">LinkedIn</a>
                <a href="https://github.com/thomaswesleyb" className="hover:text-neutral-400">GitHub</a>
                <a href="#" className="hover:text-neutral-400">Twitter</a>
            </div>
        </footer>
    );
}