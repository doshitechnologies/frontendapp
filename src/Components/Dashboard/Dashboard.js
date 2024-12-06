import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import AddArchitecturalProject from "./AddArchitecturalProject";
import AddInteriorProject from "./AddInteriorProject";
import { useNavigate } from "react-router-dom";
import ViewArchitecturalProject from "./ViewArchitecturalProject";
import ViewInteriorProject from "./ViewInteriorProject";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("addReport");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Define sidebarOpen state here
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  const logoutHandler = () => {
    window.localStorage.removeItem("authorization");
    navigate("/login");
  };

  // Render content dynamically based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "addReport":
        return <AddArchitecturalProject />;
      case "addButton":
        return <AddInteriorProject />;
      // case 'viewData':
      //   return <ViewUsers />; // Render the ViewData component
      case "viewReport":
        return <ViewArchitecturalProject />;
      case "seeUsers":
        return <ViewInteriorProject />;

      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  if(!isLoggedIn){
    return(
      <>
      <div className="text-red-500 text-center font-bold text-2xl items-center">
      Please Login First
      </div>
      </>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-blue-800 text-white p-4">
        <button
          className="text-lg font-bold"
          onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar state
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-blue-800 text-white p-4 md:min-h-screen`}
      >
        <h2 className="text-xl font-bold mb-6">MG and associate</h2>
        <ul>
          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "addReport" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("addReport")}
            >
              Add Architectural Project
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "addButton" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("addButton")}
            >
              Add Interior Project
            </button>
          </li>
          {/* <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === 'viewData' ? 'bg-blue-600' : ''
              }`}
              onClick={() => setActiveTab('viewData')}
            >
              View Users
            </button>
          </li> */}
          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "viewReport" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("viewReport")}
            >
              View Architectural Report
            </button>
          </li>

          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "seeUsers" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("seeUsers")}
            >
              View Interior Report
            </button>
          </li>
        </ul>
        <div className="flex flex-col items-center bg-red-500 p-2">
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4 bg-white p-6">
        <div className="p-4 bg-gray-100 rounded shadow">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
