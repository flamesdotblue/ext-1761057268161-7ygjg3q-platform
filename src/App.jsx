import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import NoteEditor from './components/NoteEditor.jsx';
import NoteList from './components/NoteList.jsx';

const STORAGE_KEY = 'notes-app-v1';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setNotes(parsed);
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, [notes]);

  const addNote = (note) => {
    const now = Date.now();
    const newNote = {
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      title: note.title.trim(),
      content: note.content.trim(),
      color: note.color,
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
    setNotes((n) => [newNote, ...n]);
  };

  const updateNote = (updated) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...n, ...updated, updatedAt: Date.now() } : n))
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev
        .map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n))
    );
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  const pinned = useMemo(
    () => filtered.filter((n) => n.pinned).sort((a, b) => b.updatedAt - a.updatedAt),
    [filtered]
  );
  const others = useMemo(
    () => filtered.filter((n) => !n.pinned).sort((a, b) => b.updatedAt - a.updatedAt),
    [filtered]
  );

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors">
      <Header onSearch={setQuery} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <section className="mt-6">
          <NoteEditor onAdd={addNote} />
        </section>

        <section className="mt-10 space-y-10">
          {pinned.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Pinned</h2>
              <NoteList notes={pinned} onUpdate={updateNote} onDelete={deleteNote} onTogglePin={togglePin} />
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Notes</h2>
            <NoteList notes={others} onUpdate={updateNote} onDelete={deleteNote} onTogglePin={togglePin} />
            {others.length === 0 && pinned.length === 0 && (
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">No notes yet. Add your first note above.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
