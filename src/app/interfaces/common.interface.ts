export type ItemType = "story" | "comment" | "job" | "poll" | "pollopt";

export type ItemTypes = Story | Comment | Ask | Job | Poll | PollOpt;

export interface Item {
    by : string,
    id : number,
    type: ItemType,
}

export interface Story extends Item {
    descendants : number,
    kids : number[],
    score : number,
    time : number,
    title : string,
    url : string,
}

export interface Comment extends Item {
    by : string,
    id : number,
    kids : number[],
    parent : number,
    text : string,
    time : number,
    type : ItemType
}

export interface Ask extends Item {
    descendants : number,
    kids : number[],
    score : number,
    text : string,
    time : number,
    title : string,
}

export interface Job extends Item {
    score : number,
    text : string,
    time : number,
    title : string,
    url : string,
}

export interface Poll extends Item {
    descendants : number,
    kids : number[],
    parts : number[],
    score : number,
    text : string,
    time : number,
    title : string,
}

export interface PollOpt extends Item {
    poll : number,
    score : number,
    text : string,
    time : number,
}
