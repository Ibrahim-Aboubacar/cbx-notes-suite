declare type TUser = {
    id: string
    pseudo: string
    email: string
}

declare type TNote = {
    id: string
    title: string
    content: string;
    isPublic: boolean
    tags: string[]
    sharedWith: string[]
    createdAt: string
    updatedAt: string
}

declare type TTag = {
    id: string
    name: string
}

declare type TNoteType = "myNotes" | "public" | "sharedWithMe"