export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// The three ways to filter the list
export type Filter = 'all' | 'active' | 'completed';
