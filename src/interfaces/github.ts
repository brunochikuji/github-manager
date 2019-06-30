export interface SearchUserParams {
    q?: string;
    sort?: string;
    order?: string;
    page?: number;
}

export interface SearchUsersResult {
    total_count: number;
    incomplete_results: boolean;
    items: Array<UserSearch>;
    nextPage?: number;
    previousPage?: number;
    lastPage?: number;
}

export interface UserSearch {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;

    url: string;
    html_url: string;
    followers_url: string;

    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    received_events_url: string;
    type: string;
    score: number;
}

export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    received_events_url: string;
    type: 'Organization' | 'User';
    score: number;
    events_url: string;
    site_admin: false;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    plan?: {
        name: string,
        space: number,
        collaborators: number,
        private_repos: number
    };
}
