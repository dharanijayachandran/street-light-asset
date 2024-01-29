import { AssetParam } from "./AssetParam";

export class Asset {
    id: number;
    name: string;
    refAssetName: string;
    typeName: string;
    subAssets: Asset[]=[];
    geospatialCoordinates: string;
    typeCode:string;
    params: AssetParam[]=[];
  }