'use client';

import { useState } from 'react';
import { ChevronDown, AlertCircle, CheckCircle, TrendingUp, BookOpen, Edit, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewScore {
  category: string;
  score: number;
  maxScore: number;
}

interface Review {
  id: string;
  paperTitle: string;
  authors: string[];
  submissionDate: string;
  overallScore: number;
  noveltyScore: number;
  writingQuality: number;
  methodology: number;
  literatureReview: number;
  references: number;
  technicalQuality: number;
  confidence: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  missingCitations: string[];
  grammarIssues: number;
  hallucinations: number;
  expanded?: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    paperTitle: 'Multi-Agent Systems for Scientific Discovery',
    authors: ['Chen, Y.', 'Wang, X.'],
    submissionDate: '2024-01-20',
    overallScore: 8.2,
    noveltyScore: 8,
    writingQuality: 8,
    methodology: 8.5,
    literatureReview: 7.8,
    references: 8.2,
    technicalQuality: 8.5,
    confidence: 0.95,
    suggestions: [
      'Expand the experimental section with more baselines',
      'Include ablation studies for each component',
      'Provide computational complexity analysis',
    ],
    strengths: [
      'Novel approach to multi-agent coordination',
      'Comprehensive experimental evaluation',
      'Clear presentation of results',
    ],
    weaknesses: [
      'Limited discussion of failure cases',
      'Some notation inconsistencies',
    ],
    missingCitations: [
      'Recent work on agent communication',
      'Related work in knowledge graphs',
    ],
    grammarIssues: 2,
    hallucinations: 0,
  },
  {
    id: '2',
    paperTitle: 'Knowledge Graph Embeddings for Research Papers',
    authors: ['Kumar, S.', 'Patel, R.'],
    submissionDate: '2024-01-18',
    overallScore: 7.1,
    noveltyScore: 6.8,
    writingQuality: 7.5,
    methodology: 7.2,
    literatureReview: 6.5,
    references: 7.8,
    technicalQuality: 7.0,
    confidence: 0.87,
    suggestions: [
      'Strengthen motivation for the proposed approach',
      'Include more recent baselines',
      'Provide code availability statement',
    ],
    strengths: [
      'Solid technical approach',
      'Comprehensive dataset',
    ],
    weaknesses: [
      'Limited novelty over existing methods',
      'Insufficient evaluation on diverse datasets',
    ],
    missingCitations: [
      'Recent embedding techniques',
    ],
    grammarIssues: 5,
    hallucinations: 1,
  },
];

export default function ReviewerDashboardPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const toggleExpanded = (id: string) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, expanded: !r.expanded } : r
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 7) return 'text-blue-600 dark:text-blue-400';
    if (score >= 6) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-50 dark:bg-emerald-950';
    if (score >= 7) return 'bg-blue-50 dark:bg-blue-950';
    if (score >= 6) return 'bg-amber-50 dark:bg-amber-950';
    return 'bg-red-50 dark:bg-red-950';
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Reviewer Dashboard</h1>
          <p className="text-muted-foreground">AI-powered academic paper reviews</p>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Review Card Header */}
              <button
                onClick={() => toggleExpanded(review.id)}
                className="w-full bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Paper Info */}
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg text-foreground mb-1">{review.paperTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{review.authors.join(', ')}</p>
                    <p className="text-xs text-muted-foreground">Submitted {review.submissionDate}</p>
                  </div>

                  {/* Main Scores */}
                  <div className="flex items-center gap-6">
                    {/* Overall Score */}
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(review.overallScore)}`}>
                        {review.overallScore.toFixed(1)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Overall</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Novelty:</span>
                        <span className={`font-semibold ${getScoreColor(review.noveltyScore)}`}>
                          {review.noveltyScore.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Quality:</span>
                        <span className={`font-semibold ${getScoreColor(review.writingQuality)}`}>
                          {review.writingQuality.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform ${review.expanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    {review.grammarIssues === 0 ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    )}
                    <span className="text-muted-foreground">
                      {review.grammarIssues} grammar {review.grammarIssues === 1 ? 'issue' : 'issues'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {review.hallucinations === 0 ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-muted-foreground">
                      {review.hallucinations} potential hallucination{review.hallucinations !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm ml-auto">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-semibold text-foreground">{(review.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </button>

              {/* Expanded Review Details */}
              {review.expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-t-0 border-border rounded-b-lg p-6 space-y-6"
                >
                  {/* Radar Chart Representation */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Detailed Scores
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Methodology', score: review.methodology },
                        { name: 'Literature Review', score: review.literatureReview },
                        { name: 'References', score: review.references },
                        { name: 'Technical Quality', score: review.technicalQuality },
                      ].map((metric) => (
                        <div key={metric.name} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-foreground font-medium">{metric.name}</span>
                            <span className={`font-semibold ${getScoreColor(metric.score)}`}>
                              {metric.score.toFixed(1)}/10
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${metric.score * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {review.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                          <span className="text-emerald-600 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Weaknesses
                    </h4>
                    <ul className="space-y-2">
                      {review.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                          <span className="text-amber-600 mt-1">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      Suggestions
                    </h4>
                    <ul className="space-y-2">
                      {review.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                          <span className="text-blue-600 mt-1">→</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Citations */}
                  {review.missingCitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Missing Citations
                      </h4>
                      <ul className="space-y-2">
                        {review.missingCitations.map((citation, idx) => (
                          <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                            <span className="text-primary mt-1">+</span>
                            {citation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Accept Review
                    </button>
                    <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors font-medium">
                      Request Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{reviews.length}</div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">
              {(reviews.reduce((acc, r) => acc + r.overallScore, 0) / reviews.length).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {reviews.filter(r => r.grammarIssues === 0).length}
            </div>
            <p className="text-sm text-muted-foreground">Grammar-Free</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {reviews.filter(r => r.hallucinations === 0).length}
            </div>
            <p className="text-sm text-muted-foreground">No Hallucinations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
