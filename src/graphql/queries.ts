/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
	query GetUser($id: ID!) {
		getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
	query ListUsers(
		$filter: ModelUserFilterInput
		$limit: Int
		$nextToken: String
	) {
		listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
			nextToken
		}
	}
`;
export const getPost = /* GraphQL */ `
	query GetPost($id: ID!) {
		getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
	query ListPosts(
		$filter: ModelPostFilterInput
		$limit: Int
		$nextToken: String
	) {
		listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
			nextToken
		}
	}
`;
export const getComment = /* GraphQL */ `
	query GetComment($id: ID!) {
		getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
	query ListComments(
		$filter: ModelCommentFilterInput
		$limit: Int
		$nextToken: String
	) {
		listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
					createdAt
					updatedAt
				}
				userID
				user {
					id
					name
					imageUri
					status
					createdAt
					updatedAt
				}
				updatedAt
			}
			nextToken
		}
	}
`;
export const getSaved = /* GraphQL */ `
	query GetSaved($id: ID!) {
		getSaved(id: $id) {
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
export const listSaveds = /* GraphQL */ `
	query ListSaveds(
		$filter: ModelSavedFilterInput
		$limit: Int
		$nextToken: String
	) {
		listSaveds(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				postID
				post {
					id
					title
					content
					userID
					imageUri
					vote
					createdAt
					updatedAt
				}
				userID
				user {
					id
					name
					imageUri
					status
					createdAt
					updatedAt
				}
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
