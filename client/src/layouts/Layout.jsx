import React from "react";
import { Footer, NBar } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <section className=" w-full min-h-screen bg-slate-800 flex flex-col">
            <NBar />
            <main className=" w-[85%] flex flex-1 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </section>
    );
};

export default Layout;
