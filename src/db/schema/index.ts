import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const InventionScalarFieldEnumSchema = z.enum(['id','name','year','description','image_url','created_at','inventor','inventor_link','invention_link']);

export const ScoreScalarFieldEnumSchema = z.enum(['id','invention_id','created_at']);

export const UsedInventionScalarFieldEnumSchema = z.enum(['id','invention_id','is_current','used_at']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','created_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// INVENTION SCHEMA
/////////////////////////////////////////

export const InventionSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  year: z.number().int(),
  description: z.string(),
  image_url: z.string().nullable(),
  created_at: z.coerce.date(),
  inventor: z.string().nullable(),
  inventor_link: z.string().nullable(),
  invention_link: z.string().nullable(),
})

export type Invention = z.infer<typeof InventionSchema>

/////////////////////////////////////////
// SCORE SCHEMA
/////////////////////////////////////////

export const ScoreSchema = z.object({
  id: z.number().int(),
  invention_id: z.number().int().nullable(),
  created_at: z.coerce.date(),
})

export type Score = z.infer<typeof ScoreSchema>

/////////////////////////////////////////
// USED INVENTION SCHEMA
/////////////////////////////////////////

export const UsedInventionSchema = z.object({
  id: z.number().int(),
  invention_id: z.number().int(),
  is_current: z.number().int(),
  used_at: z.coerce.date(),
})

export type UsedInvention = z.infer<typeof UsedInventionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  created_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// INVENTION
//------------------------------------------------------

export const InventionSelectSchema: z.ZodType<Prisma.InventionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  year: z.boolean().optional(),
  description: z.boolean().optional(),
  image_url: z.boolean().optional(),
  created_at: z.boolean().optional(),
  inventor: z.boolean().optional(),
  inventor_link: z.boolean().optional(),
  invention_link: z.boolean().optional(),
}).strict()

// SCORE
//------------------------------------------------------

export const ScoreSelectSchema: z.ZodType<Prisma.ScoreSelect> = z.object({
  id: z.boolean().optional(),
  invention_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
}).strict()

// USED INVENTION
//------------------------------------------------------

export const UsedInventionSelectSchema: z.ZodType<Prisma.UsedInventionSelect> = z.object({
  id: z.boolean().optional(),
  invention_id: z.boolean().optional(),
  is_current: z.boolean().optional(),
  used_at: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const InventionWhereInputSchema: z.ZodType<Prisma.InventionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InventionWhereInputSchema),z.lazy(() => InventionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventionWhereInputSchema),z.lazy(() => InventionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventor_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invention_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const InventionOrderByWithRelationInputSchema: z.ZodType<Prisma.InventionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  inventor: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventor_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  invention_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const InventionWhereUniqueInputSchema: z.ZodType<Prisma.InventionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => InventionWhereInputSchema),z.lazy(() => InventionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventionWhereInputSchema),z.lazy(() => InventionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventor: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventor_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  invention_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const InventionOrderByWithAggregationInputSchema: z.ZodType<Prisma.InventionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  inventor: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventor_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  invention_link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InventionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InventionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InventionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InventionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InventionSumOrderByAggregateInputSchema).optional()
}).strict();

export const InventionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InventionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InventionScalarWhereWithAggregatesInputSchema),z.lazy(() => InventionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventionScalarWhereWithAggregatesInputSchema),z.lazy(() => InventionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  inventor: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  inventor_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  invention_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ScoreWhereInputSchema: z.ZodType<Prisma.ScoreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  invention_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ScoreOrderByWithRelationInputSchema: z.ZodType<Prisma.ScoreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreWhereUniqueInputSchema: z.ZodType<Prisma.ScoreWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreWhereInputSchema),z.lazy(() => ScoreWhereInputSchema).array() ]).optional(),
  invention_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const ScoreOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScoreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ScoreCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ScoreAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScoreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScoreMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ScoreSumOrderByAggregateInputSchema).optional()
}).strict();

