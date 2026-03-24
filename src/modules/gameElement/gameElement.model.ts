import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

extendZodWithOpenApi(z);

// ElementPropertyType enum
export const ZodElementPropertyTypeSchema = z.enum(['string', 'number', 'date', 'boolean']);

export const ZodElementPropertyVariantByType = {
  [ZodElementPropertyTypeSchema.options[0]]: z.enum(['text', 'url']),
  [ZodElementPropertyTypeSchema.options[1]]: z.enum(['number', 'percentage']),
  [ZodElementPropertyTypeSchema.options[2]]: z.enum(['date']),
  [ZodElementPropertyTypeSchema.options[3]]: z.enum(['boolean']),
};

// Element model
export const ZodGameElementSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  gameModeId: z.instanceof(ObjectId),
  name: z.string(),
  properties: z.record(
    z.object({
      type: ZodElementPropertyTypeSchema,
      value: z.union([z.string(), z.number(), z.date()]),
      variant: z.union([
        ZodElementPropertyVariantByType.string,
        ZodElementPropertyVariantByType.number,
        ZodElementPropertyVariantByType.date,
        ZodElementPropertyVariantByType.boolean,
      ]),
    })
  ),
});

export const ZodCreateGameElementSchema = ZodGameElementSchema.omit({
  _id: true,
});
