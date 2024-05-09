import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Map from "../Map";
import { Icon } from "@rneui/themed";

interface IGooglePlacesInput {
  placeHolder: string;
  setLocationText: React.Dispatch<React.SetStateAction<string>>;
}

const GooglePlacesInput = ({
  placeHolder,
  setLocationText,
}: IGooglePlacesInput) => {
  const ref = useRef<any>();

  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    setLocationText(ref.current?.getAddressText());
  }, [ref.current?.setAddressText]);

  return (
    <>
      {openMap && (
        <Map
          setLocationText={ref.current?.setAddressText}
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
            placeholder={`${placeHolder}                                                                            `}
            query={{
              key: "AIzaSyAuAxfURi1SqjZuoSAmmm78LAGfPK4_fZo",
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
