import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user1.actions";
import Image from "next/image";
import { cn } from "../../lib/utils";

import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in');
    return (
        <main className={cn('flex', 'h-screen', 'w-full', 'font-inter')}>
            <SideBar user={loggedIn} />
            <div className={cn('flex', 'h-screen', 'w-full', 'font-inter')}>
                <div className={cn('flex', 'size-full', 'flex-col')}>
                    <div className="root-layout">
                        <Image src="/icons/logo.svg" width={30} height={30} alt="Horizon logo" />
                        <div className='p-2'>
                            <MobileNav user={loggedIn} />
                        </div>
                    </div>
                    {children}

                </div>

            </div>

        </main >
    );
}
