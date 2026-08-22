'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { logoutAccount } from '@/lib/actions/user1.actions'
import { cn } from "@/lib/utils";

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const router = useRouter();

    const handleLogOut = async () => {
        const loggedOut = await logoutAccount();
        if (loggedOut) router.push('/sign-in');
    };

    const initial = (user?.firstName?.[0] || user?.name?.[0] || 'U').toUpperCase();
    const displayName = user?.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : (user?.name || 'User');

    return (
        <footer className={cn(
            'footer relative w-full pt-4 pb-2 border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] bg-white/50 backdrop-blur-[2px] transition-all flex items-center justify-between gap-2',
            type === 'mobile' ? 'px-2' : 'max-xl:flex-col max-xl:gap-3 max-xl:items-center'
        )}>
            {/* Subtle aesthetic gradient line on top */}
            <div className={cn('absolute', 'inset-x-0', '-top-px', 'h-[1px]', 'bg-gradient-to-r', 'from-transparent', 'via-gray-200', 'to-transparent')} />

            {/* Avatar - Always visible */}
            <div className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bankGradient to-[#0179FE] text-white shadow-sm font-bold text-base transition-transform hover:scale-105'
            )}>
                <p className={cn('font-semibold', 'leading-none')}>{initial}</p>
            </div>

            {/* User Info - Hidden only on compact desktop sidebar (<1280px) */}
            <div className={cn(
                'flex flex-1 flex-col justify-center min-w-0 px-1',
                type === 'desktop' && 'max-xl:hidden'
            )}>
                <h1 className={cn('text-14', 'font-semibold', 'text-gray-800', 'truncate', 'leading-tight')}>
                    {displayName}
                </h1>
                <p className={cn('text-12', 'font-normal', 'text-gray-500', 'truncate', 'leading-tight', 'mt-0.5')}>
                    {user?.email || ''}
                </p>
            </div>

            {/* Logout Button */}
            <div
                onClick={handleLogOut}
                className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200/60 active:scale-95 cursor-pointer transition-all duration-200 group'
                )}
                title="Sign Out"
            >
                <Image
                    src="/icons/logout.svg"
                    width={22}
                    height={22}
                    alt="Logout"
                    className={cn('transition-transform group-hover:scale-110 group-hover:opacity-80')}
                />
            </div>
        </footer>
    );
};

export default Footer;