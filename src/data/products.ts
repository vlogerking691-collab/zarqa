export type ProductCategory = 'unstitched' | 'embroidered' | 'printed';
export type CategoryFilter = 'all' | ProductCategory;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  fabric: string;
  price: number;
  minOrder: number;
  image: string;
  imageAlt: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  unstitched: 'Unstitched 3-Piece',
  embroidered: 'Embroidered Luxury',
  printed: 'Printed Lawn/Cambric',
};

const photo = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`;

export const PRODUCTS: Product[] = [
  {
    id: 'emb-lawn-noor',
    name: '3-Piece Unstitched Embroidered Lawn',
    category: 'embroidered',
    fabric: 'Lawn shirt, chiffon dupatta, cotton trouser',
    price: 2850,
    minOrder: 3,
    image: photo('36325842'),
    imageAlt: 'Grey embroidered unstitched three-piece suit styled in Lahore',
  },
  {
    id: 'print-lawn-bahar',
    name: '3-Piece Unstitched Printed Lawn',
    category: 'printed',
    fabric: 'Printed lawn shirt, lawn dupatta, cotton trouser',
    price: 1650,
    minOrder: 3,
    image: photo('31874448'),
    imageAlt: 'Model in a printed unstitched lawn shalwar kameez',
  },
  {
    id: 'emb-chiffon-luxe',
    name: '3-Piece Unstitched Luxury Embroidered Chiffon',
    category: 'embroidered',
    fabric: 'Embroidered chiffon shirt, embroidered chiffon dupatta, trouser',
    price: 4200,
    minOrder: 3,
    image: photo('31874456'),
    imageAlt: 'Elegant embroidered chiffon unstitched suit in a classic setting',
  },
  {
    id: 'uns-dyed-lawn',
    name: '3-Piece Unstitched Dyed Lawn',
    category: 'unstitched',
    fabric: 'Dyed lawn shirt, lawn dupatta, cotton trouser',
    price: 1450,
    minOrder: 3,
    image: photo('31874440'),
    imageAlt: 'Model posing outdoors in a plain dyed unstitched lawn suit',
  },
  {
    id: 'print-cambric-gul',
    name: '3-Piece Unstitched Printed Cambric',
    category: 'printed',
    fabric: 'Printed cambric shirt, cotton dupatta, cambric trouser',
    price: 1950,
    minOrder: 3,
    image: photo('26970930'),
    imageAlt: 'Vibrant printed cambric unstitched suit with a patterned dupatta',
  },
  {
    id: 'emb-pink-lawn',
    name: '3-Piece Unstitched Pink Embroidered Lawn',
    category: 'embroidered',
    fabric: 'Embroidered lawn shirt, chiffon dupatta, cotton trouser',
    price: 2600,
    minOrder: 3,
    image: photo('36325971'),
    imageAlt: 'Pink embroidered unstitched lawn suit worn indoors',
  },
  {
    id: 'uns-classic-linen',
    name: '3-Piece Unstitched Classic Linen',
    category: 'unstitched',
    fabric: 'Linen shirt, linen dupatta, cotton trouser',
    price: 2200,
    minOrder: 3,
    image: photo('31874443'),
    imageAlt: 'Editorial portrait of a model in a classic unstitched linen suit',
  },
  {
    id: 'emb-cambric-white',
    name: '3-Piece Unstitched Embroidered Cambric',
    category: 'embroidered',
    fabric: 'Embroidered cambric shirt, cotton dupatta, cambric trouser',
    price: 2400,
    minOrder: 3,
    image: photo('20791986'),
    imageAlt: 'White embroidered unstitched cambric outfit seated indoors',
  },
  {
    id: 'print-lawn-rose',
    name: '3-Piece Unstitched Printed Lawn Rose',
    category: 'printed',
    fabric: 'Printed lawn shirt, lawn dupatta, cotton trouser',
    price: 1800,
    minOrder: 3,
    image: photo('31874447'),
    imageAlt: 'Pink printed lawn unstitched suit in a studio portrait',
  },
];

export const HERO_IMAGE = photo('36090382');
export const WHOLESALE_IMAGE = photo('19271685');
export const OUTLET_IMAGE = photo('7221013');
