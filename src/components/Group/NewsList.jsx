import React from 'react';
import NewsItem from './NewsItem';

export default function NewsList(props) {
  const { data } = props;
  const {
    data: { news },
  } = data;
  return news.map((item) =>
    <NewsItem key={item.id} item={item} />);
}
