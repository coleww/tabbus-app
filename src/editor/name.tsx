import React, { useState, useCallback } from 'react';

// TODO: create input component, dedupe with tuning.tsx

type NameProps = {
  name: string;
  setName: (name: string) => void;
};

export function Name({ name, setName }: NameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setEditedName(e.currentTarget.value as string);
    },
    [setEditedName]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const editedString = e.currentTarget.value as string;
        setName(editedString);
        setIsEditing(false);
      }
    },
    [setName]
  );

  return (
    <div data-id="name">
      {isEditing ? (
        <input
          className=""
          type="text"
          value={editedName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          className=""
          onClick={() => {
            setIsEditing(true);
            setEditedName(name);
          }}
        >
          {name}
        </button>
      )}
    </div>
  );
}
