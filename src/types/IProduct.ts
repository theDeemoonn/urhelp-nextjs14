export interface IProduct {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    date: string;
    reviews: IReview[];
    userId: string;
    comments: IComment[];
    completed: boolean;
    whoCompleted: string;
    }

export interface IReview {
    name: string;
    rating: number;
    comment: string;
    user: string;
    }

export interface IComment {
    name: string;
    comment: string;
    user: string;
    time: string;
    }