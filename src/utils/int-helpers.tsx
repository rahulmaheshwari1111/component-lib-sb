import { FormattedMessage } from 'react-intl';

import React from 'react'
import { ReactNode } from 'react'

export const getDefaultMessage = (messageId: string) => {
  return process.env.NODE_ENV === 'development'
    ? `Error: missing translation for ${messageId}`
    :messageId   //to be fix
}

export const formattedMessageHelper = (
  messageId?: string,
  altText?: string | JSX.Element | ReactNode,
  values?: Record<string, React.ReactNode>
) => {
  return messageId ? (
    <FormattedMessage
      id={messageId}
      defaultMessage={getDefaultMessage(messageId)}
      values={values}
    />
  ) : (
    altText
  )
}