export const ScoreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScoreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema),z.lazy(() => ScoreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  invention_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UsedInventionWhereInputSchema: z.ZodType<Prisma.UsedInventionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsedInventionWhereInputSchema),z.lazy(() => UsedInventionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsedInventionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsedInventionWhereInputSchema),z.lazy(() => UsedInventionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  invention_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  is_current: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  used_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UsedInventionOrderByWithRelationInputSchema: z.ZodType<Prisma.UsedInventionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional(),
  used_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsedInventionWhereUniqueInputSchema: z.ZodType<Prisma.UsedInventionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UsedInventionWhereInputSchema),z.lazy(() => UsedInventionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsedInventionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsedInventionWhereInputSchema),z.lazy(() => UsedInventionWhereInputSchema).array() ]).optional(),
  invention_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  is_current: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  used_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const UsedInventionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsedInventionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional(),
  used_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsedInventionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UsedInventionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsedInventionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsedInventionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UsedInventionSumOrderByAggregateInputSchema).optional()
}).strict();

export const UsedInventionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsedInventionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsedInventionScalarWhereWithAggregatesInputSchema),z.lazy(() => UsedInventionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsedInventionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsedInventionScalarWhereWithAggregatesInputSchema),z.lazy(() => UsedInventionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  invention_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  is_current: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  used_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InventionCreateInputSchema: z.ZodType<Prisma.InventionCreateInput> = z.object({
  name: z.string().optional().nullable(),
  year: z.number().int(),
  description: z.string(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  inventor: z.string().optional().nullable(),
  inventor_link: z.string().optional().nullable(),
  invention_link: z.string().optional().nullable()
}).strict();

export const InventionUncheckedCreateInputSchema: z.ZodType<Prisma.InventionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  year: z.number().int(),
  description: z.string(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  inventor: z.string().optional().nullable(),
  inventor_link: z.string().optional().nullable(),
  invention_link: z.string().optional().nullable()
}).strict();

export const InventionUpdateInputSchema: z.ZodType<Prisma.InventionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invention_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InventionUncheckedUpdateInputSchema: z.ZodType<Prisma.InventionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invention_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InventionCreateManyInputSchema: z.ZodType<Prisma.InventionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  year: z.number().int(),
  description: z.string(),
  image_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  inventor: z.string().optional().nullable(),
  inventor_link: z.string().optional().nullable(),
  invention_link: z.string().optional().nullable()
}).strict();

