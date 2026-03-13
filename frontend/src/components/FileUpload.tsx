import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileText,
  Image,
  Music,
  Video,
  X,
  Loader2,
  Type,
} from 'lucide-react';
import { detectFileType, formatFileSize, getFileTypeLabel } from '../utils/helpers';
import type { FileType } from '../types';

const FILE_TYPE_ICONS: Record<FileType, typeof FileText> = {
  text: FileText,
  image: Image,
  audio: Music,
  video: Video,
};

const FILE_TYPE_COLORS: Record<FileType, string> = {
  text: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  image: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  audio: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  video: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

type InputMode = 'text' | 'file';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onTextSubmit: (text: string) => void;
  isAnalyzing: boolean;
  uploadProgress: number;
}

export default function FileUpload({
  onFileSelect,
  onTextSubmit,
  isAnalyzing,
  uploadProgress,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<InputMode>('text');
  const [textInput, setTextInput] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: isAnalyzing,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const handleTextSubmit = () => {
    if (textInput.trim().length > 0 && !isAnalyzing) {
      onTextSubmit(textInput.trim());
    }
  };

  const fileType = selectedFile ? detectFileType(selectedFile) : null;
  const FileIcon = fileType ? FILE_TYPE_ICONS[fileType] : Upload;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Sliding Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="relative inline-flex items-center bg-surface-light border border-border rounded-xl p-1">
          <button
            onClick={() => setMode('text')}
            className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-mono font-medium hover-scale ${
              mode === 'text'
                ? 'text-surface bg-primary shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                : 'text-text-secondary hover:text-primary/80'
            }`}
          >
            <Type className="w-4 h-4" />
            Text Input
          </button>
          <button
            onClick={() => setMode('file')}
            className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-mono font-medium hover-scale ${
              mode === 'file'
                ? 'text-surface bg-primary shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                : 'text-text-secondary hover:text-primary/80'
            }`}
          >
            <Upload className="w-4 h-4" />
            File Upload
          </button>
        </div>
      </div>

      {/* Analyzing State */}
      {isAnalyzing ? (
        <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center bg-surface-light card-hover">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="w-12 h-12 text-primary mx-auto micro-spinner" />
          </div>
          <p className="text-lg font-mono font-medium text-primary mb-1">
            Analyzing content<span className="animate-blink">_</span>
          </p>
          <p className="text-xs text-text-muted mb-6 font-mono">Running 20+ forensic techniques in parallel</p>
          
          {/* Enhanced Progress Visualization */}
          <div className="space-y-4 max-w-md mx-auto">
            {/* Main Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold font-mono">Overall Progress</span>
                <span className="text-xs font-mono text-primary font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-border/50">
                <div
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full progress-animate metric-glow transition-all duration-300"
                  style={{
                    width: `${uploadProgress}%`,
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>
            </div>

            {/* Stage Indicators */}
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className={`p-2 rounded-lg border transition-all ${uploadProgress >= 33 ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface border-border/50 text-text-muted'}`}>
                <div className={uploadProgress >= 33 ? 'opacity-100' : 'opacity-50'}>
                  {uploadProgress >= 33 ? '✓' : '○'} Upload
                </div>
              </div>
              <div className={`p-2 rounded-lg border transition-all ${uploadProgress >= 66 ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface border-border/50 text-text-muted'}`}>
                <div className={uploadProgress >= 66 ? 'opacity-100' : 'opacity-50'}>
                  {uploadProgress >= 66 ? '✓' : '○'} Process
                </div>
              </div>
              <div className={`p-2 rounded-lg border transition-all ${uploadProgress >= 95 ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface border-border/50 text-text-muted'}`}>
                <div className={uploadProgress >= 95 ? 'opacity-100' : 'opacity-50'}>
                  {uploadProgress >= 95 ? '✓' : '○'} Analyze
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-text-muted mt-6 font-mono">
            {uploadProgress < 33
              ? '> initializing upload...'
              : uploadProgress < 66
              ? '> processing file...'
              : uploadProgress < 95
              ? '> running forensic techniques...'
              : '> finalizing report...'}
          </p>
        </div>
      ) : mode === 'text' ? (
        /* ── Text Input Mode ── */
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste or type text to analyze for AI generation..."
              className="w-full h-48 bg-surface border-2 border-border rounded-2xl p-5 text-sm text-text-primary font-mono resize-none focus:outline-none focus:border-primary/50 focus:shadow-[0_0_16px_rgba(0,255,136,0.1)] transition-all placeholder:text-text-muted/50"
            />
            <span className="absolute bottom-3 right-4 text-[10px] font-mono text-text-muted">
              {textInput.length} chars
            </span>
          </div>
          <button
            onClick={handleTextSubmit}
            disabled={textInput.trim().length === 0}
            className="w-full py-3.5 rounded-xl font-mono font-semibold text-sm button-hover disabled:opacity-40 disabled:cursor-not-allowed bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 hover:shadow-[0_0_16px_rgba(0,255,136,0.15)] hover:border-primary/50"
          >
            <span className="text-primary/60">&gt; </span>
            Analyze Text
          </button>
        </div>
      ) : (
        /* ── File Upload Mode ── */
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer group card-hover ${
            isDragActive
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-border'
          }`}
        >
          <input {...getInputProps()} />

          {selectedFile && fileType ? (
            <div className="animate-fade-in">
              <div
                className={`w-16 h-16 rounded-2xl border ${FILE_TYPE_COLORS[fileType]} flex items-center justify-center mx-auto mb-4`}
              >
                <FileIcon className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium text-text-primary mb-1 font-mono">
                {selectedFile.name}
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-text-secondary">
                <span className="px-2 py-0.5 rounded-md bg-surface-lighter border border-border font-mono text-xs">
                  {getFileTypeLabel(fileType)}
                </span>
                <span className="font-mono text-xs">{formatFileSize(selectedFile.size)}</span>
              </div>
              <button
                onClick={removeFile}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-surface-lighter border border-border flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <Upload className="w-8 h-8 text-text-muted group-hover:text-primary transition-colors" />
              </div>
              <p className="text-lg font-medium text-text-primary mb-2 font-mono">
                {isDragActive ? (
                  <><span className="text-primary">{'>'}</span> Drop file here</>
                ) : (
                  <><span className="text-primary">{'>'}</span> Drop a file or click to upload</>
                )}
              </p>
              <p className="text-sm text-text-muted">
                Supports images, audio, and video files
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                {(['image', 'audio', 'video'] as FileType[]).map((type) => {
                  const Icon = FILE_TYPE_ICONS[type];
                  return (
                    <div
                      key={type}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${FILE_TYPE_COLORS[type]} text-xs font-mono`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {getFileTypeLabel(type)}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
