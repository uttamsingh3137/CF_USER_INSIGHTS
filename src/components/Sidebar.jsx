import { Link, useLocation } from "react-router-dom";
import Logo from "../../public/logo.jpg"
function Sidebar() {
    const location = useLocation();

    return (
        <div id="body1" className="bg-gray-800 text-white lg:w-96 lg:h-full sm:flex lg:flex-col flex sm:px-10 px-6 h-fit items-center justify-between lg:px-0 py-6">
            <Link
                to="/"
                className="text-lg lg:text-4xl font-bold lg:py-6 border-b border-gray-700 lg:border-none flex items-center gap-2"
            >
                <img className="h-12" src={Logo} alt="" />
                <span>CF User Insights</span>
            </Link>
            <nav className="lg:flex-grow">
                <ul className="lg:mx-6 lg:mt-4 lg:space-y-4 flex space-x-4 lg:flex-col sm:flex-row flex-col lg:space-x-0 ">
                    <li>
                        <Link
                            to="/"
                            className={`hidden sm:block py-2 px-4 lg:py-4 lg:px-8 text-sm lg:text-xl rounded-md ${
                                location.pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/plag"
                            className={`block py-2 px-4 lg:py-4 lg:px-8 text-sm lg:text-xl rounded-md ${
                                location.pathname === "/plag" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            PLAG DETECTION
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className={`block py-2 px-4 lg:py-4 lg:px-8 text-sm lg:text-xl rounded-md ${
                                location.pathname === "/profile" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            PROFILE OVERVIEW
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/problems"
                            className={`block py-2 px-4 lg:py-4 lg:px-8 text-sm lg:text-xl rounded-md ${
                                location.pathname === "/problems" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            PROBLEM INSIGHTS
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
