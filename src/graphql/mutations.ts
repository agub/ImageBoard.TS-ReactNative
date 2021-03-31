/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createSaved = /* GraphQL */ `
  mutation CreateSaved(
    $input: CreateSavedInput!
    $condition: ModelSavedConditionInput
  ) {
    createSaved(input: $input, condition: $condition) {
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
export const updateSaved = /* GraphQL */ `
  mutation UpdateSaved(
    $input: UpdateSavedInput!
    $condition: ModelSavedConditionInput
  ) {
    updateSaved(input: $input, condition: $condition) {
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
export const deleteSaved = /* GraphQL */ `
  mutation DeleteSaved(
    $input: DeleteSavedInput!
    $condition: ModelSavedConditionInput
  ) {
    deleteSaved(input: $input, condition: $condition) {
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
