'use client'
import { SiderbarProps } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const SideBar = ({ user }: SiderbarProps) => {
    const pathname = usePathname();
    return (
        <aside className={cn('sidebar', 'z-1000')}>
            <nav className={cn('flex', 'flex-col', 'gap-4')}>
                <Link href="/" className={cn('cursor-pointer', 'items-center', 'flex', 'mb-12', 'gap-2')}>

                    <Image src="/icons/logo.svg" alt="Horizon logo" width={34} height={34} className={cn('size-[24px]', 'max-xl:size-14')} />
                    <p className='sidebar-logo'>Horizon</p>
                </Link>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    return (
                        <Link key={link.label} href={link.route} className={cn('sidebar-link', {
                            'bg-bank-gradient': isActive
                        })}>
                            <Image src={link.imgURL} className={cn({ 'brightness-[3] invert-0': isActive })} alt={link.label} width={24} height={24} />
                            <p className={cn('sidebar-label', {
                                '!text-white': isActive,
                            })}>{link.label}</p>
                        </Link>
                    )
                })}
                <PlaidLink user={user} />
                USER
            </nav>

            <Footer user={user} />
        </aside>
    )
}

export default SideBar