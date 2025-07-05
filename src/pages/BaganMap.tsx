import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { BaganMapData, PagodaInfo } from "@/lib/types";

import pagodaIconUrl from "@/assets/pagoda.png";
import pagodaDataRaw from "@/assets/BaganMap.json";

const baganData = pagodaDataRaw as BaganMapData;

const pagodaIcon = new L.Icon({
  iconUrl: pagodaIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: undefined,
  shadowSize: undefined,
});

export default function BaganMapPage() {
  const [wikiLink, setWikiLink] = useState<string | null>(null);
  const [selectedPagoda, setSelectedPagoda] = useState<PagodaInfo | null>(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(
    null
  );

  const {
    Tbl_BaganMapInfoData,
    Tbl_BaganMapInfoDetailData,
    Tbl_TravelRouteListData,
  } = baganData;

  const getLink = (id: string) => {
    return Tbl_BaganMapInfoDetailData.find((d) => d.Id === id)?.Link ?? null;
  };

  const buildRouteCoordinates = (index: number): [number, number][] => {
    const route = Tbl_TravelRouteListData[index];
    const pagodas = route.PagodaList.map((id) =>
      Tbl_BaganMapInfoData.find((p) => p.Id === id)
    ).filter(Boolean) as PagodaInfo[];
    return pagodas.map((p) => [p.Latitude, p.Longitude]);
  };

  const center: [number, number] = [21.166, 94.902];

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="absolute top-4 right-4 z-[1000] space-x-2">
        <Button variant="secondary" onClick={() => setSelectedRouteIndex(0)}>
          Tour 1
        </Button>
        <Button variant="secondary" onClick={() => setSelectedRouteIndex(1)}>
          Tour 2
        </Button>
        <Button
          variant="destructive"
          onClick={() => setSelectedRouteIndex(null)}
        >
          Reset
        </Button>
      </div>

      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom
        className="fixed inset-0 z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {Tbl_BaganMapInfoData.map((pagoda) => (
          <Marker
            key={pagoda.Id}
            position={[pagoda.Latitude, pagoda.Longitude]}
            icon={pagodaIcon}
            eventHandlers={{
              click: () => {
                setSelectedPagoda(pagoda);
                setWikiLink(getLink(pagoda.Id));
              },
            }}
          >
            <Popup>
              <strong>{pagoda.PagodaEngName}</strong>
              <br />
              {pagoda.PagodaMmName}
            </Popup>
          </Marker>
        ))}

        {selectedRouteIndex !== null && (
          <Polyline
            positions={buildRouteCoordinates(selectedRouteIndex)}
            color="blue"
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>

      <Dialog
        open={!!selectedPagoda}
        onOpenChange={() => setSelectedPagoda(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogTitle>
            {selectedPagoda?.PagodaEngName} - {selectedPagoda?.PagodaMmName}
          </DialogTitle>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() => wikiLink && window.open(wikiLink)}
            >
              Read on Wiki
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
