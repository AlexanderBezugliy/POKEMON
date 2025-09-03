"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
    Bookmark,
    Heart,
    LayoutDashboard,
    LogIn,
    LogOut,
    UserPlus,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const router = useRouter();

    const menu = [
        {
            name: "Browse",
            link: "/",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Favorites",
            link: "/favorites",
            icon: <Heart size={22} />,
        },
        {
            name: "Saved",
            link: "/saved",
            icon: <Bookmark size={22} />,
        },
    ];

    return (
        <header className="min-h-[10vh] px-16 py-6 w-full rounded-b-[5.5rem] 490px:rounded-b-full border-b-2 border-blue-600  bg-white/90 flex flex-col 540px:flex-row gap-4 sm:justify-around lg:justify-between items-center shadow-sm">
            {/* LOGO */}
            <Link href="/" className="hover:scale-110 duration-300">
                <Image
                    src={"/pokemon--logo.png"}
                    width={180}
                    height={90}
                    alt="logo"
                />
            </Link>

            {/* NAVIGTION */}
            <nav className="hidden 940px:flex w-full justify-between">
                <ul className="flex items-center gap-2 lg:gap-2 xl:gap-8 text-gray-500 font-bold">
                    {menu.map((item, index: number) => (
                        <li key={index}>
                            <Link
                                href={item.link}
                                className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg hover:text-blue-500 hover:scale-110 duration-300
                                    ${
                                        pathname === item.link
                                            ? "bg-[#6c5ce7]/15 text-[#6c5ce7]"
                                            : ""
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {user?.sub && !isLoading && (
                <div>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="outline-none border-none">
                            <div className="bg-[#6c5ce7]/15 flex items-center justify-center px-0 940px:px-5 gap-2 rounded-lg cursor-pointer">
                                <span className="pl-2 text-[#6c5ce7] text-sm font-bold">
                                    {user?.name || "User"}
                                </span>
                                <Image
                                    src={user?.picture || ""}
                                    width={40}
                                    height={40}
                                    alt="avatar"
                                    className="p-1 rounded-lg"
                                />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            {menu.map((item, index: number) => (
                                <DropdownMenuItem asChild key={index}>
                                    <Link
                                        href={item.link}
                                        className={`py-2 px-6 text-sm flex items-start gap-2 font-bold rounded-lg ${
                                            pathname === item.link ? "bg-[#6c5ce7]/15 text-[#6c5ce7]" : ""
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}

                            <DropdownMenuItem
                                onClick={() => router.push("/api/auth/logout")}
                                // onClick={() => router.push(`/api/auth/logout?returnTo=${window.location.origin}&federated=true`)}
                                className="cursor-pointer"
                            >
                                <LogOut />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            {!user?.sub && !isLoading && (
                <div className="flex items-center gap-4">
                    <Link
                        href="/api/auth/login"
                        className="py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7]/15 text-[#6c5ce7] hover:bg-[#6c5ce7]/30 transition-all duration-300 ease-in-out"
                    >
                        <LogIn size={20} />
                        Login
                    </Link>
                    <Link
                        href="/api/auth/login"
                        className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7] text-white hover:bg-[#6c5ce7]/90 transition-all duration-300 ease-in-out`}
                    >
                        <UserPlus size={20} />
                        Register
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
