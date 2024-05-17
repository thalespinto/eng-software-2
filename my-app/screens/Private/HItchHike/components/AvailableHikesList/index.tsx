import { ScrollView } from "react-native";
import AvailableHikesListItem from "../AvailableHikesListItem";
import { useState } from "react";
import HikeDetailsDialog from "../HikeDetailsDialog";

const AvailableHikesList = () => {
  const [openHikeDetailsDialog, setOpenHikeDetailsDialog] = useState(false);

  const toggleOpenHikeDetailsDialog = () => {
    setOpenHikeDetailsDialog(!openHikeDetailsDialog);
  };

  return (
    <>
      <ScrollView
        style={{
          height: 450,
          borderWidth: 0.5,
          borderRadius: 4,
          marginTop: 20,
        }}
      >
        <AvailableHikesListItem onPress={toggleOpenHikeDetailsDialog} />
        <AvailableHikesListItem onPress={toggleOpenHikeDetailsDialog} />
        <AvailableHikesListItem onPress={toggleOpenHikeDetailsDialog} />
      </ScrollView>

      <HikeDetailsDialog
        isVisible={openHikeDetailsDialog}
        onBackdropPress={toggleOpenHikeDetailsDialog}
      />
    </>
  );
};

export default AvailableHikesList;
