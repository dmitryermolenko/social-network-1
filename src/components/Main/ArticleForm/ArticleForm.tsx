/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import SmoothCollapse from 'react-smooth-collapse';
import { ArticleButton, ArticleStyledForm, InputName, InputText } from './styles';
import imgButtonMore from './img/BTN more.svg';
import { ArticleName, ButtonMore } from '../../../common/styledComponents';
import createPost from './createPost';
import Tags from '../../../common/tags';
import { IUser } from '../../../types/user';
import LoadingBlock from '../../../common/loadingBlock';

interface IArticleForm {
  changeOpen: () => void;
  setLoading: (state: boolean) => void;
  isOpen: boolean;
  loading: boolean;
  user: IUser | null;
}

const ArticleForm: React.FC<IArticleForm> = ({
  changeOpen,
  setLoading,
  loading,
  isOpen,
  user,
}): JSX.Element => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <Formik
      initialValues={{
        articleName: '',
        articleText: '',
      }}
      onSubmit={async (values, actions) => {
        alert(`Sending article: ${values.articleName} with text: ${values.articleText}`);
        setLoading(true);
        try {
          await createPost({ title: values.articleName, text: values.articleText, tags, user });
        } catch (err) {
          alert(err);
        }
        setLoading(false);
        actions.resetForm();
      }}
    >
      <SmoothCollapse expanded={isOpen} heightTransition="1s">
        <ArticleStyledForm>
          <ArticleName>Название статьи</ArticleName>
          <Field name="articleName" as={InputName} autoComplete="off" />
          <ArticleName>Текст</ArticleName>
          <Field name="articleText" rows="12" as={InputText} />
          <ArticleName>Теги</ArticleName>
          <Tags
            tags={tags}
            setTags={(_tags) => setTags(_tags.filter((tag) => tag !== ''))}
            deleteTag={(index) => {
              setTags((_tags) => _tags.filter((item, _index) => _index !== index));
            }}
          />
          {loading && <LoadingBlock />}
          <ArticleButton className="articleButton" type="submit">
            Опубликовать
          </ArticleButton>
          <ButtonMore img={imgButtonMore} onClick={changeOpen} />
        </ArticleStyledForm>
      </SmoothCollapse>
    </Formik>
  );
};

export default ArticleForm;
