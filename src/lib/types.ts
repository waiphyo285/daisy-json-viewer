export interface PagodaInfo {
  Id: string;
  PagodaMmName: string;
  PagodaEngName: string;
  Latitude: number;
  Longitude: number;
}

export interface PagodaDetail {
  Id: string;
  Link?: string | null;
  Description?: string | null;
}

export interface TravelRoute {
  TravelRouteId: string;
  TravelRouteName: string;
  TravelRouteDescription: string;
  PagodaList: string[];
}

export interface BaganMapData {
  Tbl_BaganMapInfoData: PagodaInfo[];
  Tbl_BaganMapInfoDetailData: PagodaDetail[];
  Tbl_TravelRouteListData: TravelRoute[];
}
