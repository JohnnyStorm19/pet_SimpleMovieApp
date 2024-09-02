import { Loader } from "@/shared/ui";
import { Header } from "@/widgets";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import style from "./main.module.css";

export const AppLayout = () => {
  return (
    <div className={style.app_container}>
      <Header />
      <Suspense fallback={<Loader />}>
        <main className={style.main}>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};
