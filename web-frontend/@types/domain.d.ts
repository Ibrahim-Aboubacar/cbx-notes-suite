declare type TUser = {
    id: TUuid
    pseudo: string
    email: string
}

declare type TUuid = string;

declare type TNote = {
    id: TUuid
    title: string
    content: string;
    isPublic: boolean
    tags: string[]
    sharedWith: string[]
    createdAt: string
    updatedAt: string
}

declare type TBasicNote = {
    id: string,
    title: string,
    content: string,
    tags: TTag[],
    user: TUser,
    isPublic: boolean,
    expirationDate: string,
    sharedWithCount: number,
    createdAt: string,
    updatedAt: string
}

declare type TDetailedNote = {
    id: string,
    title: string,
    content: string,
    tags: TTag[],
    sharedWith: TUser[],
    user: TUser,
    isPublic: boolean,
    expirationDate: string,
    createdAt: string,
    updatedAt: string
}

declare type TTag = {
    id: TUuid
    name: string
}


declare type TNoteType = "myNotes" | "public" | "sharedWithMe"