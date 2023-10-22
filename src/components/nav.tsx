'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import IconStorefront from '@/icons/storefront'
import IconAccountCircle from '@/icons/account-circle'

export default function Nav(){
    const pathname = usePathname()

    const navItemClass = 'group inline-flex flex-col items-center justify-center text-center py-2 px-2 grow font-semibold';
    const navItemIconWrapperClass = 'inline-block mb-1 px-4 py-1 rounded-full';

    const links = [
        {_id: 3, title: 'Notes', href: '/notes', icon: IconAccountCircle },
        {_id: 1, title: 'Shop', href: '/', icon: IconStorefront },
        {_id: 2, title: 'Account', href: '/account', icon: IconAccountCircle },
    ];

    return (
        <nav className="flex md:flex-col md:w-20 py-1 justify-evenly text-xs">
          {links.map(link => (
            <Link key={link._id} href={link.href} className={`${navItemClass}`}>
              <span className={`${(pathname === link.href) ? 'bg-blue-100 group-hover:bg-blue-200' : 'group-hover:bg-gray-200'} ${navItemIconWrapperClass}`}>
                <link.icon filled={(pathname && pathname === link.href) ? 1 : 0} className="h-6 w-6" />
              </span>
              <span className="w-full truncate leading-none">{link.title}</span>
            </Link>
          ))}
        </nav>
    )
}