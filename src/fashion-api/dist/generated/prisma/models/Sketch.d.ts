import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SketchModel = runtime.Types.Result.DefaultSelection<Prisma.$SketchPayload>;
export type AggregateSketch = {
    _count: SketchCountAggregateOutputType | null;
    _min: SketchMinAggregateOutputType | null;
    _max: SketchMaxAggregateOutputType | null;
};
export type SketchMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    imageUrl: string | null;
    notes: string | null;
    projectId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SketchMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    imageUrl: string | null;
    notes: string | null;
    projectId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SketchCountAggregateOutputType = {
    id: number;
    name: number;
    imageUrl: number;
    notes: number;
    projectId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SketchMinAggregateInputType = {
    id?: true;
    name?: true;
    imageUrl?: true;
    notes?: true;
    projectId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SketchMaxAggregateInputType = {
    id?: true;
    name?: true;
    imageUrl?: true;
    notes?: true;
    projectId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SketchCountAggregateInputType = {
    id?: true;
    name?: true;
    imageUrl?: true;
    notes?: true;
    projectId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SketchAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SketchWhereInput;
    orderBy?: Prisma.SketchOrderByWithRelationInput | Prisma.SketchOrderByWithRelationInput[];
    cursor?: Prisma.SketchWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SketchCountAggregateInputType;
    _min?: SketchMinAggregateInputType;
    _max?: SketchMaxAggregateInputType;
};
export type GetSketchAggregateType<T extends SketchAggregateArgs> = {
    [P in keyof T & keyof AggregateSketch]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSketch[P]> : Prisma.GetScalarType<T[P], AggregateSketch[P]>;
};
export type SketchGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SketchWhereInput;
    orderBy?: Prisma.SketchOrderByWithAggregationInput | Prisma.SketchOrderByWithAggregationInput[];
    by: Prisma.SketchScalarFieldEnum[] | Prisma.SketchScalarFieldEnum;
    having?: Prisma.SketchScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SketchCountAggregateInputType | true;
    _min?: SketchMinAggregateInputType;
    _max?: SketchMaxAggregateInputType;
};
export type SketchGroupByOutputType = {
    id: string;
    name: string;
    imageUrl: string | null;
    notes: string | null;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SketchCountAggregateOutputType | null;
    _min: SketchMinAggregateOutputType | null;
    _max: SketchMaxAggregateOutputType | null;
};
type GetSketchGroupByPayload<T extends SketchGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SketchGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SketchGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SketchGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SketchGroupByOutputType[P]>;
}>>;
export type SketchWhereInput = {
    AND?: Prisma.SketchWhereInput | Prisma.SketchWhereInput[];
    OR?: Prisma.SketchWhereInput[];
    NOT?: Prisma.SketchWhereInput | Prisma.SketchWhereInput[];
    id?: Prisma.StringFilter<"Sketch"> | string;
    name?: Prisma.StringFilter<"Sketch"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Sketch"> | string | null;
    notes?: Prisma.StringNullableFilter<"Sketch"> | string | null;
    projectId?: Prisma.StringFilter<"Sketch"> | string;
    createdAt?: Prisma.DateTimeFilter<"Sketch"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Sketch"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
};
export type SketchOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
};
export type SketchWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SketchWhereInput | Prisma.SketchWhereInput[];
    OR?: Prisma.SketchWhereInput[];
    NOT?: Prisma.SketchWhereInput | Prisma.SketchWhereInput[];
    name?: Prisma.StringFilter<"Sketch"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Sketch"> | string | null;
    notes?: Prisma.StringNullableFilter<"Sketch"> | string | null;
    projectId?: Prisma.StringFilter<"Sketch"> | string;
    createdAt?: Prisma.DateTimeFilter<"Sketch"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Sketch"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
}, "id">;
export type SketchOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SketchCountOrderByAggregateInput;
    _max?: Prisma.SketchMaxOrderByAggregateInput;
    _min?: Prisma.SketchMinOrderByAggregateInput;
};
export type SketchScalarWhereWithAggregatesInput = {
    AND?: Prisma.SketchScalarWhereWithAggregatesInput | Prisma.SketchScalarWhereWithAggregatesInput[];
    OR?: Prisma.SketchScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SketchScalarWhereWithAggregatesInput | Prisma.SketchScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Sketch"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Sketch"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Sketch"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Sketch"> | string | null;
    projectId?: Prisma.StringWithAggregatesFilter<"Sketch"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Sketch"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Sketch"> | Date | string;
};
export type SketchCreateInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutSketchesInput;
};
export type SketchUncheckedCreateInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    notes?: string | null;
    projectId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SketchUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutSketchesNestedInput;
};
export type SketchUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SketchCreateManyInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    notes?: string | null;
    projectId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SketchUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SketchUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SketchListRelationFilter = {
    every?: Prisma.SketchWhereInput;
    some?: Prisma.SketchWhereInput;
    none?: Prisma.SketchWhereInput;
};
export type SketchOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SketchCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SketchMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SketchMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SketchCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.SketchCreateWithoutProjectInput, Prisma.SketchUncheckedCreateWithoutProjectInput> | Prisma.SketchCreateWithoutProjectInput[] | Prisma.SketchUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SketchCreateOrConnectWithoutProjectInput | Prisma.SketchCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.SketchCreateManyProjectInputEnvelope;
    connect?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
};
export type SketchUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.SketchCreateWithoutProjectInput, Prisma.SketchUncheckedCreateWithoutProjectInput> | Prisma.SketchCreateWithoutProjectInput[] | Prisma.SketchUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SketchCreateOrConnectWithoutProjectInput | Prisma.SketchCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.SketchCreateManyProjectInputEnvelope;
    connect?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
};
export type SketchUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.SketchCreateWithoutProjectInput, Prisma.SketchUncheckedCreateWithoutProjectInput> | Prisma.SketchCreateWithoutProjectInput[] | Prisma.SketchUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SketchCreateOrConnectWithoutProjectInput | Prisma.SketchCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.SketchUpsertWithWhereUniqueWithoutProjectInput | Prisma.SketchUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.SketchCreateManyProjectInputEnvelope;
    set?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    disconnect?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    delete?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    connect?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    update?: Prisma.SketchUpdateWithWhereUniqueWithoutProjectInput | Prisma.SketchUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.SketchUpdateManyWithWhereWithoutProjectInput | Prisma.SketchUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.SketchScalarWhereInput | Prisma.SketchScalarWhereInput[];
};
export type SketchUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.SketchCreateWithoutProjectInput, Prisma.SketchUncheckedCreateWithoutProjectInput> | Prisma.SketchCreateWithoutProjectInput[] | Prisma.SketchUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.SketchCreateOrConnectWithoutProjectInput | Prisma.SketchCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.SketchUpsertWithWhereUniqueWithoutProjectInput | Prisma.SketchUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.SketchCreateManyProjectInputEnvelope;
    set?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    disconnect?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    delete?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    connect?: Prisma.SketchWhereUniqueInput | Prisma.SketchWhereUniqueInput[];
    update?: Prisma.SketchUpdateWithWhereUniqueWithoutProjectInput | Prisma.SketchUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.SketchUpdateManyWithWhereWithoutProjectInput | Prisma.SketchUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.SketchScalarWhereInput | Prisma.SketchScalarWhereInput[];
};
export type SketchCreateWithoutProjectInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SketchUncheckedCreateWithoutProjectInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SketchCreateOrConnectWithoutProjectInput = {
    where: Prisma.SketchWhereUniqueInput;
    create: Prisma.XOR<Prisma.SketchCreateWithoutProjectInput, Prisma.SketchUncheckedCreateWithoutProjectInput>;
};
export type SketchCreateManyProjectInputEnvelope = {
    data: Prisma.SketchCreateManyProjectInput | Prisma.SketchCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type SketchUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.SketchWhereUniqueInput;
    update: Prisma.XOR<Prisma.SketchUpdateWithoutProjectInput, Prisma.SketchUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.SketchCreateWithoutProjectInput, Prisma.SketchUncheckedCreateWithoutProjectInput>;
};
export type SketchUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.SketchWhereUniqueInput;
    data: Prisma.XOR<Prisma.SketchUpdateWithoutProjectInput, Prisma.SketchUncheckedUpdateWithoutProjectInput>;
};
export type SketchUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.SketchScalarWhereInput;
    data: Prisma.XOR<Prisma.SketchUpdateManyMutationInput, Prisma.SketchUncheckedUpdateManyWithoutProjectInput>;
};
export type SketchScalarWhereInput = {
    AND?: Prisma.SketchScalarWhereInput | Prisma.SketchScalarWhereInput[];
    OR?: Prisma.SketchScalarWhereInput[];
    NOT?: Prisma.SketchScalarWhereInput | Prisma.SketchScalarWhereInput[];
    id?: Prisma.StringFilter<"Sketch"> | string;
    name?: Prisma.StringFilter<"Sketch"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Sketch"> | string | null;
    notes?: Prisma.StringNullableFilter<"Sketch"> | string | null;
    projectId?: Prisma.StringFilter<"Sketch"> | string;
    createdAt?: Prisma.DateTimeFilter<"Sketch"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Sketch"> | Date | string;
};
export type SketchCreateManyProjectInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SketchUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SketchUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SketchUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SketchSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    projectId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sketch"]>;
export type SketchSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    projectId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sketch"]>;
export type SketchSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    projectId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sketch"]>;
export type SketchSelectScalar = {
    id?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    projectId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SketchOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "imageUrl" | "notes" | "projectId" | "createdAt" | "updatedAt", ExtArgs["result"]["sketch"]>;
export type SketchInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type SketchIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type SketchIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type $SketchPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sketch";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        imageUrl: string | null;
        notes: string | null;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["sketch"]>;
    composites: {};
};
export type SketchGetPayload<S extends boolean | null | undefined | SketchDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SketchPayload, S>;
export type SketchCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SketchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SketchCountAggregateInputType | true;
};
export interface SketchDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sketch'];
        meta: {
            name: 'Sketch';
        };
    };
    findUnique<T extends SketchFindUniqueArgs>(args: Prisma.SelectSubset<T, SketchFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SketchFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SketchFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SketchFindFirstArgs>(args?: Prisma.SelectSubset<T, SketchFindFirstArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SketchFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SketchFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SketchFindManyArgs>(args?: Prisma.SelectSubset<T, SketchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SketchCreateArgs>(args: Prisma.SelectSubset<T, SketchCreateArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SketchCreateManyArgs>(args?: Prisma.SelectSubset<T, SketchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SketchCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SketchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SketchDeleteArgs>(args: Prisma.SelectSubset<T, SketchDeleteArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SketchUpdateArgs>(args: Prisma.SelectSubset<T, SketchUpdateArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SketchDeleteManyArgs>(args?: Prisma.SelectSubset<T, SketchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SketchUpdateManyArgs>(args: Prisma.SelectSubset<T, SketchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SketchUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SketchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SketchUpsertArgs>(args: Prisma.SelectSubset<T, SketchUpsertArgs<ExtArgs>>): Prisma.Prisma__SketchClient<runtime.Types.Result.GetResult<Prisma.$SketchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SketchCountArgs>(args?: Prisma.Subset<T, SketchCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SketchCountAggregateOutputType> : number>;
    aggregate<T extends SketchAggregateArgs>(args: Prisma.Subset<T, SketchAggregateArgs>): Prisma.PrismaPromise<GetSketchAggregateType<T>>;
    groupBy<T extends SketchGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SketchGroupByArgs['orderBy'];
    } : {
        orderBy?: SketchGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SketchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSketchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SketchFieldRefs;
}
export interface Prisma__SketchClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SketchFieldRefs {
    readonly id: Prisma.FieldRef<"Sketch", 'String'>;
    readonly name: Prisma.FieldRef<"Sketch", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Sketch", 'String'>;
    readonly notes: Prisma.FieldRef<"Sketch", 'String'>;
    readonly projectId: Prisma.FieldRef<"Sketch", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Sketch", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Sketch", 'DateTime'>;
}
export type SketchFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where: Prisma.SketchWhereUniqueInput;
};
export type SketchFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where: Prisma.SketchWhereUniqueInput;
};
export type SketchFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where?: Prisma.SketchWhereInput;
    orderBy?: Prisma.SketchOrderByWithRelationInput | Prisma.SketchOrderByWithRelationInput[];
    cursor?: Prisma.SketchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SketchScalarFieldEnum | Prisma.SketchScalarFieldEnum[];
};
export type SketchFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where?: Prisma.SketchWhereInput;
    orderBy?: Prisma.SketchOrderByWithRelationInput | Prisma.SketchOrderByWithRelationInput[];
    cursor?: Prisma.SketchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SketchScalarFieldEnum | Prisma.SketchScalarFieldEnum[];
};
export type SketchFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where?: Prisma.SketchWhereInput;
    orderBy?: Prisma.SketchOrderByWithRelationInput | Prisma.SketchOrderByWithRelationInput[];
    cursor?: Prisma.SketchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SketchScalarFieldEnum | Prisma.SketchScalarFieldEnum[];
};
export type SketchCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SketchCreateInput, Prisma.SketchUncheckedCreateInput>;
};
export type SketchCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SketchCreateManyInput | Prisma.SketchCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SketchCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    data: Prisma.SketchCreateManyInput | Prisma.SketchCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SketchIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SketchUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SketchUpdateInput, Prisma.SketchUncheckedUpdateInput>;
    where: Prisma.SketchWhereUniqueInput;
};
export type SketchUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SketchUpdateManyMutationInput, Prisma.SketchUncheckedUpdateManyInput>;
    where?: Prisma.SketchWhereInput;
    limit?: number;
};
export type SketchUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SketchUpdateManyMutationInput, Prisma.SketchUncheckedUpdateManyInput>;
    where?: Prisma.SketchWhereInput;
    limit?: number;
    include?: Prisma.SketchIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SketchUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where: Prisma.SketchWhereUniqueInput;
    create: Prisma.XOR<Prisma.SketchCreateInput, Prisma.SketchUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SketchUpdateInput, Prisma.SketchUncheckedUpdateInput>;
};
export type SketchDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
    where: Prisma.SketchWhereUniqueInput;
};
export type SketchDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SketchWhereInput;
    limit?: number;
};
export type SketchDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SketchSelect<ExtArgs> | null;
    omit?: Prisma.SketchOmit<ExtArgs> | null;
    include?: Prisma.SketchInclude<ExtArgs> | null;
};
export {};
