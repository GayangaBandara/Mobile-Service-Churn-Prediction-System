// components/LocationDetails.tsx
import React from "react";

type LocationDetailsProps = {
  zip_code: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  lat_long?: string;
  population: number;
};

const LocationDetails: React.FC<LocationDetailsProps> = ({
  zip_code,
  city,
  state,
  country,
  latitude,
  longitude,
  lat_long,
  population,
}) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg m-8 p-6 w-[500px] h-[350px]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Location Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>ZIP Code:</strong> {zip_code}
        </div>
        <div>
          <strong>City:</strong> {city}
        </div>
        <div>
          <strong>State:</strong> {state}
        </div>
        <div>
          <strong>Country:</strong> {country}
        </div>
        <div>
          <strong>Latitude:</strong> {latitude}
        </div>
        <div>
          <strong>Longitude:</strong> {longitude}
        </div>
        <div>
          <strong>Lat/Long:</strong> {lat_long ?? `${latitude}, ${longitude}`}
        </div>
        <div>
          <strong>Population:</strong> {population}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
