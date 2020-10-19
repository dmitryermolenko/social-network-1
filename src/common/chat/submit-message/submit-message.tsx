/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Formik, Field } from 'formik';
import addFileSrc from '../../../img/icons/add-file.svg';

import { WrapForm, TextWrap, Text, FileIcon, SubmitMessageButton } from './styles';

export default (): React.FunctionComponentElement<unknown> =>
  (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, actions): void => {
        alert(`Sending ${values.message}`);
        actions.resetForm();
      }}
    >
      <WrapForm>
        <TextWrap>
          <Field
            placeholder="Напишите что-нибудь..."
            name="message"
            component={Text}
            autoComplete="off"
          />
          <FileIcon src={addFileSrc} />
        </TextWrap>
        <SubmitMessageButton />
      </WrapForm>
    </Formik>
  );
