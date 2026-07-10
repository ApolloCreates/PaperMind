'use client';

import { useState } from 'react';
import { FileText, Save, Clock, Type, Zap, BookOpen, Sparkles, Settings, ChevronDown, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface Citation {
  id: string;
  author: string;
  year: number;
  title: string;
}

export default function PaperEditorPage() {
  const [content, setContent] = useState(`# Machine Learning in Scientific Research

## Abstract
This paper explores the intersection of machine learning and scientific research methodologies...

## Introduction
The field of machine learning has rapidly evolved over the past decade. Recent advances in deep learning have revolutionized how we approach scientific problems.

## Methodology
We employed a multi-agent approach combining transformer architectures with domain-specific knowledge graphs.

### Data Collection
The dataset was curated from multiple sources including academic databases and domain-specific repositories.

### Model Architecture
Our architecture consists of three main components:
1. The feature extraction layer
2. The semantic understanding module
3. The knowledge integration framework

## Results
The experimental results demonstrate significant improvements over baseline methods.

## Discussion
These findings suggest new directions for future research in applied AI.

## Conclusion
This work contributes to our understanding of how AI can accelerate scientific discovery.

## References
[1] Smith et al., 2023. "Advances in AI"
[2] Johnson et al., 2022. "Deep Learning Fundamentals"
`);

  const [wordCount, setWordCount] = useState(content.split(/\s+/).length);
  const [readingTime, setReadingTime] = useState(Math.ceil(wordCount / 200));
  const [citations, setCitations] = useState<Citation[]>([
    { id: '1', author: 'Smith et al.', year: 2023, title: 'Advances in AI' },
    { id: '2', author: 'Johnson et al.', year: 2022, title: 'Deep Learning Fundamentals' },
  ]);
  const [selectedText, setSelectedText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(true);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(newContent.split(/\s+/).filter(w => w.length > 0).length);
    setReadingTime(Math.ceil(wordCount / 200));
  };

  const handleTextSelect = () => {
    const selection = window.getSelection()?.toString() || '';
    setSelectedText(selection);
    if (selection.length > 0) {
      generateSuggestions();
    }
  };

  const generateSuggestions = () => {
    setSuggestions([
      'Improve clarity of this sentence',
      'Make this more concise',
      'Expand with more detail',
      'Check grammar and punctuation',
    ]);
  };

  const applySuggestion = (suggestion: string) => {
    if (suggestion.includes('concise')) {
      setContent(content.replace(selectedText, selectedText.substring(0, selectedText.length - 5)));
    }
    setSuggestions([]);
    setSelectedText('');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor Header */}
        <div className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Untitled Paper</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Auto-saved
              </span>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span>{wordCount} words</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{citations.length} citations</span>
            </div>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="border-b border-border bg-card px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <button className="px-3 py-1 hover:bg-secondary rounded transition-colors text-sm font-medium text-foreground">Bold</button>
          <button className="px-3 py-1 hover:bg-secondary rounded transition-colors text-sm font-medium text-foreground">Italic</button>
          <button className="px-3 py-1 hover:bg-secondary rounded transition-colors text-sm font-medium text-foreground">Code</button>
          <div className="w-px h-4 bg-border mx-2"></div>
          <button className="px-3 py-1 hover:bg-secondary rounded transition-colors text-sm font-medium text-foreground">H1</button>
          <button className="px-3 py-1 hover:bg-secondary rounded transition-colors text-sm font-medium text-foreground">H2</button>
          <div className="w-px h-4 bg-border mx-2"></div>
          <button className="px-3 py-1 hover:bg-secondary rounded transition-colors text-sm font-medium text-foreground flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Tools
          </button>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto">
          <textarea
            value={content}
            onChange={handleContentChange}
            onMouseUp={handleTextSelect}
            className="w-full h-full px-8 py-6 bg-background text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-0"
            placeholder="Start writing your paper..."
            spellCheck="false"
          />
        </div>
      </div>

      {/* Right Sidebar - AI Assistant Panel */}
      {panelOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-80 border-l border-border bg-card flex flex-col overflow-hidden"
        >
          {/* Panel Header */}
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">AI Assistant</h2>
            </div>
            <button onClick={() => setPanelOpen(false)} className="p-1 hover:bg-secondary rounded transition-colors">
              <ChevronDown className="w-4 h-4 text-foreground rotate-90" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Outline Section */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Table of Contents
              </h3>
              <div className="space-y-1 text-sm">
                <div className="text-primary font-medium pl-2">1. Abstract</div>
                <div className="text-muted-foreground pl-2">2. Introduction</div>
                <div className="text-muted-foreground pl-2">3. Methodology</div>
                <div className="text-muted-foreground pl-4">3.1 Data Collection</div>
                <div className="text-muted-foreground pl-4">3.2 Model Architecture</div>
                <div className="text-muted-foreground pl-2">4. Results</div>
                <div className="text-muted-foreground pl-2">5. Discussion</div>
                <div className="text-muted-foreground pl-2">6. Conclusion</div>
              </div>
            </div>

            <div className="h-px bg-border"></div>

            {/* AI Suggestions */}
            {selectedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Suggestions
                </h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => applySuggestion(suggestion)}
                      className="w-full text-left text-sm px-3 py-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {!selectedText && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm px-3 py-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">
                      AI Rewrite Section
                    </button>
                    <button className="w-full text-left text-sm px-3 py-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">
                      Improve Writing
                    </button>
                    <button className="w-full text-left text-sm px-3 py-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">
                      Generate References
                    </button>
                    <button className="w-full text-left text-sm px-3 py-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-medium">
                      Check Grammar
                    </button>
                  </div>
                </div>

                <div className="h-px bg-border"></div>

                {/* Citations */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
                    Citations
                    <button className="p-1 hover:bg-secondary rounded transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {citations.map(citation => (
                      <div key={citation.id} className="text-xs p-2 bg-secondary rounded">
                        <div className="font-medium text-foreground">{citation.author} ({citation.year})</div>
                        <div className="text-muted-foreground line-clamp-2">{citation.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border"></div>

                {/* Version History */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Versions</h3>
                  <div className="space-y-1 text-sm">
                    <div className="px-3 py-2 rounded bg-primary/10 text-primary font-medium">v1.0 - Current</div>
                    <div className="px-3 py-2 rounded text-muted-foreground">v0.9 - 2 hours ago</div>
                    <div className="px-3 py-2 rounded text-muted-foreground">v0.8 - 5 hours ago</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Collapsed Panel Button */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="w-16 border-l border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-foreground -rotate-90" />
        </button>
      )}
    </div>
  );
}
