"use client";

import * as React from "react";
import { useState,useEffect } from "react";
import { createTheme } from "@mui/material/styles";

import { NextAppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import BellIcon from "@mui/icons-material/Notifications";

import { usePathname } from 'next/navigation';
import { Suspense } from "react";
import Badge from "@mui/material/Badge";
import {sideNav} from "./components/sideNav";
import LogoutIcon from '@mui/icons-material/Logout';


import './globals.css'

// Define the theme
const demoTheme = createTheme({
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});
const posRedirecter = () => {
  // window.location.href = "/pos";
}


function TopNav() {
 
  // Fetch pending order count
 
  
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotificationCount = async () => {
    // Add your notification fetching logic here
    try {
      // Example: fetch notifications from API
      // const response = await fetch('/api/notifications');
      // const data = await response.json();
      // setNotificationCount(data.count);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNotificationCount();
  }, []);
 
  return (
    <div className="flex items-center gap-5 mr-20 my-10">
      
      {loading ? (
                 <BellIcon color="action" />

      ) : (
        <Badge badgeContent={notificationCount} color="primary">
          <BellIcon
            color="action"
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/notifications";
            }}
          />
        </Badge>
      )}
        <LogoutIcon
          onClick={() => {
            if (typeof window !== "undefined") {
          localStorage.removeItem("admin-users");
          localStorage.removeItem("admin-token");
         
            }
          }}
          className="cursor-pointer "
            color="error" // Red color for logout icon
        />
      
      
      <div className="md:flex hidden items-center gap-3 ">
        <img
          src="/user.jpeg"
          alt="user-image"
          className="rounded-full w-[40px] h-[40px]"
        />
         <span>
    {typeof window !== "undefined" && localStorage.getItem("admin-users")
      ? JSON.parse(localStorage.getItem("admin-users") || "{}").name.split(" ")[0]
      : "Admin"}
  </span>
      </div>
    </div>
  );
}



// Main dashboard component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedPage, setSelectedPage] = useState("dashboard"); // Default page
  const [pendingOrderCount, setPendingOrderCount] = useState<number>(0);
 


  
  // Define navigation menu with click handlers
  const NAVIGATION =sideNav(setSelectedPage, pendingOrderCount)

  const pathname = usePathname();
  
  
  
  return (
    <html lang="en">
      <body>
      <Suspense fallback={<div>Loading...</div>}>
    {/* {!isPos && !isfrogotPassword && !islogin ?  ( */}
      
      <NextAppProvider
        navigation={NAVIGATION as any} // Temporarily cast to 'any' if type mismatch persists
        branding={{
          logo: <img src="/logo2.jpeg" alt="SparkGrow logo" className="md:block hidden h-8" />,
          title: "SparkGrow",
          homeUrl: "/dashboard",
        }}
        theme={demoTheme}
      >
        <DashboardLayout
          slots={{
            toolbarAccount: TopNav,
          }}
          sx={{ ".MuiStack-root": { padding: "0px 10px" } }}
        >
          <div className="p-10">{children}</div>
        </DashboardLayout>
      </NextAppProvider>
    {/* ) : (
      <>{children}</>
    )} */}
   </Suspense>
    </body>
    </html>
  );
}
