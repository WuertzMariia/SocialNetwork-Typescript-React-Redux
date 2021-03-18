import React from 'react';
import profileReducer, {actions, UsersType} from "./profileReducer";
import {AppStateType} from "./redux_store";


it('new post should be added', () => {
    // 1. test data
   let action = actions.actioncreatorAddPost("new post");
   let state = {

       posts: [
           { post: "Hello", id:1 },
           { post: "how are you", id:2 },
           { post: "i am fine", id:3 },
           { post: "i am fine", id:3 },
           { post: "i am fine", id:4 },
           { post: "i am fine", id:4 },
           { post: "i am fine", id:5 }
       ],
       profile: null,
       isFetching: false,
       status: 'My dream is to become a good Frontend Developer'
   }
   // 2. action
    let newState = profileReducer(state, action);

   // 3. expectation
    expect(newState.posts.length).toBe(8);
})

it('to delete', () => {
    let action = actions.deletePost(1);
    let state = {

        posts: [
            { post: "Hello", id:1 },
            { post: "how are you", id:2 },
            { post: "i am fine", id:3 },
            { post: "i am fine", id:3 },
            { post: "i am fine", id:4 },
            { post: "i am fine", id:4 },
            { post: "i am fine", id:5 }
        ],
        profile: null,
        isFetching: false,
        status: 'My dream is to become a good Frontend Developer'
    }
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(6);
})