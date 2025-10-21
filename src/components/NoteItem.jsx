import { useMemo, useState } from 'react';
import { Pin, PinOff, Edit, Trash2, Check, X } from 'lucide-react';

const colorMap = {
  amber: {
    ring: 'ring-amber-300/60 dark:ring-amber-500/30',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  pink: {
    ring: 'ring-pink-300/60 dark:ring-pink-500/30',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
  },
  sky: {
    ring: 'ring-sky-300/60 dark:ring-sky-500/30',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
  },
  emerald: {
    ring: 'ring-emerald-300/60 dark:ring-emerald-500/30',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  violet: {
    ring: 'ring-violet-300/60 dark:ring-violet-500/30',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
  },
  neutral: {
    ring: 'ring-neutral-300/60 dark:ring-neutral-600/30',
    bg: 'bg-neutral-50 dark:bg-neutral-900/60',
  },
};

function timeAgo(ts) {
  const delta = Math.floor((Date.now() - ts) / 1000);
  if (delta < 60) return 'just now';
  if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
  if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
  const d = new Date(ts);
  return d.toLocaleDateString();
}

export default function NoteItem({ note, onUpdate, onDelete, onTogglePin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const colors = colorMap[note.color] || colorMap.neutral;
  const containerClass = useMemo(() => `rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm ring-2 ${colors.ring}`, [colors]);

  const save = () => {
    const t = title.trim();
    const c = content.trim();
    onUpdate?.({ ...note, title: t, content: c });
    setIsEditing(false);
  };

  const cancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className={`${containerClass} overflow-hidden`}>\n      <div className={`h-1.5 ${colors.bg}`} />
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-base font-semibold bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 outline-none"
              />
            ) : (
              <h3 className="text-base font-semibold break-words">{note.title || 'Untitled'}</h3>
            )}
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="mt-2 w-full text-sm leading-relaxed bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 outline-none resize-y"
              />
            ) : (
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap break-words">{note.content}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={onTogglePin}
              className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title={note.pinned ? 'Unpin' : 'Pin'}
            >
              {note.pinned ? <PinOff size={16} /> : <Pin size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>Updated {timeAgo(note.updatedAt)}</span>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={save}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Check size={14} /> Save
                </button>
                <button
                  onClick={cancel}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X size={14} /> Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={onDelete}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-500"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
