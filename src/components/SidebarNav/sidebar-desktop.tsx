'use client';

import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '@/types';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, MoreHorizontal, Settings, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { loggedInUserData } from '@/app/data';
import { cn } from '@/lib/utils';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className='w-full h-full left-0 top-0 z-40 bg-[#0d0d0dcf] text-white'>
      <div className='h-full px-3 py-4'>
        {/* App Title */}
        <div className='mb-6 px-2'>
          <h1 className='text-xl font-bold text-white'>Notes</h1>
          <p className='text-xs text-gray-400 mt-1'>Your digital notebook</p>
        </div>
        
        <div className='relative h-[85%]'>
          <div className='flex flex-col gap-1 w-full'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  icon={link.icon}
                  className={cn(
                    'w-full justify-start',
                    pathname === link.href && link.label === 'All Notes' 
                      ? 'bg-gray-700 text-white hover:bg-white hover:text-gray-900' 
                      : ''
                  )}
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            <div className='mt-4'>
              {props.sidebarItems.extras}
            </div>
          </div>
          
          {/* User Profile Section */}
          <div className='absolute bottom-0 w-full'>
            <Separator className='mb-3 bg-gray-600' />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start p-2 h-auto rounded-xl hover:bg-white/10 transition-all duration-200'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-3 items-center'>
                      <Avatar className='h-8 w-8 border-2 border-gray-600'>
                        <AvatarImage src={loggedInUserData.avatar} />
                        <AvatarFallback className='bg-gray-600 text-white text-sm'>
                          {loggedInUserData.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='text-left'>
                        <p className='text-sm font-medium text-white'>{loggedInUserData.name}</p>
                        <p className='text-xs text-gray-400'>Personal workspace</p>
                      </div>
                    </div>
                    <MoreHorizontal size={16} className='text-gray-400' />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='mb-2 w-56 p-3 rounded-xl bg-gray-800 border-gray-600'>
                <div className='space-y-1'>
                  <Link href='/profile'>
                    <SidebarButton size='sm' icon={User} className='w-full text-white hover:bg-gray-700 rounded-lg'>
                      Profile Settings
                    </SidebarButton>
                  </Link>
                  <Link href='/settings'>
                    <SidebarButton size='sm' icon={Settings} className='w-full text-white hover:bg-gray-700 rounded-lg'>
                      App Settings
                    </SidebarButton>
                  </Link>
                  <Separator className='my-2 bg-gray-600' />
                  <SidebarButton size='sm' icon={LogOut} className='w-full text-red-400 hover:bg-red-900/20 rounded-lg'>
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}