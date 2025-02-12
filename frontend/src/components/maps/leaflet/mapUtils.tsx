import { IProperty } from 'actions/parcelsActions';
import { Classifications, PropertyTypes, Workflows } from 'constants/index';
import L, { DivIcon, GeoJSON, LatLngExpression, Layer, Map, Marker } from 'leaflet';
import Supercluster from 'supercluster';

import { ICluster, PointFeature } from '../types';

// parcel icon (green)
export const parcelIcon = L.icon({
  iconUrl: require('assets/images/pins/land-reg.png').default ?? 'assets/images/pins/land-reg.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// parcel icon (green) highlighted
export const parcelIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/land-reg-highlight.png').default ??
    'assets/images/pins/land-reg-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// building icon (blue)
export const buildingIcon = L.icon({
  iconUrl:
    require('assets/images/pins/building-reg.png').default ?? 'assets/images/pins/building-reg.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// building icon (blue) highlighted
export const buildingIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/building-reg-highlight.png').default ??
    'assets/images/pins/building-reg-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// subdivision icon (green)
export const subdivisionIcon = L.icon({
  iconUrl:
    require('assets/images/pins/subdiv-reg.png').default ?? 'assets/images/pins/subdiv-reg.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// subdivision icon (green) highlighted
export const subdivisionIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/subdiv-reg-highlight.png').default ??
    'assets/images/pins/subdiv-reg-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const geocoderIcon = L.icon({
  iconUrl:
    require('assets/images/pins/marker-green.png').default ?? 'assets/images/pins/marker-green.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// draft parcel icon (green)
export const draftParcelIcon = L.icon({
  iconUrl:
    require('assets/images/pins/marker-green.png').default ?? 'assets/images/pins/marker-green.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'draft',
});

// draft building icon (blue)
export const draftBuildingIcon = L.icon({
  iconUrl:
    require('assets/images/pins/marker-blue.png').default ?? 'assets/images/pins/marker-blue.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'draft',
});

// spp icon (purple)
export const landSppIcon = L.icon({
  iconUrl: require('assets/images/pins/land-spl.png').default ?? 'assets/images/pins/land-spl.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// spp icon (purple) highlighted
export const landSppIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/land-spl-highlight.png').default ??
    'assets/images/pins/land-spl-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// erp icon (red)
export const landErpIcon = L.icon({
  iconUrl: require('assets/images/pins/land-erp.png').default ?? 'assets/images/pins/land-erp.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// erp icon (red) highlight
export const landErpIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/land-erp-highlight.png').default ??
    'assets/images/pins/land-erp-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// spp icon (purple)
export const buildingSppIcon = L.icon({
  iconUrl:
    require('assets/images/pins/building-spl.png').default ?? 'assets/images/pins/building-spl.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// spp icon (purple) highlight
export const buildingSppIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/building-spl-highlight.png').default ??
    'assets/images/pins/building-spl-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// erp icon (red)
export const buildingErpIcon = L.icon({
  iconUrl:
    require('assets/images/pins/building-erp.png').default ?? 'assets/images/pins/building-erp.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// erp icon (red) highlighted
export const buildingErpIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/building-erp-highlight.png').default ??
    'assets/images/pins/building-erp-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// spp icon (purple)
export const subdivisionSppIcon = L.icon({
  iconUrl:
    require('assets/images/pins/subdiv-spl.png').default ?? 'assets/images/pins/subdiv-spl.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// spp icon (purple) highlighted
export const subdivisionSppIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/subdiv-spl-highlight.png').default ??
    'assets/images/pins/subdiv-spl-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// erp icon (red)
export const subdivisionErpIcon = L.icon({
  iconUrl:
    require('assets/images/pins/subdiv-erp.png').default ?? 'assets/images/pins/subdiv-erp.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// erp icon (red) highlight
export const subdivisionErpIconSelect = L.icon({
  iconUrl:
    require('assets/images/pins/subdiv-erp-highlight.png').default ??
    'assets/images/pins/subdiv-erp-highlight.png',
  shadowUrl: require('assets/images/pins/marker-shadow.png').default ?? 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/**
 * Creates map points (in GeoJSON format) for further clustering by `supercluster`
 * @param properties
 */
export const createPoints = (properties: IProperty[]) =>
  properties.map(x => {
    return {
      type: 'Feature',
      properties: {
        ...x,
        cluster: false,
      },
      geometry: {
        type: 'Point',
        coordinates: [x.longitude, x.latitude],
      },
    } as PointFeature;
  });

/**
 * This function defines how GeoJSON points spawn Leaflet layers on the map.
 * It is called internally by the `GeoJSON` leaflet component.
 * @param feature
 * @param latlng
 */
export const pointToLayer = (feature: ICluster, latlng: LatLngExpression): Layer => {
  const { cluster: isCluster } = feature?.properties as Supercluster.ClusterProperties;
  if (!!isCluster) {
    return createClusterMarker(feature, latlng);
  }
  // we have a single point (parcel or building) to render
  return createSingleMarker(feature, latlng);
};

/**
 * Get an icon type for the specified cluster property details (type, draft, erp, spp etc)
 */
export const getMarkerIcon = (feature: ICluster, selected?: boolean) => {
  const { propertyTypeId, projectWorkflow, classificationId, parcelDetail } = feature?.properties;
  if (propertyTypeId === PropertyTypes.DRAFT_PARCEL) {
    return draftParcelIcon;
  } else if (propertyTypeId === PropertyTypes.DRAFT_BUILDING) {
    return draftBuildingIcon;
  } else if (selected) {
    if (
      [Workflows.ERP].includes(projectWorkflow) ||
      [Workflows.ERP].includes(parcelDetail?.projectWorkflow)
    ) {
      switch (propertyTypeId) {
        case PropertyTypes.SUBDIVISION:
          return subdivisionErpIconSelect;
        case PropertyTypes.BUILDING:
          return buildingErpIconSelect;
        default:
          return landErpIconSelect;
      }
    } else if (
      [Workflows.SPL, Workflows.ASSESS_EX_DISPOSAL].includes(projectWorkflow) ||
      [Workflows.SPL, Workflows.ASSESS_EX_DISPOSAL].includes(parcelDetail?.projectWorkflow)
    ) {
      switch (propertyTypeId) {
        case PropertyTypes.BUILDING:
          return buildingSppIconSelect;
        case PropertyTypes.SUBDIVISION:
          return subdivisionSppIconSelect;
        default:
          return landSppIconSelect;
      }
    } else if (propertyTypeId === PropertyTypes.PARCEL) {
      return parcelIconSelect;
    } else if (propertyTypeId === PropertyTypes.SUBDIVISION) {
      return subdivisionIconSelect;
    } else if (propertyTypeId === PropertyTypes.GEOCODER) {
      return geocoderIcon;
    } else {
      return buildingIconSelect;
    }
  } else {
    if ([Workflows.ERP].includes(projectWorkflow)) {
      switch (propertyTypeId) {
        case PropertyTypes.SUBDIVISION:
          return subdivisionErpIcon;
        case PropertyTypes.BUILDING:
          return buildingErpIcon;
        default:
          return landErpIcon;
      }
    } else if (
      (classificationId === Classifications.SurplusActive ||
        classificationId === Classifications.SurplusEncumbered) &&
      projectWorkflow &&
      [Workflows.SPL, Workflows.ASSESS_EX_DISPOSAL].includes(projectWorkflow)
    ) {
      switch (propertyTypeId) {
        case PropertyTypes.BUILDING:
          return buildingSppIcon;
        case PropertyTypes.SUBDIVISION:
          return subdivisionSppIcon;
        default:
          return landSppIcon;
      }
    } else if (propertyTypeId === PropertyTypes.PARCEL) {
      return parcelIcon;
    } else if (propertyTypeId === PropertyTypes.SUBDIVISION) {
      return subdivisionIcon;
    } else if (propertyTypeId === PropertyTypes.GEOCODER) {
      return geocoderIcon;
    } else {
      return buildingIcon;
    }
  }
};

/**
 * Creates a map pin for a single point; e.g. a parcel or a building
 * @param feature the geojson object
 * @param latlng the point position
 */
export const createSingleMarker = (feature: ICluster, latlng: LatLngExpression): Layer => {
  const icon = getMarkerIcon(feature);
  return new Marker(latlng, { icon });
};

// Internal cache of cluster icons to avoid re-creating the same icon over and over again.
const iconsCache: Record<number, DivIcon> = {};

/**
 * Creates a marker for clusters on the map
 * @param feature the cluster geojson object
 * @param latlng the cluster position
 */
export const createClusterMarker = (feature: ICluster, latlng: LatLngExpression): Layer => {
  const {
    cluster: isCluster,
    point_count: count,
    point_count_abbreviated: displayValue,
  } = feature?.properties as Supercluster.ClusterProperties;

  if (!isCluster) {
    return (null as unknown) as Layer;
  }

  const size = count < 100 ? 'small' : count < 1000 ? 'medium' : 'large';
  let icon: DivIcon;

  if (!iconsCache[count]) {
    iconsCache[count] = new DivIcon({
      html: `<div><span>${displayValue}</span></div>`,
      className: `marker-cluster marker-cluster-${size}`,
      iconSize: [40, 40],
    });
  }

  icon = iconsCache[count];
  return new Marker(latlng, { icon });
};

/** Zooms to a cluster */
export const zoomToCluster = (cluster: ICluster, expansionZoom: number, map: Map) => {
  const latlng = GeoJSON.coordsToLatLng(cluster?.geometry?.coordinates as [number, number]);
  map?.setView(latlng, expansionZoom, { animate: true });
};

// we need to namespace the keys as IDs are not enough here.
// the same ID could be found on both the parcel collection and building collection
export const generateKey = (p: IProperty) =>
  `${p.propertyTypeId === 0 ? 'parcel' : 'building'}-${p.id}`;

/** Creates a IProperty object from a GeoJSON point */
export const asProperty = (point: PointFeature): IProperty => {
  const { id, propertyTypeId, name } = point?.properties;
  const latlng = GeoJSON.coordsToLatLng(point?.geometry?.coordinates as [number, number]);
  return {
    ...point.properties,
    id,
    propertyTypeId,
    latitude: latlng.lat,
    longitude: latlng.lng,
    name,
  } as IProperty;
};
