import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}
type Address = {
  locality: string;
  city: string;
  postcode: string;
  countryName: string;
};

export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<Address | null> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw new Error("Failed getting address");

  const data = await res.json();
  return data as Address;
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

interface FetchAddressResponse {
  position: GeolocationPosition;
  address: string;
}

export const fetchAddress = createAsyncThunk<
  FetchAddressResponse,
  void,
  { rejectValue: string }
>("user/fetchAddress", async function (_, { rejectWithValue }) {
  try {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();

    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address
    const addressObj: Address | null = await getAddress(position);
    if (!addressObj) {
      throw new Error("Address not found");
    }
    const address: string = `${addressObj.locality}, ${addressObj.city} ${addressObj.postcode}, ${addressObj.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position: positionObj, address } as unknown as FetchAddressResponse;
  } catch (error) {
    return rejectWithValue(
      "There was a problem getting your address. Make sure to fill this field!"
    );
  }
});

export interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  position: GeolocationPosition;
  address: string;
  phone: string;
  error: string;
}

const initialState: UserState = {
  username: "",
  status: "idle",
  position: {
    coords: {
      latitude: 0,
      longitude: 0
    }
  },
  phone: "",
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    updatePhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "An error occurred";
      }),
});

export const { updateName, updatePhone, updateAddress } = userSlice.actions;

export const userReducer = userSlice.reducer;
