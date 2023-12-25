export interface IProduct {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    date: string;
    reviews: IReview[];
    userId: string;
    }

export interface IReview {
    name: string;
    rating: number;
    comment: string;
    user: string;
    }