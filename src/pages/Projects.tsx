import russianIdiomsImg from '../assets/russianidioms.png';

export default function Projects() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-black">My Projects</h2>
                <p className="text-neutral-500">A selection of my recent work</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                <div className="border border-neutral-300 rounded hover:shadow-lg transition-shadow">
                    <a href={"https://russianidioms.com"} target="_blank">
                        <img src={russianIdiomsImg} alt="Russian Idioms Website"
                             className="w-full h-48 object-cover rounded-t"/>
                    </a>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-black">Russian Idioms</h3>
                        <p className="text-neutral-600">This application serves as a database for Russian Idioms, where users can submit new idioms, study existing idioms, add idioms to their collection, and more!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}