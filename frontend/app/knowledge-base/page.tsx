'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, BookOpen, Users, Database, Eye, MessageSquare, Download, Plus, Zap, TrendingUp } from 'lucide-react';

const concepts = [
  { id: 1, name: 'Transformer Architecture', description: 'Self-attention based neural architecture', papers: 45, confidence: 96, updated: '2026-07-02' },
  { id: 2, name: 'Vision Transformer', description: 'ViT for computer vision tasks', papers: 32, confidence: 91, updated: '2026-07-01' },
  { id: 3, name: 'Attention Mechanism', description: 'Query-key-value attention patterns', papers: 67, confidence: 98, updated: '2026-06-28' },
  { id: 4, name: 'Neural Architecture Search', description: 'Automated ML model discovery', papers: 28, confidence: 88, updated: '2026-06-30' },
  { id: 5, name: 'Knowledge Distillation', description: 'Transfer learning from large to small models', papers: 24, confidence: 85, updated: '2026-06-29' },
  { id: 6, name: 'Federated Learning', description: 'Distributed ML with privacy', papers: 31, confidence: 89, updated: '2026-07-02' },
];

const aiMemory = [
  { type: 'Concept', label: 'Transformer Architecture', count: 45, icon: Brain },
  { type: 'Author', label: 'Vaswani et al.', count: 12, icon: Users },
  { type: 'Dataset', label: 'ImageNet', count: 8, icon: Database },
  { type: 'Method', label: 'Self-Attention', count: 23, icon: Zap },
];

const recentlyLearned = [
  'Scaling Laws in LLMs',
  'Multimodal Embeddings',
  'Mixture of Experts',
  'Prefix Tuning',
  'Prompt Engineering',
];

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'concepts' | 'graph' | 'memory'>('concepts');

  return (
    <main className="flex-1 bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">AI Memory & Knowledge Base</h1>
          </div>
          <p className="text-lg text-muted-foreground">Intelligent system for discovering and connecting research concepts</p>
        </div>

        {/* Semantic Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ask AI about any topic... e.g., 'transformer architectures' or 'federated learning methods'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {['concepts', 'graph', 'memory'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`pb-4 px-2 font-medium transition-colors ${
                selectedTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'concepts' && 'Concepts'}
              {tab === 'graph' && 'Knowledge Graph'}
              {tab === 'memory' && 'AI Memory'}
            </button>
          ))}
        </div>

        {/* Concepts View */}
        {selectedTab === 'concepts' && (
          <div className="grid grid-cols-3 gap-6">
            {concepts.map((concept, i) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {concept.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{concept.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{concept.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded p-3 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Related Papers</p>
                  <p className="text-lg font-semibold text-foreground">{concept.papers}</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Ask AI
                  </button>
                  <button className="flex-1 py-2 bg-muted text-foreground rounded text-sm font-medium hover:bg-accent transition-colors">
                    Explore
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Knowledge Graph View */}
        {selectedTab === 'graph' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-lg p-12 h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-64 h-64">
                  {/* Visualization placeholder with animated circles */}
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" className="text-primary opacity-30" strokeWidth="2" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" className="text-primary opacity-20" strokeWidth="1" />
                    
                    {/* Concept nodes */}
                    <circle cx="100" cy="50" r="8" fill="currentColor" className="text-primary" />
                    <circle cx="150" cy="100" r="8" fill="currentColor" className="text-accent" />
                    <circle cx="100" cy="150" r="8" fill="currentColor" className="text-primary" />
                    <circle cx="50" cy="100" r="8" fill="currentColor" className="text-accent" />
                    <circle cx="130" cy="70" r="6" fill="currentColor" className="text-muted" />
                    <circle cx="140" cy="140" r="6" fill="currentColor" className="text-muted" />
                    
                    {/* Connections */}
                    <line x1="100" y1="50" x2="150" y2="100" stroke="currentColor" className="text-primary opacity-30" strokeWidth="1" />
                    <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" className="text-primary opacity-30" strokeWidth="1" />
                    <line x1="100" y1="50" x2="50" y2="100" stroke="currentColor" className="text-primary opacity-30" strokeWidth="1" />
                    <line x1="150" y1="100" x2="100" y2="150" stroke="currentColor" className="text-primary opacity-30" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Knowledge Graph</h3>
              <p className="text-muted-foreground mb-4">Concepts connected by relationships from 116 papers</p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Explore Full Graph
              </button>
            </div>
          </motion.div>
        )}

        {/* AI Memory View */}
        {selectedTab === 'memory' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Recently Learned Concepts</h3>
                  <div className="space-y-2">
                    {recentlyLearned.map((concept, i) => (
                      <motion.div
                        key={concept}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-3 bg-card border border-border rounded-lg hover:border-primary transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-foreground font-medium">{concept}</span>
                        </div>
                        <TrendingUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Frequently Referenced</h3>
                  <div className="space-y-2">
                    {['Attention Is All You Need', 'BERT: Pre-training of Deep Bidirectional Transformers', 'Vision Transformer: An Image Is Worth 16x16 Words'].map((paper, i) => (
                      <motion.div
                        key={paper}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                        className="p-3 bg-card border border-border rounded-lg hover:border-primary transition-colors flex items-center gap-3 group cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-foreground line-clamp-1">{paper}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Memory Stats</h3>
                <div className="space-y-4">
                  {aiMemory.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-muted/50 rounded p-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <p className="text-xs text-muted-foreground font-medium">{item.type}</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-primary">{item.count}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
