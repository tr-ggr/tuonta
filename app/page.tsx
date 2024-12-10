import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function landing(){
    return(
        <div className="overflow-y-hidden">
            <div className="flex flex-wrap px-5 pt-2 items-center justify-between">
                <div className="bg-[url('/images/TuonTaLOGO.png')] bg-contain bg-center bg-no-repeat w-28 h-16"></div>
                <div className="flex flex-wrap items-center pt-3  pr-3 ">
                    <Link href = "/login">
                        <div className="pr-5 hover:text-blue-800 hover:underline">Sign in</div>
                    </Link>
                    <Link href = "/signup">
                        <button type="button" className="text-white bg-indigo-900 hover:bg-blue-800 font-medium rounded-full text-sm w-36 h-11 flex items-center justify-center">
                        <span className="flex items-center space-x-3">
                            <span>Get Started</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap h-screen items-center justify-center content-center space-x-36 pb-10">
                <div className="flex-col items-center content-center pl-10 space-y-5 pb-20 ml-20">
                    <div>
                        <h1 className="text-5xl font-bold text-indigo-950">Find Your Perfect</h1>
                        <h1 className="text-5xl font-bold text-purple-900">Study Match</h1>
                    </div>
                    <p>Swipe to connect with like-minded learners. Ace your goals together!</p>
                    <div>
                        <Link href = "/signup">
                            <button type="button" className="text-white bg-indigo-900 hover:bg-blue-800 font-medium rounded-full text-sm w-44 h-11 flex items-center justify-center">
                            <span className="flex items-center space-x-3">
                                <span>Get started for free</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bg-[url('/images/LandingBG.png')] bg-contain bg-center bg-no-repeat w-1/2 h-5/6"></div>
            </div>
        </div>
        


    )
}