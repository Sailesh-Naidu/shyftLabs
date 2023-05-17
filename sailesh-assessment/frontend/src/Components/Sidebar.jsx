import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { sidebarData } from "../Utils/data";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const [sidebarVisibility, setSidebarVisibility] = useState(!isMobile);

  const location = useLocation();

  return (
    <div className="flex justify-start">
      {!sidebarVisibility ? (
        <button
          className="flex text-black items-center cursor-pointer fixed left-10 top-6 z-50"
          onClick={() => setSidebarVisibility(!sidebarVisibility)}
        >
          <Bars4Icon className="ml-auto hamburger-icon"></Bars4Icon>
        </button>
      ) : (
        <div className="flex flex-col h-screen p-3 bg-white shadow sidebar-container">
          <div className="space-y-3">
            <div className="flex items-center">
              <h2 className="text-xl font-bold capitalize">
                {location.pathname!=="/"
                  ? location.pathname.split("/")
                  : "Home"}
              </h2>
              <Bars4Icon
                className="ml-auto hamburger-icon"
                onClick={() => setSidebarVisibility(!sidebarVisibility)}
              ></Bars4Icon>
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {sidebarData.map((item, index) => {
                  const { name, path } = item;
                  return (
                    <li className="rounded-sm">
                      <Link
                        to={path}
                        onClick={() => {
                          if (isMobile) {
                            setSidebarVisibility(false); //Dismisses the sidebar if in mobile mode
                          }
                        }}
                      >
                        <a
                          href="#"
                          className="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <item.icon className="h-10 w-10"></item.icon>
                          <div className="font-medium text-lg">{name}</div>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
