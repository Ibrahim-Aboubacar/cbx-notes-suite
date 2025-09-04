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

declare type TTag = {
    id: TUuid
    name: string
}

declare type TNoteType = "myNotes" | "public" | "sharedWithMe"