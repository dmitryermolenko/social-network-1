import React, { useState } from 'react';
import Tags from '../common/tags';

export default {
  title: 'Tags',
  component: Tags,
};

export const TagsComponent: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  return <Tags tags={tags} setTags={(_tags) => { setTags(_tags); }} />;
};
