import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Map from "../Map";
import { Icon } from "@rneui/themed";
import { hikeContext } from "../../screens/Private/HItchHike/Provider/HikeProvider";

interface IGooglePlacesInput {
  placeHolder: string;
}

const GooglePlacesInput = ({ placeHolder }: IGooglePlacesInput) => {
  const hikeInfos = useContext(hikeContext);
  const ref = useRef<any>();

  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    if (placeHolder && hikeInfos && ref.current) {
      placeHolder === "De"
        ? ref.current?.setAddressText(hikeInfos?.hikeInfos.origin)
        : ref.current?.setAddressText(hikeInfos?.hikeInfos.destination);
    }
  }, [placeHolder, hikeInfos]);

  return (
    <>
      {openMap && (
        <Map
          setLocationText={(value) => {
            ref.current?.setAddressText(value);
            placeHolder === "De"
              ? hikeInfos?.setOrigin(value)
              : hikeInfos?.setDestination(value);
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
            onPress={(data) =>
              placeHolder === "De"
                ? hikeInfos?.setOrigin(data.description)
                : hikeInfos?.setDestination(data.description)
            }
            placeholder={`${placeHolder}                                                                            `}
            query={{
              key: "AIzaSyA0oaZUzyjCcQJgKsFy8PFUHpt_Phlo7Dw",
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
