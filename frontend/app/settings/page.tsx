'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Cpu, Bot, Database, Plug, Bell, Lock, Palette, CreditCard, Key, Zap, ChevronRight, Toggle2, Sliders } from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'models', label: 'AI Models', icon: Cpu },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'knowledge', label: 'Knowledge Base', icon: Database },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'experimental', label: 'Experimental', icon: Zap },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [toggleStates, setToggleStates] = useState({
    twoFa: false,
    emailNotifications: true,
    desktopNotifications: true,
    weeklyReport: true,
    darkMode: true,
    streaming: true,
    hybridSearch: true,
    parallelExecution: true,
  });

  const toggleSetting = (key: string) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="flex-1 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-border p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-lg text-muted-foreground">Manage your ResearchAI configuration and preferences</p>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-border bg-card/50">
            <div className="p-6 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>
                  
                  <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold">SC</div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm">
                        Change Avatar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input type="text" defaultValue="Dr. Sarah Chen" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input type="email" defaultValue="sarah.chen@research-ai.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Organization</label>
                        <input type="text" defaultValue="Stanford AI Lab" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                        <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Research Lead</option>
                          <option>Team Member</option>
                          <option>Admin</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Research Interests</label>
                      <input type="text" defaultValue="Transformers, Vision AI, Federated Learning" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                      <textarea rows={3} defaultValue="AI researcher focused on efficient models and federated learning systems." className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Workspace Section */}
            {activeSection === 'workspace' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Workspace Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Default Project', value: 'Neural Architecture Search' },
                    { label: 'Default Citation Style', value: 'APA' },
                    { label: 'Default Export Format', value: 'PDF' },
                    { label: 'Default Language', value: 'English' },
                  ].map((item) => (
                    <div key={item.label} className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                      <label className="font-medium text-foreground">{item.label}</label>
                      <select defaultValue={item.value} className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>{item.value}</option>
                      </select>
                    </div>
                  ))}
                  <div className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                    <label className="font-medium text-foreground">Auto Save</label>
                    <button onClick={() => toggleSetting('darkMode')} className={`relative w-12 h-6 rounded-full transition-colors ${toggleStates.darkMode ? 'bg-primary' : 'bg-muted'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Models Section */}
            {activeSection === 'models' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">AI Model Configuration</h2>
                <div className="grid grid-cols-2 gap-6">
                  {['OpenAI', 'Anthropic', 'Google Gemini', 'Groq', 'Ollama', 'Azure OpenAI'].map((provider) => (
                    <div key={provider} className="bg-card border border-border rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-4">{provider}</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-muted-foreground">API Key</label>
                          <input type="password" defaultValue="sk-..." className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Model</label>
                          <select className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Default</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-muted-foreground">Temperature</label>
                            <input type="range" min="0" max="2" step="0.1" defaultValue="0.7" className="w-full" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Max Tokens</label>
                            <input type="number" defaultValue="2048" className="w-full px-2 py-1 border border-border rounded text-sm bg-background text-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Agents Section */}
            {activeSection === 'agents' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Agent Configuration</h2>
                <div className="space-y-3">
                  {['Planner', 'Memory', 'PDF Parser', 'Retriever', 'Summarizer', 'Literature Review', 'Research Gap', 'Topic Generator', 'Writer', 'Reviewer'].map((agent) => (
                    <div key={agent} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{agent}</p>
                        <p className="text-xs text-muted-foreground">Retry count: 3 • Timeout: 30s</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleSetting('parallelExecution')} className={`relative w-10 h-6 rounded-full transition-colors ${toggleStates.parallelExecution ? 'bg-primary' : 'bg-muted'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates.parallelExecution ? 'translate-x-4' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Knowledge Base Section */}
            {activeSection === 'knowledge' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Knowledge Base Settings</h2>
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  {[
                    { label: 'Embedding Model', value: 'OpenAI text-embedding-3-large' },
                    { label: 'Chunk Size', value: '512' },
                    { label: 'Chunk Overlap', value: '64' },
                    { label: 'Retrieval Strategy', value: 'Hybrid Search' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center pb-4 border-b border-border last:border-0 last:pb-0">
                      <label className="font-medium text-foreground">{item.label}</label>
                      <input type="text" defaultValue={item.value} className="px-4 py-2 border border-border rounded-lg bg-background text-foreground w-48 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  ))}
                  <div className="pt-4 space-y-3">
                    {['Hybrid Search', 'Re-ranking'].map((feature) => (
                      <div key={feature} className="flex justify-between items-center">
                        <span className="text-foreground">{feature}</span>
                        <button onClick={() => toggleSetting('hybridSearch')} className={`relative w-10 h-6 rounded-full transition-colors ${toggleStates.hybridSearch ? 'bg-primary' : 'bg-muted'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates.hybridSearch ? 'translate-x-4' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Integrations Section */}
            {activeSection === 'integrations' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Integrations</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['GitHub', 'Google Drive', 'Dropbox', 'Zotero', 'Mendeley', 'arXiv', 'Semantic Scholar', 'CrossRef'].map((integration) => (
                    <div key={integration} className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                      <span className="font-medium text-foreground">{integration}</span>
                      <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition-opacity">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications' },
                    { key: 'desktopNotifications', label: 'Desktop Notifications' },
                    { key: 'weeklyReport', label: 'Weekly Report' },
                  ].map((item) => (
                    <div key={item.key} className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                      <label className="font-medium text-foreground">{item.label}</label>
                      <button onClick={() => toggleSetting(item.key)} className={`relative w-12 h-6 rounded-full transition-colors ${toggleStates[item.key as keyof typeof toggleStates] ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates[item.key as keyof typeof toggleStates] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Security</h2>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                      </div>
                      <button onClick={() => toggleSetting('twoFa')} className={`relative w-12 h-6 rounded-full transition-colors ${toggleStates.twoFa ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates.twoFa ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="font-medium text-foreground mb-4">Connected Devices</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">MacBook Pro • Last active: now</p>
                      <p className="text-muted-foreground">iPhone 14 • Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium">
                    Change Password
                  </button>
                </div>
              </motion.div>
            )}

            {/* Appearance Section */}
            {activeSection === 'appearance' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Appearance</h2>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                    <label className="font-medium text-foreground">Theme</label>
                    <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Dark</option>
                      <option>Light</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                    <label className="font-medium text-foreground">Accent Color</label>
                    <div className="flex gap-2">
                      {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500'].map((color) => (
                        <div key={color} className={`w-8 h-8 rounded-full ${color} cursor-pointer hover:ring-2 ring-foreground transition-all`} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                    <label className="font-medium text-foreground">Animations</label>
                    <button onClick={() => toggleSetting('darkMode')} className={`relative w-12 h-6 rounded-full transition-colors ${toggleStates.darkMode ? 'bg-primary' : 'bg-muted'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Billing Section */}
            {activeSection === 'billing' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Billing</h2>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
                    <p className="text-2xl font-bold text-foreground">Pro</p>
                    <p className="text-sm text-muted-foreground">$99/month</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium mb-4">
                    Manage Subscription
                  </button>
                  <div className="border-t border-border pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Token Usage</span>
                      <span className="text-foreground font-medium">2.4M / 10M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage Used</span>
                      <span className="text-foreground font-medium">12.5GB / 100GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">API Calls</span>
                      <span className="text-foreground font-medium">45.2K / 100K</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* API Keys Section */}
            {activeSection === 'api' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">API Keys</h2>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                    Generate New Key
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Production Key', created: '2026-06-01', lastUsed: '2 hours ago' },
                    { name: 'Development Key', created: '2026-07-01', lastUsed: '1 day ago' },
                  ].map((key) => (
                    <div key={key.name} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-foreground">{key.name}</p>
                          <p className="text-xs text-muted-foreground">sk_prod_xxxxxxxxxxxxx</p>
                        </div>
                        <button className="text-xs text-red-500 hover:text-red-600">Delete</button>
                      </div>
                      <div className="flex gap-6 text-xs text-muted-foreground">
                        <p>Created: {key.created}</p>
                        <p>Last used: {key.lastUsed}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Experimental Section */}
            {activeSection === 'experimental' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground">Experimental Features</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Beta AI Models', description: 'Access to cutting-edge AI models' },
                    { name: 'Advanced Reasoning', description: 'Enable multi-step reasoning agents' },
                    { name: 'Long Context', description: '100k token context window support' },
                    { name: 'Multi-Agent Debug Mode', description: 'Detailed agent execution logs' },
                  ].map((feature) => (
                    <div key={feature.name} className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">{feature.name}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                      <button className={`relative w-12 h-6 rounded-full transition-colors ${toggleStates.streaming ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggleStates.streaming ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
