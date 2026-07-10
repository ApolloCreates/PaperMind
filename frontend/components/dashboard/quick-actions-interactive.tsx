'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/modal';
import { Plus, Upload, Play, Settings } from 'lucide-react';

export function QuickActionsWithActions() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const actions = [
    {
      id: 'new-project',
      icon: Plus,
      label: 'New Project',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'upload-papers',
      icon: Upload,
      label: 'Upload Papers',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'run-analysis',
      icon: Play,
      label: 'Run Analysis',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'agent-config',
      icon: Settings,
      label: 'Agent Config',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const handleCreateProject = () => {
    if (projectName.trim()) {
      console.log('Creating project:', { projectName, projectDescription });
      setProjectName('');
      setProjectDescription('');
      setOpenModal(null);
    }
  };

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map(f => f.name);
    setUploadedFiles([...uploadedFiles, ...fileNames]);
  };

  const handleRunAnalysis = () => {
    console.log('Running analysis...');
    setOpenModal(null);
  };

  const handleAgentConfig = () => {
    console.log('Configuring agents...');
    setOpenModal(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => setOpenModal(action.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-3 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium flex items-center gap-3 hover:shadow-lg hover:scale-105 transition-all duration-200`}
              >
                <Icon className="w-4 h-4" />
                {action.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* New Project Modal */}
      <Modal
        isOpen={openModal === 'new-project'}
        onClose={() => setOpenModal(null)}
        title="Create New Project"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Quantum Computing Research"
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your research project..."
              rows={3}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleCreateProject}
              disabled={!projectName.trim()}
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

      {/* Upload Papers Modal */}
      <Modal
        isOpen={openModal === 'upload-papers'}
        onClose={() => setOpenModal(null)}
        title="Upload Research Papers"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-secondary/50">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleUploadFiles}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-muted-foreground">
                PDF, DOC, DOCX up to 100MB each
              </span>
            </label>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {uploadedFiles.length} file(s) selected:
              </p>
              <ul className="space-y-1">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} className="text-sm text-foreground bg-secondary/50 p-2 rounded">
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => {
                console.log('Uploading files:', uploadedFiles);
                setUploadedFiles([]);
                setOpenModal(null);
              }}
              disabled={uploadedFiles.length === 0}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Upload {uploadedFiles.length > 0 ? `(${uploadedFiles.length})` : ''}
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

      {/* Run Analysis Modal */}
      <Modal
        isOpen={openModal === 'run-analysis'}
        onClose={() => setOpenModal(null)}
        title="Run Analysis"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Analysis Type
            </label>
            <div className="space-y-2">
              {['Literature Synthesis', 'Gap Analysis', 'Trend Detection', 'Citation Analysis'].map(
                (type) => (
                  <label key={type} className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors">
                    <input type="radio" name="analysis" value={type} defaultChecked={type === 'Literature Synthesis'} />
                    <span className="text-sm font-medium text-foreground">{type}</span>
                  </label>
                )
              )}
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleRunAnalysis}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Run Analysis
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

      {/* Agent Configuration Modal */}
      <Modal
        isOpen={openModal === 'agent-config'}
        onClose={() => setOpenModal(null)}
        title="Agent Configuration"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select which AI agents to enable for your research:
          </p>
          <div className="space-y-3">
            {['Literature Synthesizer', 'Insight Extractor', 'Citation Mapper', 'Trend Analyzer'].map(
              (agent) => (
                <label key={agent} className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">{agent}</span>
                </label>
              )
            )}
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleAgentConfig}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Save Configuration
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
    </>
  );
}
