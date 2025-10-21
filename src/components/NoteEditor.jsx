import { useState } from 'react';
import { Plus } from 'lucide-react';

const COLORS = [
  { name: 'Yellow', value: 'amber', bg: 'bg-amber-100 dark:bg-amber-900/30', dot: 'bg-amber-400' },
  { name: 'Pink', value: 'pink', bg: 'bg-pink-100 dark:bg-pink-900/30', dot: 'bg-pink-400' },
  { name: 'Blue', value: 'sky', bg: 'bg-sky-100 dark:bg-sky-900/30', dot: 'bg-sky-400' },
  { name: 'Green', value: 'emerald', bg: 'bg-emerald-100 dark:bg-emerald-900/30', dot: 'bg-emerald-400' },
  { name: 'Purple', value: 'violet', bg: 'bg-violet-100 dark:bg-violet-900/30', dot: 'bg-violet-400' },
  { name: 'Gray', value: 'neutral', bg: 'bg-neutral-100 dark:bg-neutral-800', dot: 'bg-neutral-400' },
];

export default function NoteEditor({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(COLORS[0].value);

  const canAdd = title.trim().length > 0 || content.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd?.({ title, content, color });
    setTitle('');
    setContent('');
    setColor(COLORS[0].value);
  };

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="flex-1 rounded-md bg-neutral-100 dark:bg-neutral-800 px-3 py-2 outline-none focus:ring-2 ring-violet-500/60 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border border-neutral-200 dark:border-neutral-700 ring-offset-1 ${color === c.value ? 'ring-2 ring-violet-500/70' : ''}`}
                  style={{ background: 'transparent' }}
                >
                  <span className={`block w-4 h-4 rounded-full mx-auto ${c.dot}`} />
                </button>
              ))}
            </div>
            <button
              onClick={handleAdd}
              disabled={!canAdd}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} /> Add Note
            </button>
          </div>
        </div>
        <div className="mt-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            rows={3}
            className="w-full rounded-md bg-neutral-100 dark:bg-neutral-800 px-3 py-2 outline-none focus:ring-2 ring-violet-500/60 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
