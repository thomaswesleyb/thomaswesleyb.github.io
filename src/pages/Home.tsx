export default function Home() {
    return (
        <section className="h-screen flex flex-col justify-center items-center bg-black text-white text-center">
            <h1 className="text-6xl font-bold mb-4">Hello, I'm Wesley</h1>
            <p className="text-neutral-400 text-lg">
                I design and develop web applications.
            </p>
            <button className="mt-6 px-8 py-3 bg-white text-black font-medium rounded hover:bg-neutral-200">
                See My Work
            </button>
        </section>
    );
}