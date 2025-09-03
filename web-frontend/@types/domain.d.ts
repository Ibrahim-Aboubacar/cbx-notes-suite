declare type TNote = {
    id: string
    title: string
    content: string;
    tags: string[]
    sharedWith: string[]
    createdAt: string
    updatedAt: string
}

declare type TNoteType = "myNotes" | "public" | "sharedWithMe"