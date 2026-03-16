export declare const ProjectStatus: {
    readonly DRAFT: "DRAFT";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
