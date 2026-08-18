import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { DashboardStats } from "./DashboardStats";
import { RecentProjects } from "./RecentProjects";
import { QuickActions } from "./QuickActions";
import { SystemStatus } from "./SystemStatus";
import { useState } from "react";
import { ProjectDialog } from "@/components/projects/ProjectDialog";

export function DashboardPage() {

  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your research projects and AI workflows.
              </p>
            </div>
            <Button
              className="rounded-xl shadow-sm"
              onClick={() => setOpenProjectDialog(true)}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Section 1: Stats */}
          <section className="mt-8">
            <DashboardStats />
          </section>

          {/* Section 2: Recent Projects */}
          <section className="mt-10">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
              <p className="text-sm text-muted-foreground">Continue working on your research.</p>
            </div>
            <RecentProjects />
          </section>

          {/* Section 3 + 4: Quick actions & system status */}
          <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
                <p className="text-sm text-muted-foreground">Jump straight into your workflow.</p>
              </div>
              <QuickActions />
            </div>
            <div className="xl:col-span-1">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-foreground">Status</h2>
                <p className="text-sm text-muted-foreground">Real-time service health.</p>
              </div>
              <SystemStatus />
            </div>
          </section>
        </motion.main>
        <ProjectDialog
          open={openProjectDialog}
          onOpenChange={setOpenProjectDialog}
        />
      </div>
    </div>
  );
}
