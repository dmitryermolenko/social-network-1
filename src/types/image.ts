export interface ImageCreateDto {
  description: string;
  url: string;
  userId: number;
}

export interface ImageDto extends ImageCreateDto {
  persistDateTime: string;
}
