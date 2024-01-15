export interface ProductType {
  quantity?: number
  id: string
  title: string
  condition: string
  thumbnail_id: string
  catalog_product_id: string
  listing_type_id: string
  permalink: string
  buying_mode: string
  site_id: string
  category_id: string
  domain_id: string
  thumbnail: string
  currency_id: string
  order_backend: number
  price: number
  original_price: any
  sale_price: any
  available_quantity: number
  official_store_id: number
  official_store_name: string
  use_thumbnail_id: boolean
  accepts_mercadopago: boolean
  shipping: Shipping
  stop_time: string
  seller: Seller
  attributes: Attribute[]
  installments: Installments
  winner_item_id: any
  catalog_listing: boolean
  discounts: any
  promotions: any[]
  inventory_id: string
}

export interface Shipping {
  store_pick_up: boolean
  free_shipping: boolean
  logistic_type: string
  mode: string
  tags: string[]
  benefits: any
  promise: any
}

export interface Seller {
  id: number
  nickname: string
}

export interface Attribute {
  id: string
  name: string
  value_id?: string
  value_name?: string
  attribute_group_id: string
  attribute_group_name: string
  value_struct?: ValueStruct
  values: Value[]
  source: number
  value_type: string
}

export interface ValueStruct {
  number: number
  unit: string
}

export interface Value {
  id?: string
  name?: string
  struct?: Struct
  source: number
}

export interface Struct {
  unit: string
  number: number
}

export interface Installments {
  quantity: number
  amount: number
  rate: number
  currency_id: string
}
