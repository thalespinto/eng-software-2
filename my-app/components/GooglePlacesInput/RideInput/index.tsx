import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Map from "../../Map";
import { Icon } from "@rneui/themed";
import { RideContext } from "../../../screens/Private/OfferRide/Provider/RideProvider";

interface IGooglePlacesInput {
  placeHolder: string;
}

const GooglePlacesInput = ({ placeHolder }: IGooglePlacesInput) => {
  const rideInfos = useContext(RideContext);
  const ref = useRef<any>();

  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    if (placeHolder && rideInfos && ref.current) {
      if (placeHolder === "De") {
        ref.current?.setAddressText(rideInfos?.RideInfos.origin || "");
      } else {
        ref.current?.setAddressText(rideInfos?.RideInfos.destination || "");
      }
    }
  }, [placeHolder, rideInfos]);

  const handlePlaceSelected = (data: any) => {
    console.log("Place selected:", data.description);
    if (placeHolder === "De") {
      rideInfos?.setOrigin(data.description);
    } else {
      rideInfos?.setDestination(data.description);
    }
  };

  return (
    <>
      {openMap && (
        <Map
          setLocationText={(value) => {
            ref.current?.setAddressText(value);
            handlePlaceSelected({ description: value });
          }}
          setOpenMap={setOpenMap}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="handled" horizontal>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: 342,
            justifyContent: "space-between",
          }}
        >
          <GooglePlacesAutocomplete
            ref={ref}
            styles={{
              container: {
                flex: 1,
                width: 300,
              },
            }}
            onPress={(data) => handlePlaceSelected(data)}
            placeholder={placeHolder}
            query={{
              key: "",
              language: "pt-br",
              location: `${-22.900101722294394},${-43.131130042074695}`,
              radius: "10000",
            }}
          />
          <Icon
            name="map"
            onPressIn={() => {
              setOpenMap(true);
            }}
            size={32}
            style={{
              marginTop: 5,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default GooglePlacesInput;
