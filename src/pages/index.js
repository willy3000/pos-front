import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { fetchUser } from "../slices/user";


// const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const navigate = useRouter();

  useEffect(() => {
    navigate.push("/authentication/login");
  }, [navigate]);

  return <></>;
}
