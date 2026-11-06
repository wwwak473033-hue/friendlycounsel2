import React from 'react';
import { X, Server, Terminal, Globe, CheckCircle } from 'lucide-react';

interface HostingInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingInstructionsModal: React.FC<HostingInstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-[#D5E2D7] relative my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B8370] hover:bg-[#EFF5F0] transition-colors"
          aria-label="Close guide modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] text-[#345139] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1F2F23]">Hosting & Local Setup Guide</h3>
            <p className="text-xs text-[#5D7562]">
              How to run this website locally and publish on basic shared web hosting
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#465A4B] max-h-[65vh] overflow-y-auto pr-2">
          {/* Section 1: Running Locally */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E1ECE3]">
            <h4 className="font-bold text-[#233527] text-sm flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-[#527357]" />
              1. Running Locally on Your Computer
            </h4>
            <p className="mb-2">Open your terminal or command prompt inside the project folder:</p>
            <div className="bg-[#1F2C22] text-[#D8E6DB] font-mono p-3 rounded-xl text-xs space-y-1">
              <p># Install dependencies</p>
              <p className="text-white">npm install</p>
              <p className="pt-1"># Start the local development preview</p>
              <p className="text-[#9FE2AB]">npm run dev</p>
            </div>
            <p className="mt-2 text-[11px] text-[#69816E]">
              Visit <strong>http://localhost:3000</strong> in your browser to view your website.
            </p>
          </div>

          {/* Section 2: Building for Shared Web Hosting */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E1ECE3]">
            <h4 className="font-bold text-[#233527] text-sm flex items-center gap-2 mb-2">
              <Server className="w-4 h-4 text-[#527357]" />
              2. Publishing to Basic Web Hosting (cPanel / Hostinger / Namecheap)
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-[#405645]">
              <li>
                In your project terminal, create the production build by running:
                <code className="block mt-1 bg-[#1F2C22] text-[#9FE2AB] font-mono p-2 rounded-lg text-xs">
                  npm run build
                </code>
              </li>
              <li>
                This will generate a ready-to-publish <code className="font-bold">/dist</code> folder
                containing pure static HTML, CSS, JavaScript, and optimized images.
              </li>
              <li>
                Log into your <strong>cPanel</strong>, go to <strong>File Manager</strong> &gt;{' '}
                <strong>public_html</strong>.
              </li>
              <li>
                Upload all files and folders located inside the <code className="font-bold">dist/</code>{' '}
                folder directly into <code className="font-bold">public_html</code>.
              </li>
              <li>
                Your website is now live on your domain (e.g. <code>yourname.com</code>)!
              </li>
            </ol>
          </div>

          {/* Section 3: Free 1-Click Hosting */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E1ECE3]">
            <h4 className="font-bold text-[#233527] text-sm flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-[#527357]" />
              3. Free 1-Click Modern Hosting (Netlify / Vercel / GitHub Pages)
            </h4>
            <p className="text-xs text-[#4B6250]">
              You can also drag and drop the built <code>dist/</code> folder into <strong>Netlify Drop</strong> (app.netlify.com/drop) or connect your GitHub repository to Vercel for instant SSL and global CDN hosting with zero server maintenance.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EEF4EF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
