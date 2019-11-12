Create a custom conversational UI in react in less than 5 minutes.
Spice up your forms to get user input in an exiting way, impress your friends or create something truly special.

## Quick start

Installing this package with npm or yarn.

```bash
npm i react-simple-conversation
```

```bash
yarn add react-simple-conversation
```

To create a conversational UI use the Conversation wrapper component. Then wrap any component in the ChatableWrapper. Components will then appear in the order from top to bottom.

```javascript
import React from 'react'
import {Conversation, ChatableWrapper} from 'react-simple-conversation'

function MyConversation() {

return(
  <Conversation>

    <ChatableWrapper typingTime={500}>
      <div>This component will display after 500ms typing time, and then auto-continue</div>
    </ChatableWrapper>

    <ChatableWrapper typingTime={500}>
      {
        (next)=>{<button onClick={next}>this custom coversation<button>}
      }
    </ChatableWrapper>

    <ChatableWrapper promise={new Promise(r=>setTimeout(r, 500))}>
        <div>this custom component will display after the promise is resolved</div>
    </ChatableWrapper>

  </Conversation>
)
}
```

React components inside ChatableWrapper will autocontinue to next.

Functions inside ChatableWrapper will continue when next is called.
