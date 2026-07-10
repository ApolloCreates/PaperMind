'use client';

import { useState } from 'react';
import { Upload, Search, Filter, Tag, FolderOpen, FileText, Download, Trash2, Share2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  status: 'uploaded' | 'processing' | 'indexed' | 'archived';
  embeddingStatus: 'pending' | 'in-progress' | 'completed';
  summaryAvailable: boolean;
  citations: number;
  tags: string[];
  uploadedAt: string;
}

const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Vaswani, A.', 'Shazeer, N.', 'Parmar, N.'],
    year: 2017,
    journal: 'NeurIPS',
    status: 'indexed',
    embeddingStatus: 'completed',
    summaryAvailable: true,
    citations: 82000,
    tags: ['transformers', 'nlp', 'deep-learning'],
    uploadedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: ['Devlin, J.', 'Chang, M.', 'Lee, K.'],
    year: 2018,
    journal: 'arXiv',
    status: 'indexed',
    embeddingStatus: 'completed',
    summaryAvailable: true,
    citations: 45000,
    tags: ['nlp', 'pre-training', 'transformers'],
    uploadedAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Language Models are Few-Shot Learners',
    authors: ['Brown, T.', 'Mann, B.', 'Ryder, N.'],
    year: 2020,
    journal: 'NeurIPS',
    status: 'processing',
    embeddingStatus: 'in-progress',
    summaryAvailable: false,
    citations: 28000,
    tags: ['gpt', 'few-shot', 'language-models'],
    uploadedAt: '2024-01-13',
  },
];

export default function ResearchLibraryPage() {
  const [papers, setPapers] = useState<Paper[]>(mockPapers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('recent');

  const allTags = Array.from(new Set(papers.flatMap(p => p.tags)));

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = searchQuery === '' || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => paper.tags.includes(tag));
    
    const matchesStatus = statusFilter === 'all' || paper.status === statusFilter;
    
    return matchesSearch && matchesTags && matchesStatus;
  });

  const sortedPapers = [...filteredPapers].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    if (sortBy === 'citations') return b.citations - a.citations;
    if (sortBy === 'year') return b.year - a.year;
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'indexed': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200';
      case 'processing': return 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200';
      case 'uploaded': return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-200';
      case 'archived': return 'bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getEmbeddingColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Research Library</h1>
          <p className="text-muted-foreground">Manage and organize your research papers</p>
        </div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-dashed border-border rounded-lg p-12 mb-8 bg-card hover:bg-accent/5 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Drag and drop PDFs here</h3>
            <p className="text-muted-foreground mb-4">or click to browse from your computer</p>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Choose Files
            </button>
            <p className="text-sm text-muted-foreground mt-4">Supports up to 100 files, 50MB each</p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="recent">Recent</option>
            <option value="citations">Most Cited</option>
            <option value="year">Newest Year</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="indexed">Indexed</option>
            <option value="processing">Processing</option>
            <option value="uploaded">Uploaded</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Tags Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTags(
                  selectedTags.includes(tag)
                    ? selectedTags.filter(t => t !== tag)
                    : [...selectedTags, tag]
                )}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-primary" />
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(paper.status)}`}>
                  {paper.status}
                </span>
              </div>

              <h3 className="font-bold text-foreground mb-2 line-clamp-2">{paper.title}</h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                {paper.authors.join(', ')}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{paper.year}</span>
                <span>{paper.journal}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Embedding:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEmbeddingColor(paper.embeddingStatus)}`}>
                    {paper.embeddingStatus}
                  </span>
                </div>
                
                {paper.summaryAvailable && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                    <span>✓ Summary available</span>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  {paper.citations.toLocaleString()} citations
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {paper.tags.map(tag => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  Open
                </button>
                <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Share2 className="w-4 h-4 text-foreground" />
                </button>
                <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No papers found matching your filters</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{papers.length}</div>
            <p className="text-sm text-muted-foreground">Total Papers</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{papers.filter(p => p.status === 'indexed').length}</div>
            <p className="text-sm text-muted-foreground">Indexed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{papers.reduce((acc, p) => acc + p.citations, 0).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Citations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
