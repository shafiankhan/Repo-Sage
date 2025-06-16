"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Folder, 
  FileText, 
  Search, 
  GitBranch, 
  Clock, 
  Download,
  Eye,
  Code,
  Image,
  FileCode,
  FileJson,
  Settings
} from 'lucide-react';
import { format } from 'date-fns';

interface FileBrowserProps {
  projectId: string;
}

const fileStructure = [
  {
    name: 'app',
    type: 'folder',
    size: null,
    lastModified: new Date('2024-01-15T10:30:00'),
    children: [
      {
        name: '(dashboard)',
        type: 'folder',
        size: null,
        lastModified: new Date('2024-01-15T10:30:00'),
        children: [
          { name: 'layout.tsx', type: 'file', size: '2.1 KB', lastModified: new Date('2024-01-15T10:30:00'), language: 'typescript' },
          { name: 'page.tsx', type: 'file', size: '1.8 KB', lastModified: new Date('2024-01-14T16:45:00'), language: 'typescript' },
          { name: 'chat', type: 'folder', size: null, lastModified: new Date('2024-01-14T14:20:00') },
          { name: 'projects', type: 'folder', size: null, lastModified: new Date('2024-01-13T11:15:00') }
        ]
      },
      { name: 'globals.css', type: 'file', size: '3.2 KB', lastModified: new Date('2024-01-15T10:30:00'), language: 'css' },
      { name: 'layout.tsx', type: 'file', size: '1.5 KB', lastModified: new Date('2024-01-14T16:45:00'), language: 'typescript' },
      { name: 'page.tsx', type: 'file', size: '2.8 KB', lastModified: new Date('2024-01-13T11:15:00'), language: 'typescript' }
    ]
  },
  {
    name: 'components',
    type: 'folder',
    size: null,
    lastModified: new Date('2024-01-15T10:30:00'),
    children: [
      {
        name: 'ui',
        type: 'folder',
        size: null,
        lastModified: new Date('2024-01-15T10:30:00'),
        children: [
          { name: 'button.tsx', type: 'file', size: '1.2 KB', lastModified: new Date('2024-01-15T10:30:00'), language: 'typescript' },
          { name: 'card.tsx', type: 'file', size: '0.8 KB', lastModified: new Date('2024-01-14T16:45:00'), language: 'typescript' },
          { name: 'input.tsx', type: 'file', size: '0.9 KB', lastModified: new Date('2024-01-14T14:20:00'), language: 'typescript' }
        ]
      },
      { name: 'theme-toggle.tsx', type: 'file', size: '1.1 KB', lastModified: new Date('2024-01-15T10:30:00'), language: 'typescript' },
      { name: 'theme-provider.tsx', type: 'file', size: '0.7 KB', lastModified: new Date('2024-01-15T10:30:00'), language: 'typescript' }
    ]
  },
  {
    name: 'lib',
    type: 'folder',
    size: null,
    lastModified: new Date('2024-01-14T16:45:00'),
    children: [
      { name: 'auth.ts', type: 'file', size: '2.3 KB', lastModified: new Date('2024-01-14T16:45:00'), language: 'typescript' },
      { name: 'firebase.ts', type: 'file', size: '1.4 KB', lastModified: new Date('2024-01-14T16:45:00'), language: 'typescript' },
      { name: 'utils.ts', type: 'file', size: '0.5 KB', lastModified: new Date('2024-01-13T11:15:00'), language: 'typescript' }
    ]
  },
  { name: 'package.json', type: 'file', size: '2.1 KB', lastModified: new Date('2024-01-13T11:15:00'), language: 'json' },
  { name: 'tailwind.config.ts', type: 'file', size: '1.8 KB', lastModified: new Date('2024-01-15T10:30:00'), language: 'typescript' },
  { name: 'tsconfig.json', type: 'file', size: '0.6 KB', lastModified: new Date('2024-01-13T11:15:00'), language: 'json' },
  { name: 'README.md', type: 'file', size: '4.2 KB', lastModified: new Date('2024-01-12T09:30:00'), language: 'markdown' },
  { name: '.env.example', type: 'file', size: '0.8 KB', lastModified: new Date('2024-01-14T16:45:00'), language: 'text' }
];

const getFileIcon = (fileName: string, language?: string) => {
  if (language) {
    switch (language) {
      case 'typescript':
      case 'javascript':
        return FileCode;
      case 'json':
        return FileJson;
      case 'css':
        return Code;
      case 'markdown':
        return FileText;
      default:
        return FileText;
    }
  }
  
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return Image;
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
      return FileCode;
    case 'json':
      return FileJson;
    case 'css':
    case 'scss':
      return Code;
    case 'md':
      return FileText;
    default:
      return FileText;
  }
};

const getLanguageColor = (language?: string) => {
  switch (language) {
    case 'typescript':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'javascript':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'css':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'json':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'markdown':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

interface FileItemProps {
  item: any;
  depth: number;
  expanded: boolean;
  onToggle: () => void;
}

function FileItem({ item, depth, expanded, onToggle }: FileItemProps) {
  const Icon = item.type === 'folder' ? Folder : getFileIcon(item.name, item.language);
  
  return (
    <div>
      <div 
        className={`flex items-center gap-2 p-2 rounded hover:bg-accent/50 cursor-pointer transition-colors`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={item.type === 'folder' ? onToggle : undefined}
      >
        <Icon className={`w-4 h-4 ${
          item.type === 'folder' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-muted-foreground'
        }`} />
        <span className="flex-1 text-sm font-medium">{item.name}</span>
        {item.language && (
          <Badge variant="outline" className={`text-xs ${getLanguageColor(item.language)}`}>
            {item.language}
          </Badge>
        )}
        {item.size && (
          <span className="text-xs text-muted-foreground">{item.size}</span>
        )}
        <span className="text-xs text-muted-foreground">
          {format(item.lastModified, 'MMM d')}
        </span>
        {item.type === 'file' && (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Eye className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
      
      {item.type === 'folder' && expanded && item.children && (
        <div>
          {item.children.map((child: any, index: number) => (
            <FileItemContainer key={`${child.name}-${index}`} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FileItemContainer({ item, depth }: { item: any; depth: number }) {
  const [expanded, setExpanded] = React.useState(depth < 2);
  
  return (
    <FileItem 
      item={item} 
      depth={depth} 
      expanded={expanded} 
      onToggle={() => setExpanded(!expanded)} 
    />
  );
}

export function FileBrowser({ projectId }: FileBrowserProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  return (
    <div className="space-y-6">
      {/* File Browser Header */}
      <Card className="github-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5" />
              Repository Files
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                main
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Clone
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated 2 hours ago</span>
            </div>
          </div>
          
          {/* File Tree */}
          <div className="border border-border rounded-lg">
            <div className="bg-muted/50 px-4 py-2 border-b border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Files</span>
                <span className="text-muted-foreground">Last commit message</span>
              </div>
            </div>
            <div className="p-2">
              {fileStructure.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FileItemContainer item={item} depth={0} />
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Languages</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Files</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="github-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Lines of Code</p>
                <p className="text-2xl font-bold">2.1K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}