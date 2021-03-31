/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      imageUri
      status
      posts {
        items {
          id
          title
          content
          userID
          imageUri
          vote
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      imageUri
      status
      posts {
        items {
          id
          title
          content
          userID
          imageUri
          vote
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      imageUri
      status
      posts {
        items {
          id
          title
          content
          userID
          imageUri
          vote
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      content
      userID
      imageUri
      vote
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          createdAt
          title
          content
          vote
          userID
          updatedAt
        }
        nextToken
      }
      saved {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      content
      userID
      imageUri
      vote
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          createdAt
          title
          content
          vote
          userID
          updatedAt
        }
        nextToken
      }
      saved {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      content
      userID
      imageUri
      vote
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          createdAt
          title
          content
          vote
          userID
          updatedAt
        }
        nextToken
      }
      saved {
        items {
          id
          postID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      createdAt
      title
      content
      vote
      post {
        id
        title
        content
        userID
        imageUri
        vote
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        saved {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      createdAt
      title
      content
      vote
      post {
        id
        title
        content
        userID
        imageUri
        vote
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        saved {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      createdAt
      title
      content
      vote
      post {
        id
        title
        content
        userID
        imageUri
        vote
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        saved {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onCreateSaved = /* GraphQL */ `
  subscription OnCreateSaved {
    onCreateSaved {
      id
      postID
      post {
        id
        title
        content
        userID
        imageUri
        vote
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        saved {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSaved = /* GraphQL */ `
  subscription OnUpdateSaved {
    onUpdateSaved {
      id
      postID
      post {
        id
        title
        content
        userID
        imageUri
        vote
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        saved {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSaved = /* GraphQL */ `
  subscription OnDeleteSaved {
    onDeleteSaved {
      id
      postID
      post {
        id
        title
        content
        userID
        imageUri
        vote
        user {
          id
          name
          imageUri
          status
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        saved {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        imageUri
        status
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
