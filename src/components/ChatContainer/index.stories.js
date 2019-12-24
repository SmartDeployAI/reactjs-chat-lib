import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, number } from '@storybook/addon-knobs';

import { ChatContainer } from './index';

let stories = storiesOf('ChatContainer', module);
let props = {
  agentProfile: {
    name: 'Badewa Kayode',
    id: 1,
    avatar:
      'https://media.licdn.com/dms/image/C4D03AQESwPQ8jCundg/profile-displayphoto-shrink_800_800/0?e=1571270400&v=beta&t=8AofQ4pIflhHnVsCnIydapJqMSdfkvfnpTbrJFy4bPE',
    isOnline: true,
    subtitle: `Admin to YipCart`,
  },
  senderProfile: {
    name: 'Anifowoshe Gbenga',
    id: 2,
    avatar:
      'https://media.licdn.com/dms/image/C5603AQHnNE6t21CVkg/profile-displayphoto-shrink_100_100/0?e=1571270400&v=beta&t=xVCYMYT-NDlep3QBMewOOQ7LhjgpgsxyfCdPCKtihZQ',
  },
  messages: [
    {
      id: 1,
      type: 'text',
      text: 'Hey man!!! whats sup Gee',
      createdAt: new Date(),
      user: {
        id: 2,
      },
    },
    {
      id: 2,
      type: 'emoji',
      text: '😜😜',
      createdAt: new Date(),
      user: {
        id: 1,
      },
    },
    {
      id: 3,
      type: 'files',
      createdAt: new Date(),
      text: 'See this images I found on the net man',
      files: [
        {
          type: 'image/jpeg',
          url:
            'https://www.linkedin.com/dms/C5606AQHnrG1lzyn1bQ/messaging-attachmentFile/0?m=AQL7SqYWlc3IOAAAAWyvTxt3LE3qINgtyeTbdrTGHdKbF807l2LoCBYMZQ&ne=1&v=beta&t=cASGzDFbhFRAUxw1SuQR3H7NTgGiqUifNS7QBLvewPs#S6569236250342105088_500',
        },
        {
          type: 'image/png',
          url:
            'https://www.linkedin.com/dms/C5606AQGljroNDCzyDw/messaging-attachmentFile/0?m=AQLwBSn-pFpTZgAAAWyvW7bqjX5T12edU7ctAuBeGKeobt-4r6TrkAkPOw&ne=1&v=beta&t=cwKltgOPVG-vper0L_NKBQCe5sA3R9Y-0D5EUHitTME#S6569236169991827457_500',
        },
      ],
      user: {
        id: 2,
      },
    },
  ],
};

stories.add('without windows', () => (
  <ChatContainer hashKey={text('hash key', '')} />
));

stories.add(
  'with initial window',
  () => {
    function Parent({ children }) {
      let [state, setState] = useState({});
      return children(state, setState);
    }

    return (
      // <Parent>
      //   {(state, setState) => (
      <ChatContainer
        onRequestClose={() => alert('Oya ooo')}
        currentAgentId={text('current chat id', 'a')}
        rightHorizontalOverlaySpacing={number(
          'right horizontal overlay spacing',
          200,
        )}
        hashKey={text('hash key', '')}>
        {windows =>
          windows.map(window => {
            let key = window.id;
            let Window = window.component;

            return (
              <Window
                onSend={messages => console.log('gbenga', messages)}
                key={key}
                // filesUploadProps={state.fileUploadProps}
                onProfileClick={id => console.log('The Id is ', id)}
                windowDidMount={data => console.log('mount', data)}
                windowWillUnmount={data => console.log('unmount', data)}
                windowDidUpdate={data => console.log('update', data)}
                // onUploadFile={({ id, file }) => {
                //   setState({
                //     fileUploadProps: {
                //       [id]: {
                //         isUploading: true,
                //         progress: 0,
                //         done: false,
                //         error: false,
                //       },
                //     },
                //   });
                // }}
                onRetryFileUpload={file => console.log('retry', file)}
                agentProfile={props.agentProfile}
                senderProfile={props.senderProfile}
                messages={object('messages', props.messages)}
              />
            );
          })
        }
      </ChatContainer>
      //   )}
      // </Parent>
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  },
);

stories.add('with windows', () => (
  <ChatContainer
    currentAgentId={text('current chat id', '')}
    hashKey={text('hash key', '')}>
    {windows =>
      windows.map(window => {
        let key = window.id;
        let Window = window.component;

        return <Window key={key} />;
      })
    }
  </ChatContainer>
));

stories.add('with request close function', () => (
  <ChatContainer
    onRequestClose={() => alert('Nah not closing me!!!')}
    currentAgentId={text('current chat id', '')}
    hashKey={text('hash key', '')}>
    {windows =>
      windows.map(window => {
        let key = window.id;
        let Window = window.component;

        return <Window key={key} />;
      })
    }
  </ChatContainer>
));
