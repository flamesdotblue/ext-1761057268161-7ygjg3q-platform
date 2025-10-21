import { useEffect, useState } from 'react';
import { NotebookPen, Search, Sun, Moon } from 'lucide-react';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const id = setTimeout(() => onSearch?.(query), 250);
    return () => clearTimeout(id);
  }, [query, onSearch]);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-violet-500 to-rose-500 text-white">
            <NotebookPen size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Notes</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Capture thoughts. Stay organized.</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search notes..."
              className="w-64 pl-9 pr-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm outline-none focus:ring-2 ring-violet-500/60 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700"
            />
          </div>
        </div>

        <button
          className="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search notes..."
            className="w-full pl-9 pr-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm outline-none focus:ring-2 ring-violet-500/60 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700"
          />
        </div>
      </div>
    </header>
  );
}
