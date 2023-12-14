export interface AllFlowersInterface {
  v: string
  meta: Meta
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: Asset[]
  layers: Layer[]
  markers: any[]
}

export interface Meta {
  g: string
  a: string
  k: string
  d: string
  tc: string
}

export interface Asset {
  id: string
  w: number
  h: number
  u: string
  p: string
  e: number
}

export interface Layer {
  ddd: number
  ind: number
  ty: number
  nm: string
  cl?: string
  refId?: string
  sr: number
  ks: Ks
  ao: number
  ip: number
  op: number
  st: number
  bm: number
  shapes?: Shape[]
}

export interface Ks {
  o: O
  r: R
  p: P
  a: A
  s: S
}

export interface O {
  a: number
  k: number
  ix: number
}

export interface R {
  a: number
  k: number
  ix: number
}

export interface P {
  a: number
  k: number[]
  ix: number
}

export interface A {
  a: number
  k: number[]
  ix: number
}

export interface S {
  a: number
  k: number[]
  ix: number
}

export interface Shape {
  ty: string
  it?: It[]
  nm: string
  np?: number
  cix?: number
  bm?: number
  ix: number
  mn: string
  hd: boolean
  s?: S4
  e?: E2
  o?: O6
  m?: number
}

export interface It {
  ind?: number
  ty: string
  ix?: number
  ks?: Ks2
  nm: string
  mn?: string
  hd?: boolean
  c?: C
  o?: O2
  r: any
  bm?: number
  p?: P2
  a?: A2
  s?: S2
  sk?: Sk
  sa?: Sa
  it?: It2[]
  np?: number
  cix?: number
  w?: W2
  lc?: number
  lj?: number
  ml?: number
  e?: E
  m?: number
}

export interface Ks2 {
  a: number
  k: K
  ix: number
}

export interface K {
  i: number[][]
  o: number[][]
  v: number[][]
  c: boolean
}

export interface C {
  a: number
  k: number[]
  ix: number
}

export interface O2 {
  a: number
  k: number
  ix: number
}

export interface P2 {
  a: number
  k: number[]
  ix: number
}

export interface A2 {
  a: number
  k: number[]
  ix: number
}

export interface S2 {
  a: number
  k: any
  ix: number
}

export interface Sk {
  a: number
  k: number
  ix: number
}

export interface Sa {
  a: number
  k: number
  ix: number
}

export interface It2 {
  ind?: number
  ty: string
  ix?: number
  ks?: Ks3
  nm: string
  mn?: string
  hd?: boolean
  c?: C2
  o?: O3
  r: any
  bm?: number
  p?: P3
  a?: A3
  s?: S3
  sk?: Sk2
  sa?: Sa2
  mm?: number
  w?: W
  lc?: number
  lj?: number
  ml?: number
}

export interface Ks3 {
  a: number
  k: K2
  ix: number
}

export interface K2 {
  i: number[][]
  o: number[][]
  v: number[][]
  c: boolean
}

export interface C2 {
  a: number
  k: number[]
  ix: number
}

export interface O3 {
  a: number
  k: number
  ix: number
}

export interface P3 {
  a: number
  k: number[]
  ix: number
}

export interface A3 {
  a: number
  k: number[]
  ix: number
}

export interface S3 {
  a: number
  k: number[]
  ix: number
}

export interface Sk2 {
  a: number
  k: number
  ix: number
}

export interface Sa2 {
  a: number
  k: number
  ix: number
}

export interface W {
  a: number
  k: number
  ix: number
}

export interface W2 {
  a: number
  k: number
  ix: number
}

export interface E {
  a: number
  k: K3[]
  ix: number
}

export interface K3 {
  i?: I
  o?: O4
  t: number
  s: number[]
}

export interface I {
  x: number[]
  y: number[]
}

export interface O4 {
  x: number[]
  y: number[]
}

export interface S4 {
  a: number
  k: number
  ix: number
}

export interface E2 {
  a: number
  k: K4[]
  ix: number
}

export interface K4 {
  i?: I2
  o?: O5
  t: number
  s: number[]
}

export interface I2 {
  x: number[]
  y: number[]
}

export interface O5 {
  x: number[]
  y: number[]
}

export interface O6 {
  a: number
  k: number
  ix: number
}
