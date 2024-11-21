import RightArrowIcon from '../../components/Icons/RightArrowIcon'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const LandingPage = () => {
    return (
        <><Navbar /><div className='text-center justify-center flex flex-col mt-20'>
            <h1 className='text-4xl font-bold'>Where Developers Become <span className='text-[#3b58ff]'>Teams.</span></h1>
            <div className='w-full flex justify-center mt-3'>
                <p className='text-center w-[50%] text-lg'>PeerPlan brings coders together to share skills, launch projects, and take collaboration to the next level.</p>
            </div>
            <div className='flex justify-center mt-6'>
                <button className='flex border rounded-full px-6 py-3 bg-[#3b5aff] items-center bg-gradient-to-l text-white'>Get Started
                    <span className='ml-5 bg-white rounded-full p-1'><RightArrowIcon /></span> </button>
                <button className='ml-2 flex items-center border rounded-full px-6 py-3 '>Get Demo</button>
            </div>
            <DotLottieReact
                src="/src/assets/lottie/connecting.lottie"
                loop
                autoplay />

        </div>
            <Footer />
        </>
    )
}

export default LandingPage;
