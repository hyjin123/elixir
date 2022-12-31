import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

import React from "react";

const WavyHeader = ({ customStyles }) => {
  return (
    <View style={customStyles}>
      <View style={{ height: 120 }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: 100 }}
        >
          <Path
            fill="#0099ff"
            d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,117.3C672,117,768,171,864,176C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Svg>
      </View>
    </View>
  );
};

export default WavyHeader;
