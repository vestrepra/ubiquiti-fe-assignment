import { z } from 'zod';

export const LineSchema = z.looseObject({
    id: z.string(),
    name: z.string(),
});

export const ProductInfoSchema = z.looseObject({
    name: z.string(),
});

export const ImageSchema = z.looseObject({
    default: z.string(),
});

export const DeviceSchema = z.looseObject({
    id: z.string(),
    line: LineSchema,
    product: ProductInfoSchema,
    shortnames: z.array(z.string()),
    images: ImageSchema,
});

export const ProductsResponseSchema = z.object({
    devices: z.array(DeviceSchema),
});

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type Device = z.infer<typeof DeviceSchema>;
