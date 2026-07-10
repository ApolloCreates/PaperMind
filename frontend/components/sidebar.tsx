'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Folder,
  BookOpen,
  Workflow,
  Database,
  PenTool,
  MessageSquare,
  Settings,
  ChevronRight,
} from 'lucide-react';

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Folder, label: 'Projects', href: '/projects' },
  { icon: BookOpen, label: 'Research Library', href: '/research-library' },
  { icon: Workflow, label: 'Agent Workflow', href: '/agent-workflow' },
  { icon: Database, label: 'Knowledge Base', href: '/knowledge-base' },
  { icon: PenTool, label: 'Paper Editor', href: '/paper-editor' },
  { icon: MessageSquare, label: 'Reviews', href: '/reviewer' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeItem = useMemo(() => {
    const currentItem = navigationItems.find(item => item.href === pathname);
    return currentItem?.label || 'Dashboard';
  }, [pathname]);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <motion.div
          className="flex items-center justify-between gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
              RA
            </div>
            {!isCollapsed && <span className="font-semibold text-sidebar-foreground">ResearchAI</span>}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <Link key={item.label} href={item.href}>
              <motion.button
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative group ${
                  isActive
                    ? 'bg-sidebar-primary/10 text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
                {isActive && (
                  <motion.div
                    className="absolute right-0 w-1 h-6 bg-sidebar-primary rounded-l-full"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      {isCollapsed && (
        <motion.button
          onClick={() => setIsCollapsed(false)}
          className="m-4 p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          whileHover={{ scale: 1.05 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      )}
    </motion.aside>
  );
}