export const InventionUpdateManyMutationInputSchema: z.ZodType<Prisma.InventionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invention_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InventionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InventionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventor: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventor_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invention_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScoreCreateInputSchema: z.ZodType<Prisma.ScoreCreateInput> = z.object({
  invention_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const ScoreUncheckedCreateInputSchema: z.ZodType<Prisma.ScoreUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  invention_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const ScoreUpdateInputSchema: z.ZodType<Prisma.ScoreUpdateInput> = z.object({
  invention_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  invention_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreCreateManyInputSchema: z.ZodType<Prisma.ScoreCreateManyInput> = z.object({
  id: z.number().int().optional(),
  invention_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const ScoreUpdateManyMutationInputSchema: z.ZodType<Prisma.ScoreUpdateManyMutationInput> = z.object({
  invention_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScoreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScoreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  invention_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsedInventionCreateInputSchema: z.ZodType<Prisma.UsedInventionCreateInput> = z.object({
  invention_id: z.number().int(),
  is_current: z.number().int().optional(),
  used_at: z.coerce.date().optional()
}).strict();

export const UsedInventionUncheckedCreateInputSchema: z.ZodType<Prisma.UsedInventionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  invention_id: z.number().int(),
  is_current: z.number().int().optional(),
  used_at: z.coerce.date().optional()
}).strict();

export const UsedInventionUpdateInputSchema: z.ZodType<Prisma.UsedInventionUpdateInput> = z.object({
  invention_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsedInventionUncheckedUpdateInputSchema: z.ZodType<Prisma.UsedInventionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  invention_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsedInventionCreateManyInputSchema: z.ZodType<Prisma.UsedInventionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  invention_id: z.number().int(),
  is_current: z.number().int().optional(),
  used_at: z.coerce.date().optional()
}).strict();

export const UsedInventionUpdateManyMutationInputSchema: z.ZodType<Prisma.UsedInventionUpdateManyMutationInput> = z.object({
  invention_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsedInventionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsedInventionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  invention_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const InventionCountOrderByAggregateInputSchema: z.ZodType<Prisma.InventionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  inventor: z.lazy(() => SortOrderSchema).optional(),
  inventor_link: z.lazy(() => SortOrderSchema).optional(),
  invention_link: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InventionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InventionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  inventor: z.lazy(() => SortOrderSchema).optional(),
  inventor_link: z.lazy(() => SortOrderSchema).optional(),
  invention_link: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventionMinOrderByAggregateInputSchema: z.ZodType<Prisma.InventionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  inventor: z.lazy(() => SortOrderSchema).optional(),
  inventor_link: z.lazy(() => SortOrderSchema).optional(),
  invention_link: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventionSumOrderByAggregateInputSchema: z.ZodType<Prisma.InventionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ScoreCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScoreSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScoreSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const UsedInventionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsedInventionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional(),
  used_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsedInventionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsedInventionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsedInventionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsedInventionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional(),
  used_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsedInventionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsedInventionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional(),
  used_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsedInventionSumOrderByAggregateInputSchema: z.ZodType<Prisma.UsedInventionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invention_id: z.lazy(() => SortOrderSchema).optional(),
  is_current: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const InventionFindFirstArgsSchema: z.ZodType<Prisma.InventionFindFirstArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereInputSchema.optional(),
  orderBy: z.union([ InventionOrderByWithRelationInputSchema.array(),InventionOrderByWithRelationInputSchema ]).optional(),
  cursor: InventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventionScalarFieldEnumSchema,InventionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InventionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InventionFindFirstOrThrowArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereInputSchema.optional(),
  orderBy: z.union([ InventionOrderByWithRelationInputSchema.array(),InventionOrderByWithRelationInputSchema ]).optional(),
  cursor: InventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventionScalarFieldEnumSchema,InventionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InventionFindManyArgsSchema: z.ZodType<Prisma.InventionFindManyArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereInputSchema.optional(),
  orderBy: z.union([ InventionOrderByWithRelationInputSchema.array(),InventionOrderByWithRelationInputSchema ]).optional(),
  cursor: InventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventionScalarFieldEnumSchema,InventionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InventionAggregateArgsSchema: z.ZodType<Prisma.InventionAggregateArgs> = z.object({
  where: InventionWhereInputSchema.optional(),
  orderBy: z.union([ InventionOrderByWithRelationInputSchema.array(),InventionOrderByWithRelationInputSchema ]).optional(),
  cursor: InventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InventionGroupByArgsSchema: z.ZodType<Prisma.InventionGroupByArgs> = z.object({
  where: InventionWhereInputSchema.optional(),
  orderBy: z.union([ InventionOrderByWithAggregationInputSchema.array(),InventionOrderByWithAggregationInputSchema ]).optional(),
  by: InventionScalarFieldEnumSchema.array(),
  having: InventionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InventionFindUniqueArgsSchema: z.ZodType<Prisma.InventionFindUniqueArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereUniqueInputSchema,
}).strict() ;

export const InventionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InventionFindUniqueOrThrowArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereUniqueInputSchema,
}).strict() ;

export const ScoreFindFirstArgsSchema: z.ZodType<Prisma.ScoreFindFirstArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreScalarFieldEnumSchema,ScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScoreFindFirstOrThrowArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreScalarFieldEnumSchema,ScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreFindManyArgsSchema: z.ZodType<Prisma.ScoreFindManyArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScoreScalarFieldEnumSchema,ScoreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScoreAggregateArgsSchema: z.ZodType<Prisma.ScoreAggregateArgs> = z.object({
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithRelationInputSchema.array(),ScoreOrderByWithRelationInputSchema ]).optional(),
  cursor: ScoreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScoreGroupByArgsSchema: z.ZodType<Prisma.ScoreGroupByArgs> = z.object({
  where: ScoreWhereInputSchema.optional(),
  orderBy: z.union([ ScoreOrderByWithAggregationInputSchema.array(),ScoreOrderByWithAggregationInputSchema ]).optional(),
  by: ScoreScalarFieldEnumSchema.array(),
  having: ScoreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScoreFindUniqueArgsSchema: z.ZodType<Prisma.ScoreFindUniqueArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const ScoreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScoreFindUniqueOrThrowArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const UsedInventionFindFirstArgsSchema: z.ZodType<Prisma.UsedInventionFindFirstArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereInputSchema.optional(),
  orderBy: z.union([ UsedInventionOrderByWithRelationInputSchema.array(),UsedInventionOrderByWithRelationInputSchema ]).optional(),
  cursor: UsedInventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsedInventionScalarFieldEnumSchema,UsedInventionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsedInventionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsedInventionFindFirstOrThrowArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereInputSchema.optional(),
  orderBy: z.union([ UsedInventionOrderByWithRelationInputSchema.array(),UsedInventionOrderByWithRelationInputSchema ]).optional(),
  cursor: UsedInventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsedInventionScalarFieldEnumSchema,UsedInventionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsedInventionFindManyArgsSchema: z.ZodType<Prisma.UsedInventionFindManyArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereInputSchema.optional(),
  orderBy: z.union([ UsedInventionOrderByWithRelationInputSchema.array(),UsedInventionOrderByWithRelationInputSchema ]).optional(),
  cursor: UsedInventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsedInventionScalarFieldEnumSchema,UsedInventionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsedInventionAggregateArgsSchema: z.ZodType<Prisma.UsedInventionAggregateArgs> = z.object({
  where: UsedInventionWhereInputSchema.optional(),
  orderBy: z.union([ UsedInventionOrderByWithRelationInputSchema.array(),UsedInventionOrderByWithRelationInputSchema ]).optional(),
  cursor: UsedInventionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsedInventionGroupByArgsSchema: z.ZodType<Prisma.UsedInventionGroupByArgs> = z.object({
  where: UsedInventionWhereInputSchema.optional(),
  orderBy: z.union([ UsedInventionOrderByWithAggregationInputSchema.array(),UsedInventionOrderByWithAggregationInputSchema ]).optional(),
  by: UsedInventionScalarFieldEnumSchema.array(),
  having: UsedInventionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsedInventionFindUniqueArgsSchema: z.ZodType<Prisma.UsedInventionFindUniqueArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereUniqueInputSchema,
}).strict() ;

export const UsedInventionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsedInventionFindUniqueOrThrowArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const InventionCreateArgsSchema: z.ZodType<Prisma.InventionCreateArgs> = z.object({
  select: InventionSelectSchema.optional(),
  data: z.union([ InventionCreateInputSchema,InventionUncheckedCreateInputSchema ]),
}).strict() ;

export const InventionUpsertArgsSchema: z.ZodType<Prisma.InventionUpsertArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereUniqueInputSchema,
  create: z.union([ InventionCreateInputSchema,InventionUncheckedCreateInputSchema ]),
  update: z.union([ InventionUpdateInputSchema,InventionUncheckedUpdateInputSchema ]),
}).strict() ;

export const InventionCreateManyArgsSchema: z.ZodType<Prisma.InventionCreateManyArgs> = z.object({
  data: z.union([ InventionCreateManyInputSchema,InventionCreateManyInputSchema.array() ]),
}).strict() ;

export const InventionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InventionCreateManyAndReturnArgs> = z.object({
  data: z.union([ InventionCreateManyInputSchema,InventionCreateManyInputSchema.array() ]),
}).strict() ;

export const InventionDeleteArgsSchema: z.ZodType<Prisma.InventionDeleteArgs> = z.object({
  select: InventionSelectSchema.optional(),
  where: InventionWhereUniqueInputSchema,
}).strict() ;

export const InventionUpdateArgsSchema: z.ZodType<Prisma.InventionUpdateArgs> = z.object({
  select: InventionSelectSchema.optional(),
  data: z.union([ InventionUpdateInputSchema,InventionUncheckedUpdateInputSchema ]),
  where: InventionWhereUniqueInputSchema,
}).strict() ;

export const InventionUpdateManyArgsSchema: z.ZodType<Prisma.InventionUpdateManyArgs> = z.object({
  data: z.union([ InventionUpdateManyMutationInputSchema,InventionUncheckedUpdateManyInputSchema ]),
  where: InventionWhereInputSchema.optional(),
}).strict() ;

export const InventionDeleteManyArgsSchema: z.ZodType<Prisma.InventionDeleteManyArgs> = z.object({
  where: InventionWhereInputSchema.optional(),
}).strict() ;

export const ScoreCreateArgsSchema: z.ZodType<Prisma.ScoreCreateArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  data: z.union([ ScoreCreateInputSchema,ScoreUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const ScoreUpsertArgsSchema: z.ZodType<Prisma.ScoreUpsertArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
  create: z.union([ ScoreCreateInputSchema,ScoreUncheckedCreateInputSchema ]),
  update: z.union([ ScoreUpdateInputSchema,ScoreUncheckedUpdateInputSchema ]),
}).strict() ;

export const ScoreCreateManyArgsSchema: z.ZodType<Prisma.ScoreCreateManyArgs> = z.object({
  data: z.union([ ScoreCreateManyInputSchema,ScoreCreateManyInputSchema.array() ]),
}).strict() ;

export const ScoreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ScoreCreateManyAndReturnArgs> = z.object({
  data: z.union([ ScoreCreateManyInputSchema,ScoreCreateManyInputSchema.array() ]),
}).strict() ;

export const ScoreDeleteArgsSchema: z.ZodType<Prisma.ScoreDeleteArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const ScoreUpdateArgsSchema: z.ZodType<Prisma.ScoreUpdateArgs> = z.object({
  select: ScoreSelectSchema.optional(),
  data: z.union([ ScoreUpdateInputSchema,ScoreUncheckedUpdateInputSchema ]),
  where: ScoreWhereUniqueInputSchema,
}).strict() ;

export const ScoreUpdateManyArgsSchema: z.ZodType<Prisma.ScoreUpdateManyArgs> = z.object({
  data: z.union([ ScoreUpdateManyMutationInputSchema,ScoreUncheckedUpdateManyInputSchema ]),
  where: ScoreWhereInputSchema.optional(),
}).strict() ;

export const ScoreDeleteManyArgsSchema: z.ZodType<Prisma.ScoreDeleteManyArgs> = z.object({
  where: ScoreWhereInputSchema.optional(),
}).strict() ;

export const UsedInventionCreateArgsSchema: z.ZodType<Prisma.UsedInventionCreateArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  data: z.union([ UsedInventionCreateInputSchema,UsedInventionUncheckedCreateInputSchema ]),
}).strict() ;

export const UsedInventionUpsertArgsSchema: z.ZodType<Prisma.UsedInventionUpsertArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereUniqueInputSchema,
  create: z.union([ UsedInventionCreateInputSchema,UsedInventionUncheckedCreateInputSchema ]),
  update: z.union([ UsedInventionUpdateInputSchema,UsedInventionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UsedInventionCreateManyArgsSchema: z.ZodType<Prisma.UsedInventionCreateManyArgs> = z.object({
  data: z.union([ UsedInventionCreateManyInputSchema,UsedInventionCreateManyInputSchema.array() ]),
}).strict() ;

export const UsedInventionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsedInventionCreateManyAndReturnArgs> = z.object({
  data: z.union([ UsedInventionCreateManyInputSchema,UsedInventionCreateManyInputSchema.array() ]),
}).strict() ;

export const UsedInventionDeleteArgsSchema: z.ZodType<Prisma.UsedInventionDeleteArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  where: UsedInventionWhereUniqueInputSchema,
}).strict() ;

export const UsedInventionUpdateArgsSchema: z.ZodType<Prisma.UsedInventionUpdateArgs> = z.object({
  select: UsedInventionSelectSchema.optional(),
  data: z.union([ UsedInventionUpdateInputSchema,UsedInventionUncheckedUpdateInputSchema ]),
  where: UsedInventionWhereUniqueInputSchema,
}).strict() ;

export const UsedInventionUpdateManyArgsSchema: z.ZodType<Prisma.UsedInventionUpdateManyArgs> = z.object({
  data: z.union([ UsedInventionUpdateManyMutationInputSchema,UsedInventionUncheckedUpdateManyInputSchema ]),
  where: UsedInventionWhereInputSchema.optional(),
}).strict() ;

export const UsedInventionDeleteManyArgsSchema: z.ZodType<Prisma.UsedInventionDeleteManyArgs> = z.object({
  where: UsedInventionWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;