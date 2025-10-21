import NoteItem from './NoteItem.jsx';

export default function NoteList({ notes, onUpdate, onDelete, onTogglePin }) {
  if (!notes || notes.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={() => onDelete?.(note.id)}
          onTogglePin={() => onTogglePin?.(note.id)}
        />
      ))}
    </div>
  );
}
