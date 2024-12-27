export interface Log {
  id: string;
  description: string;
  studentId: string;
  clockInTime: string;
  logWeek: number;
  logDay: string;
  createdAt: string;
  }
  
  export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    // Add other relevant fields
  }
  
  export interface DataContextState {
    logs: {
      items: Log[];
      isLoading: boolean;
      error: string | null;
    };
    reviews: {
      items: Review[];
      isLoading: boolean;
      error: string | null;
    };
  }