export interface AuthUser {
    uid: string;
    email: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
