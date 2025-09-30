'use client';

import {
  FileText,
  FolderOpen,
  Search,
  Star,
  Archive,
  Trash2,
  Settings,
  Plus,
  PenTool,
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types';
import { SidebarButton } from './sidebar-button';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'All Notes', href: '/', icon: FileText },
    { label: 'Recent', href: '/recent', icon: PenTool },
    { label: 'Folders', href: '/folders', icon: FolderOpen },
    {
      href: '/search',
      icon: Search,
      label: 'Search',
    },
    {
      href: '/favorites',
      icon: Star,
      label: 'Favorites',
    },
    {
      href: '/archived',
      icon: Archive,
      label: 'Archived',
    },
    {
      href: '/trash',
      icon: Trash2,
      label: 'Trash',
    },
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={Settings} className='w-full rounded-xl hover:bg-white/10 text-gray-200 hover:text-white'>
        Settings
      </SidebarButton>
      <SidebarButton
        className='w-full justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold py-2 transition-all duration-200'
        variant='default'
        icon={Plus}
      >
        New Note
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  return <SidebarDesktop sidebarItems={sidebarItems} />;
}