import React, { useState, useEffect, useCallback } from 'react';

interface ITags {
    setTags: (tags: string[]) => void;
    tags: string[];
}

const Tags: React.FC<ITags> = ({ setTags, tags }) => {
  const [value, setValue] = useState('');
  const renderTags = useCallback(() => tags.map((tagText) => <div>{tagText}</div>), [tags]);
  const onSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setTags([...tags, value]);
  }, [setTags, value, tags]);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const innerValue = event.target.value !== undefined
                    || event.target.value !== null
      ? event.target.value : '';
    setValue(innerValue);
  }, [setValue]);
  return (
    <form onSubmit={onSubmit}>
      {renderTags()}
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

export default Tags;
