export const getUserWithSavedPost = /* GraphQL */ `
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
					saved {
						items {
							postID
						}
					}
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
