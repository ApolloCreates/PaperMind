'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Clock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentNode {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  runtime: number;
  tokensUsed: number;
  lastExecution: string;
  confidenceScore: number;
  color: string;
  x: number;
  y: number;
}

interface WorkflowLog {
  id: string;
  agentName: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const agents: AgentNode[] = [
  { id: '1', name: 'Planner', status: 'completed', runtime: 1.2, tokensUsed: 450, lastExecution: '2m ago', confidenceScore: 0.92, color: '#3b82f6', x: 100, y: 100 },
  { id: '2', name: 'Retriever', status: 'running', runtime: 3.5, tokensUsed: 2100, lastExecution: 'now', confidenceScore: 0.88, color: '#8b5cf6', x: 300, y: 50 },
  { id: '3', name: 'Summarizer', status: 'running', runtime: 2.8, tokensUsed: 1800, lastExecution: 'now', confidenceScore: 0.85, color: '#ec4899', x: 500, y: 100 },
  { id: '4', name: 'Research Gap', status: 'idle', runtime: 0, tokensUsed: 0, lastExecution: '—', confidenceScore: 0, color: '#f59e0b', x: 700, y: 50 },
  { id: '5', name: 'Topic Generator', status: 'idle', runtime: 0, tokensUsed: 0, lastExecution: '—', confidenceScore: 0, color: '#14b8a6', x: 900, y: 100 },
  { id: '6', name: 'Writer', status: 'idle', runtime: 0, tokensUsed: 0, lastExecution: '—', confidenceScore: 0, color: '#10b981', x: 600, y: 250 },
  { id: '7', name: 'Reviewer', status: 'idle', runtime: 0, tokensUsed: 0, lastExecution: '—', confidenceScore: 0, color: '#06b6d4', x: 800, y: 250 },
  { id: '8', name: 'Editor', status: 'idle', runtime: 0, tokensUsed: 0, lastExecution: '—', confidenceScore: 0, color: '#6366f1', x: 1000, y: 250 },
  { id: '9', name: 'Memory', status: 'running', runtime: 1.5, tokensUsed: 800, lastExecution: 'now', confidenceScore: 0.91, color: '#f97316', x: 400, y: 350 },
  { id: '10', name: 'Supervisor', status: 'running', runtime: 0.8, tokensUsed: 200, lastExecution: 'now', confidenceScore: 0.94, color: '#d946ef', x: 700, y: 350 },
];

const connections = [
  ['1', '2'], ['1', '3'], ['2', '6'], ['3', '4'], ['3', '5'],
  ['4', '6'], ['5', '7'], ['6', '8'], ['7', '8'], ['9', '2'],
  ['9', '3'], ['10', '1'], ['10', '6'], ['10', '8'],
];

export default function AgentWorkflowPage() {
  const [workflowLogs, setWorkflowLogs] = useState<WorkflowLog[]>([
    { id: '1', agentName: 'Planner', message: 'Workflow execution started', timestamp: '14:32:05', type: 'info' },
    { id: '2', agentName: 'Planner', message: 'Generated research plan with 5 steps', timestamp: '14:32:07', type: 'success' },
    { id: '3', agentName: 'Retriever', message: 'Fetching relevant papers from knowledge base...', timestamp: '14:32:08', type: 'info' },
    { id: '4', agentName: 'Memory', message: 'Storing context in memory cache', timestamp: '14:32:09', type: 'success' },
    { id: '5', agentName: 'Supervisor', message: 'Monitoring agent execution', timestamp: '14:32:10', type: 'info' },
  ]);

  const [isRunning, setIsRunning] = useState(true);
  const [totalTokens, setTotalTokens] = useState(5350);
  const [elapsedTime, setElapsedTime] = useState('8.3s');

  // Simulate execution
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTotalTokens(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500';
      case 'running': return 'bg-blue-500 animate-pulse';
      case 'idle': return 'bg-gray-400';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBorder = (status: string) => {
    switch(status) {
      case 'completed': return 'border-emerald-500';
      case 'running': return 'border-blue-500';
      case 'idle': return 'border-gray-300';
      case 'error': return 'border-red-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Agent Workflow Execution</h1>
          <p className="text-muted-foreground">LangGraph multi-agent orchestration and monitoring</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8 bg-card border border-border rounded-lg p-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Resume
              </>
            )}
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 font-medium text-foreground">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Stats */}
          <div className="ml-auto flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-mono">{elapsedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-mono">{totalTokens.toLocaleString()} tokens</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-mono">
                {agents.filter(a => a.status === 'running').length} active
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Workflow Visualization */}
          <div className="col-span-2 bg-card border border-border rounded-lg p-6 overflow-auto">
            <svg width="100%" height="450" viewBox="0 0 1100 450" className="bg-background/50 rounded">
              {/* Connections */}
              {connections.map((conn, idx) => {
                const fromAgent = agents.find(a => a.id === conn[0]);
                const toAgent = agents.find(a => a.id === conn[1]);
                if (!fromAgent || !toAgent) return null;
                
                const isActive = (fromAgent.status === 'completed' || fromAgent.status === 'running') &&
                                (toAgent.status === 'running' || toAgent.status === 'idle');
                
                return (
                  <motion.line
                    key={idx}
                    x1={fromAgent.x}
                    y1={fromAgent.y}
                    x2={toAgent.x}
                    y2={toAgent.y}
                    stroke={isActive ? '#3b82f6' : '#e5e7eb'}
                    strokeWidth={isActive ? 3 : 2}
                    strokeDasharray={isActive ? '0' : '5,5'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                );
              })}

              {/* Nodes */}
              {agents.map((agent, idx) => (
                <g key={agent.id}>
                  <motion.circle
                    cx={agent.x}
                    cy={agent.y}
                    r="35"
                    fill="white"
                    stroke={agent.color}
                    strokeWidth="2"
                    className="dark:fill-card"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                  
                  {/* Status Indicator */}
                  {agent.status === 'running' && (
                    <motion.circle
                      cx={agent.x}
                      cy={agent.y}
                      r="35"
                      fill="none"
                      stroke={agent.color}
                      strokeWidth="2"
                      initial={{ r: 35 }}
                      animate={{ r: 50 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      opacity={0.5}
                    />
                  )}

                  {/* Node Label */}
                  <text
                    x={agent.x}
                    y={agent.y + 45}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-foreground"
                  >
                    {agent.name}
                  </text>

                  {/* Status Dot */}
                  <circle
                    cx={agent.x + 30}
                    cy={agent.y - 30}
                    r="6"
                    fill={agent.status === 'running' ? '#3b82f6' : agent.status === 'completed' ? '#10b981' : '#9ca3af'}
                    className={agent.status === 'running' ? 'animate-pulse' : ''}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Right Sidebar - Agent Details & Logs */}
          <div className="flex flex-col gap-6">
            {/* Active Agents Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Active Agents
              </h3>
              <div className="space-y-3">
                {agents.filter(a => a.status === 'running' || a.status === 'completed').map(agent => (
                  <div key={agent.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{agent.name}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        agent.status === 'running' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>Runtime: {agent.runtime}s</div>
                      <div>Tokens: {agent.tokensUsed.toLocaleString()}</div>
                      <div>Confidence: {(agent.confidenceScore * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Logs */}
            <div className="bg-card border border-border rounded-lg p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-foreground mb-4">Execution Logs</h3>
              <div className="flex-1 overflow-y-auto space-y-3 text-xs">
                {workflowLogs.map(log => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-2 rounded border-l-2 ${
                      log.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : log.type === 'error'
                        ? 'bg-red-50 dark:bg-red-950 border-red-500 text-red-700 dark:text-red-300'
                        : log.type === 'warning'
                        ? 'bg-amber-50 dark:bg-amber-950 border-amber-500 text-amber-700 dark:text-amber-300'
                        : 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    <div className="font-semibold">{log.agentName}</div>
                    <div className="opacity-90">{log.message}</div>
                    <div className="opacity-70 text-xs">{log.timestamp}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">{agents.length}</div>
            <p className="text-sm text-muted-foreground">Total Agents</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-600">{agents.filter(a => a.status === 'completed').length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{agents.filter(a => a.status === 'running').length}</div>
            <p className="text-sm text-muted-foreground">Running</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">{(agents.reduce((acc, a) => acc + a.confidenceScore, 0) / agents.filter(a => a.status !== 'idle').length).toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Avg Confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
