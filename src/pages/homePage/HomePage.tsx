import RightArrowIcon from '../../components/Icons/RightArrowIcon'

export const HomePage = () => {
    return (
        <div className='text-center justify-center flex flex-col mt-20'>
            <h1 className='text-4xl font-medium'>Where Developers Become <span className='text-[#3b58ff]'>Teams.</span></h1>
            <div className='w-full flex justify-center mt-3'>
                <p className='text-center w-[70%] text-lg'>PeerPlan brings coders together to share skills, launch projects, and take collaboration to the next level.</p>
            </div>
            <div className='flex justify-center mt-6'>
                <button className='flex border rounded-full px-6 py-3 bg-[#3b5aff] items-center bg-gradient-to-l text-white'>Get Started
                    <span className='ml-5 bg-white rounded-full p-1'><RightArrowIcon /></span> </button>
                <button className='ml-2 flex items-center border rounded-full px-6 py-3 '>Get Demo</button>
            </div>
            <div className="flex justify-center h-screen">  <img className="w-[70%] h-[70%]" src='/src/assets/images/connection-home.jpg' /></div>

        </div>
    )
}
