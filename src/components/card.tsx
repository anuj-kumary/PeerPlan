export const Card = ({ name, role, image }: { name: string, role?: string, image: string }) => (



    <><div className="bg-gray-800 p-4 border rounded-lg">
        <img src={image} className="w-full object-contain object-top rounded-lg" />

        <div className="text-center mt-4">
            <h4 className="text-base font-semibold text-white">{role}</h4>
            <p className="text-xs mt-2 text-white">{name}</p>
        </div>
    </div>
        {/* <div className="bg-gray-800 p-4 border rounded-lg">
            <img src="https://readymadeui.com/team-2.webp" className="w-full object-contain object-top rounded-lg" />

            <div className="text-center mt-4">
                <h4 className="text-base font-semibold text-white">Web Developer</h4>
                <p className="text-xs mt-2 text-white">Mark Adair</p>
            </div>
        </div><div className="bg-gray-800 p-4 border rounded-lg">
            <img src="https://readymadeui.com/team-3.webp" className="w-full object-contain object-top rounded-lg" />

            <div className="text-center mt-4">
                <h4 className="text-base font-semibold text-white">Web Designer</h4>
                <p className="text-xs mt-2 text-white">Simon Konecki</p>
            </div>
        </div> */}
    </>
);
