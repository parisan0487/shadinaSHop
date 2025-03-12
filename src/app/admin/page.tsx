"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "@/components/adminPanel/adminPanel";
import Loading from "../loading";

export default function AdminPage() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/users/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }

        const data = await res.json();

        if (res.ok && data.role === "admin") {
          setUser(data);
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
        router.replace("/");
      }
    };

    fetchUser();
  }, [router]);

  if (user === undefined) return <Loading />;

  if (user === false) return null;

  return (
    <div>
      <AdminPanel />
    </div>
  );
}
