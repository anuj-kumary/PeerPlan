export const Card = ({ name, role, image }: { name: string, role: string, image: string }) => (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden mx-auto my-4 h-64">
        <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mt-2 mb-3 rounded-full shadow-lg" src={image} alt={`${name} image`} />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">{name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
            <div className="flex mt-4 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
            </div>
        </div>
    </div>
);
