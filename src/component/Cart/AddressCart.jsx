import React from "react";
import { Card, Button, Divider, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AddressCart = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Icon Section */}
      <Box className="flex justify-center items-center">
        <HomeIcon className="text-white text-3xl" />
      </Box>

      {/* Address Section */}
      <div className="space-y-2">
        <Typography variant="h6" className="font-semibold text-lg text-white">
          Home
        </Typography>
        <Typography variant="body2" className="text-gray-400">
          {item.streetAddress}, {item.city}, {item.state}, {item.postalCode}, {item.country}
        </Typography>

        <Divider className="my-2" />

        {showButton && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleSelectAddress}
            className="mt-2"
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCart;



// const AddressCart = ({ item, showButton, handleSelectAddress }) => {
//   return (
//     <Card className="flex gap-5 w-64 p-5">
//       <HomeIcon />
//       <div className="space-y-3 text-gray-500">
//         <h1 className="font-semibold text-lg text-white">Home</h1>
//         <p>
//           {item.streetAddress}, {item.city}, {item.state}, {item.postalCode}, {item.country}
//         </p>
//         {showButton && (
//           <Button variant="outlined" fullWidth onClick={handleSelectAddress}>
//             Select
//           </Button>
//         )}
//       </div>
//     </Card>
//   );
// };
// export default AddressCart;