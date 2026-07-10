'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/modal';
import { Download, Share2, Trash2, Eye, FileText } from 'lucide-react';

export function ResearchLibraryInteractive() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);
  const [shareEmail, setShareEmail] = useState('');

  const papers = [
    {
      id: 1,
      title: 'Attention is All You Need',
      authors: ['Vaswani A.', 'Shazeer N.', 'Parmar N.'],
      year: 2017,
      journal: 'NeurIPS',
      citations: 89432,
      status: 'indexed',
      embedding: 'completed',
    },
    {
      id: 2,
      title: 'BERT: Pre-training of Deep Bidirectional Transformers',
      authors: ['Devlin J.', 'Chang M.', 'Lee K.'],
      year: 2019,
      journal: 'NAACL',
      citations: 71234,
      status: 'indexed',
      embedding: 'completed',
    },
    {
      id: 3,
      title: 'Language Models are Unsupervised Multitask Learners',
      authors: ['Radford A.', 'Wu J.', 'Child R.'],
      year: 2019,
      journal: 'OpenAI',
      citations: 45123,
      status: 'indexed',
      embedding: 'in-progress',
    },
  ];

  const handleViewPaper = (paper: any) => {
    setSelectedPaper(paper);
    setOpenModal('view');
  };

  const handleSharePaper = (paper: any) => {
    setSelectedPaper(paper);
    setShareEmail('');
    setOpenModal('share');
  };

  const handleDeletePaper = (paper: any) => {
    console.log('Deleting paper:', paper.id);
    setOpenModal(null);
  };

  const handleShare = () => {
    if (shareEmail.includes('@')) {
      console.log('Sharing paper with:', shareEmail);
      setOpenModal(null);
    }
  };

  const handleDownload = (paper: any) => {
    console.log('Downloading paper:', paper.id);
  };

  return (
    <>
      <div className="space-y-4">
        {papers.map((paper, idx) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {paper.authors.join(', ')} • {paper.year}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleViewPaper(paper)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(paper)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSharePaper(paper)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePaper(paper)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-red-500"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="bg-secondary/50 p-2 rounded">
                <p className="text-muted-foreground">Journal</p>
                <p className="font-medium text-foreground">{paper.journal}</p>
              </div>
              <div className="bg-secondary/50 p-2 rounded">
                <p className="text-muted-foreground">Citations</p>
                <p className="font-medium text-foreground">{paper.citations.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/50 p-2 rounded">
                <p className="text-muted-foreground">Embedding</p>
                <p className="font-medium text-foreground capitalize">{paper.embedding.replace('-', ' ')}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Paper Modal */}
      {selectedPaper && (
        <Modal
          isOpen={openModal === 'view'}
          onClose={() => setOpenModal(null)}
          title={selectedPaper.title}
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Authors</p>
              <p className="text-foreground font-medium mt-1">{selectedPaper.authors.join(', ')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="text-foreground font-medium">{selectedPaper.year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Journal</p>
                <p className="text-foreground font-medium">{selectedPaper.journal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Citations</p>
                <p className="text-foreground font-medium">{selectedPaper.citations.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Embedding</p>
                <p className="text-foreground font-medium capitalize">{selectedPaper.embedding.replace('-', ' ')}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => handleDownload(selectedPaper)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
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

      {/* Share Paper Modal */}
      {selectedPaper && (
        <Modal
          isOpen={openModal === 'share'}
          onClose={() => setOpenModal(null)}
          title={`Share: ${selectedPaper.title}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Share with (email)
              </label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="colleague@example.com"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                The recipient will receive an email with a link to view and download this paper.
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleShare}
                disabled={!shareEmail.includes('@')}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Send
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
    </>
  );
}
