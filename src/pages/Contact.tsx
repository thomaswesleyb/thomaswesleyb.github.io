export default function Contact() {
    const handleSubmit = () => {

    }

    return (
        <section className="py-12 bg-black text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
            <p className="text-neutral-400 max-w-md mx-auto mb-6">
                Have a project in mind or just want to say hello? Feel free to reach out.
            </p>
            <form className="flex flex-col items-center space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-80 px-4 py-2 bg-neutral-800 text-white rounded"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-80 px-4 py-2 bg-neutral-800 text-white rounded"
                />
                <textarea
                    placeholder="Your Message"
                    className="w-80 px-4 py-2 bg-neutral-800 text-white rounded"
                    rows={4}
                />
                <button className="px-6 py-2 bg-white text-black rounded hover:bg-neutral-200" onClick={handleSubmit}>
                    Send Message
                </button>
            </form>
        </section>
    );
}