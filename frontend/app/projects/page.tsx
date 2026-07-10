'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Grid3x3, LayoutList, ChevronRight, Zap, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/modal';

const projects = [
  {
    id: 1,
    name: 'Neural Architecture Search',
    domain: 'AI',
    description: 'Exploring efficient NAS techniques for mobile deployment',
    created: '2026-01-15',
    updated: '2026-07-02',
    owner: 'Dr. Sarah Chen',
    team: ['Alex', 'Maria', 'James'],
    papers: 24,
    summaries: 18,
    agents: 3,
    progress: 65,
    status: 'Writing',
    completion: '2026-08-15',
    confidence: 92,
  },
  {
    id: 2,
    name: 'Vision Transformers for Medical Imaging',
    domain: 'Healthcare',
    description: 'ViT applications in CT and MRI scan analysis',
    created: '2026-02-01',
    updated: '2026-07-01',
    owner: 'Dr. Michael Roberts',
    team: ['Emma', 'David'],
    papers: 31,
    summaries: 28,
    agents: 4,
    progress: 78,
    status: 'Reviewing',
    completion: '2026-07-30',
    confidence: 88,
  },
  {
    id: 3,
    name: 'Large Language Models for Code Generation',
    domain: 'NLP',
    description: 'LLM fine-tuning strategies for programming tasks',
    created: '2026-03-10',
    updated: '2026-06-28',
    owner: 'Dr. Lisa Wang',
    team: ['Tom', 'Rachel', 'Chris', 'Maya'],
    papers: 45,
    summaries: 42,
    agents: 5,
    progress: 82,
    status: 'Analysis',
    completion: '2026-07-25',
    confidence: 91,
  },
  {
    id: 4,
    name: 'Federated Learning for Healthcare',
    domain: 'ML',
    description: 'Privacy-preserving ML techniques for distributed medical data',
    created: '2026-04-05',
    updated: '2026-06-30',
    owner: 'Dr. James Wilson',
    team: ['Nina', 'Oliver'],
    papers: 18,
    summaries: 14,
    agents: 2,
    progress: 45,
    status: 'Planning',
    completion: '2026-09-10',
    confidence: 75,
  },
  {
    id: 5,
    name: 'Quantum Machine Learning Applications',
    domain: 'Quantum Computing',
    description: 'QML algorithms for optimization problems',
    created: '2026-05-12',
    updated: '2026-06-29',
    owner: 'Dr. Emma Taylor',
    team: ['Lucas', 'Sophie', 'Marcus'],
    papers: 22,
    summaries: 16,
    agents: 3,
    progress: 52,
    status: 'Research',
    completion: '2026-08-30',
    confidence: 80,
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDomain, setNewProjectDomain] = useState('');

  const domains = ['all', ...new Set(projects.map(p => p.domain))];

  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = filterDomain === 'all' || p.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const handleViewProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setOpenModal('view');
  };

  const handleEditProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setNewProjectName(project.name);
    setNewProjectDomain(project.domain);
    setOpenModal('edit');
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      console.log('Creating project:', { name: newProjectName, domain: newProjectDomain });
      setNewProjectName('');
      setNewProjectDomain('');
      setOpenModal(null);
    }
  };

  const handleSaveEdit = () => {
    if (newProjectName.trim() && selectedProject) {
      console.log('Updating project:', selectedProject.id, { name: newProjectName, domain: newProjectDomain });
      setOpenModal(null);
    }
  };

  const handleDeleteProject = (project: typeof projects[0]) => {
    console.log('Deleting project:', project.id);
    setOpenModal(null);
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Research Projects</h1>
          <p className="text-muted-foreground">Manage your research projects and track progress</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-foreground">5</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
            <p className="text-3xl font-bold text-foreground">4</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Papers</p>
            <p className="text-3xl font-bold text-foreground">140</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Avg Confidence</p>
            <p className="text-3xl font-bold text-primary">85.2%</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {domains.map(domain => (
              <option key={domain} value={domain}>
                {domain === 'all' ? 'All Domains' : domain}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setOpenModal('create')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-primary bg-primary/10 inline-block px-2 py-1 rounded mt-2">
                      {project.domain}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleViewProject(project)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-secondary/50 p-2 rounded">
                    <p className="text-muted-foreground">Papers</p>
                    <p className="font-bold text-foreground">{project.papers}</p>
                  </div>
                  <div className="bg-secondary/50 p-2 rounded">
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-bold text-foreground">{project.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-all group"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.domain} • {project.papers} papers</p>
                </div>

                <div className="hidden sm:flex gap-4 items-center">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{project.progress}%</p>
                    <div className="w-24 bg-secondary rounded-full h-2 mt-1">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {project.status}
                  </span>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button
                    onClick={() => handleViewProject(project)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <Modal
          isOpen={openModal === 'create'}
          onClose={() => setOpenModal(null)}
          title="Create New Project"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Name</label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="e.g., Federated Learning for Healthcare"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Domain</label>
              <select
                value={newProjectDomain}
                onChange={(e) => setNewProjectDomain(e.target.value)}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a domain...</option>
                {Array.from(new Set(projects.map(p => p.domain))).map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Create Project
              </button>
              <button
                onClick={() => setOpenModal(null)}
                className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* View Project Modal */}
        {selectedProject && (
          <Modal
            isOpen={openModal === 'view'}
            onClose={() => setOpenModal(null)}
            title={selectedProject.name}
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-foreground font-medium mt-1">{selectedProject.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="text-foreground font-medium">{selectedProject.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-foreground font-medium">{selectedProject.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Papers</p>
                  <p className="text-foreground font-medium">{selectedProject.papers}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-foreground font-medium">{selectedProject.progress}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Team Members</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map(member => (
                    <span key={member} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => handleEditProject(selectedProject)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => setOpenModal(null)}
                  className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Project Modal */}
        {selectedProject && (
          <Modal
            isOpen={openModal === 'edit'}
            onClose={() => setOpenModal(null)}
            title={`Edit: ${selectedProject.name}`}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Domain</label>
                <input
                  type="text"
                  value={newProjectDomain}
                  onChange={(e) => setNewProjectDomain(e.target.value)}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setOpenModal(null)}
                  className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
}
