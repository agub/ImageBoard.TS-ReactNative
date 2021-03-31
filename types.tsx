import { StackNavigationProp } from "@react-navigation/stack";
import { GetPostQuery } from "./src/API";

export type RootStackParamList = {
	Root: undefined;
	NotFound: undefined;
	UserEdit: undefined;
	Content: {
		data: GetPostQuery | undefined;
		isUserSaved: boolean;
	};
};
export type ContentRouteParamList = {
	params: {
		data: GetPostQuery;
	};
};

export type DrawerParamList = {
	Menu: undefined;
	// Edit: undefined;
};

export type BottomTabParamList = {
	Home: undefined;
	Posts: undefined;
	Lists: undefined;
	Profile: undefined;
};

export type TabOneParamList = {
	TabOneScreen: undefined;
};

export type TabTwoParamList = {
	TabTwoScreen: undefined;
};

export type UserData = {
	createdAt: string;
	id: string;
	imageUri: string;
	name: string;
	posts: object;
};

export type PostData = {
	__typename: "Post";
	id: string;
	title: string;
	content: string;
	userID: string;
	imageUri?: string | null;
	vote: number;
	user?: {
		__typename: "User";
		id: string;
		name: string;
		imageUri?: string | null;
		status?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
	comments?: {
		__typename: "ModelCommentConnection";
		nextToken?: string | null;
	} | null;
	saved?: {
		__typename: "ModelSavedConnection";
		items?: Array<{
			__typename: "Saved";
			id: string;
			postID: string;
			userID: string;
			createdAt: string;
			updatedAt: string;
		} | null> | null;
		nextToken?: string | null;
	} | null;
	createdAt: string;
	updatedAt: string;
};

export type CommentData = {
	__typename: "Comment";
	id: string;
	postID: string;
	createdAt: string;
	content: string;
	vote: number;
	userID: string;
	title: string;
	updatedAt: string;
};

export type ProfileTabParamList = {
	Users: {
		navigation: StackNavigationProp<RootStackParamList, "Root">;
	};
	Liked: undefined;
};
