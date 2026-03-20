import { useState } from 'react';
import { Upload, FileText, Image, Link as LinkIcon, Loader2 } from 'lucide-react';
import type { HackathonContext } from '../../types';

interface ProblemStatementUploadProps {
  onComplete: (context: Partial<HackathonContext>) => void;
  onBack: () => void;
}

type UploadTab = 'text' | 'pdf' | 'image' | 'url';

export function ProblemStatementUpload({ onComplete, onBack }: ProblemStatementUploadProps) {
  const [activeTab, setActiveTab] = useState<UploadTab>('text');
  const [problemText, setProblemText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File, type: 'pdf' | 'image') => {
    // Validate file
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    const allowedTypes = type === 'pdf' 
      ? ['application/pdf']
      : ['image/png', 'image/jpeg', 'image/jpg'];
    
    if (!allowedTypes.includes(file.type)) {
      alert(`Invalid file type. Please upload a ${type.toUpperCase()} file.`);
      return;
    }

    setIsExtracting(true);

    try {
      // Simulate text extraction (in real implementation, use pdf.js or Tesseract.js)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockExtractedText = `Extracted text from ${file.name}:\n\nBuild an AI-powered solution that helps students learn more effectively. The solution should use machine learning to personalize learning paths and provide real-time feedback. Judging criteria: Innovation (30%), Technical Implementation (30%), User Experience (20%), Impact (20%).`;
      
      setExtractedText(mockExtractedText);
      setProblemText(mockExtractedText);
    } catch (error) {
      alert('Failed to extract text from file. Please try another method.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleUrlScrape = async () => {
    if (!sourceUrl) {
      alert('Please enter a URL');
      return;
    }

    setIsExtracting(true);

    try {
      // Simulate URL scraping
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockScrapedText = `Scraped from ${sourceUrl}:\n\nCreate an innovative solution for sustainable urban transportation. Your project should address at least one of the following: reducing carbon emissions, improving accessibility, or optimizing traffic flow. Bonus points for real-time data integration.`;
      
      setExtractedText(mockScrapedText);
      setProblemText(mockScrapedText);
    } catch (error) {
      alert('Failed to scrape URL. Please try another method.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAnalyze = async () => {
    if (!problemText.trim()) {
      alert('Please provide a problem statement');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock analysis
      const analysis = {
        mainChallenge: 'Build an AI-powered personalized learning platform',
        mustHaveFeatures: [
          'User authentication and profiles',
          'Machine learning recommendation engine',
          'Progress tracking dashboard',
          'Interactive learning modules',
          'Real-time feedback system'
        ],
        constraints: [
          'Must be completed within hackathon timeframe',
          'Should use accessible APIs',
          'Must be deployable'
        ],
        judgingCriteria: [
          { criterion: 'Innovation', weight: 30 },
          { criterion: 'Technical Implementation', weight: 30 },
          { criterion: 'User Experience', weight: 20 },
          { criterion: 'Impact', weight: 20 }
        ],
        winningOpportunities: [
          'Integrate cutting-edge AI models',
          'Focus on exceptional UX design',
          'Demonstrate measurable learning outcomes'
        ]
      };

      const context: Partial<HackathonContext> = {
        problemStatement: {
          rawText: problemText,
          extractedFrom: activeTab,
          sourceUrl: sourceUrl || undefined
        },
        analysis
      };

      onComplete(context);
    } catch (error) {
      alert('Failed to analyze problem statement. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F0] via-[#FFE5D9] to-[#FFF5F0] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            Upload Problem Statement
          </h1>
          <p className="text-lg text-[#475569]">
            Let's analyze your hackathon challenge
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'text'
                  ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                  : 'text-[#64748B] hover:text-[#FF6B35]'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Text
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'pdf'
                  ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                  : 'text-[#64748B] hover:text-[#FF6B35]'
              }`}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              PDF
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'image'
                  ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                  : 'text-[#64748B] hover:text-[#FF6B35]'
              }`}
            >
              <Image className="w-5 h-5 inline mr-2" />
              Image
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'url'
                  ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                  : 'text-[#64748B] hover:text-[#FF6B35]'
              }`}
            >
              <LinkIcon className="w-5 h-5 inline mr-2" />
              URL
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'text' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Paste Problem Statement
              </label>
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Paste your hackathon problem statement here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent resize-none"
              />
            </div>
          )}

          {activeTab === 'pdf' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Upload PDF File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#FF6B35] transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-[#475569] mb-4">
                  Drag and drop your PDF here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'pdf');
                  }}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF4500] cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-2">Max file size: 10MB</p>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Upload Image (PNG, JPG)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#FF6B35] transition-colors">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-[#475569] mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'image');
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF4500] cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-2">Max file size: 10MB</p>
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                DevPost or Event Page URL
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://devpost.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent mb-4"
              />
              <button
                onClick={handleUrlScrape}
                disabled={isExtracting || !sourceUrl}
                className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF4500] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  'Scrape URL'
                )}
              </button>
            </div>
          )}

          {/* Extracted Text Preview */}
          {extractedText && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Extracted Text (Editable)
              </label>
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent resize-none"
              />
            </div>
          )}

          {/* Extraction Loading */}
          {isExtracting && (
            <div className="mt-6 text-center">
              <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto mb-2" />
              <p className="text-[#475569]">Extracting text...</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-[#475569] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!problemText.trim() || isAnalyzing}
              className="px-8 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF4500] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Problem Statement'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
