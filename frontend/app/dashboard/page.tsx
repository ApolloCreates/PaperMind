'use client';

import { useState } from 'react';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { ResearchProgressChart } from '@/components/dashboard/research-progress-chart';
import { ActiveAgents } from '@/components/dashboard/active-agents';
import { RecentPapers } from '@/components/dashboard/recent-papers';
import { ResearchIdeas } from '@/components/dashboard/research-ideas';
import { RecentReviews } from '@/components/dashboard/recent-reviews';
import { QuickActionsWithActions } from '@/components/dashboard/quick-actions-interactive';
import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { BarChart3, Zap, Brain, FileText } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Project Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Projects"
            value="12"
            subtext="3 projects near completion"
            icon={BarChart3}
            trend="up"
            trendValue="+2 this week"
            index={0}
          />
          <StatCard
            label="Papers Processed"
            value="487"
            subtext="184 new this month"
            icon={FileText}
            trend="up"
            trendValue="+24%"
            index={1}
          />
          <StatCard
            label="Active Agents"
            value="3"
            subtext="All performing optimally"
            icon={Brain}
            trend="neutral"
            trendValue="100% uptime"
            index={2}
          />
          <StatCard
            label="System Performance"
            value="98.2%"
            subtext="Avg response time: 342ms"
            icon={Zap}
            trend="up"
            trendValue="+2.1%"
            index={3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Research Progress Chart */}
            <ResearchProgressChart />

            {/* Active Agents */}
            <ActiveAgents />

            {/* Recent Papers */}
            <RecentPapers />
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <QuickActionsWithActions />

            {/* Research Ideas */}
            <ResearchIdeas />
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Reviews */}
          <RecentReviews />

          {/* Activity Timeline */}
          <ActivityTimeline />
        </div>
      </div>
    </main>
  );
}
