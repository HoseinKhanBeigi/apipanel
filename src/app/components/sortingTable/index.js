import { Grid } from "@mui/material";
import AutocompleteInput from "../hook-form/autoComplete";

export const SortingTable = () => {
  return (
    <Grid container direction={"row-reverse"}>
      <Grid container item xs={6}>
        <Grid item xs={3}>
          <AutocompleteInput
            name={"desc"}
            title={"نام سرویس"}
            multiple
            // inputValue={filterInputs.desc || []}
            data={[]}
            //   onChange={handleChangeForCallStatus}
          />
        </Grid>

        <Grid item xs={3}>
          <AutocompleteInput
            name={"desc"}
            title={"نام سرویس"}
            multiple
            // inputValue={filterInputs.desc || []}
            data={[]}
            //   onChange={handleChangeForCallStatus}
          />
        </Grid>
        <Grid item xs={3}>
          <AutocompleteInput
            name={"desc"}
            title={"نام سرویس"}
            multiple
            // inputValue={filterInputs.desc || []}
            data={[]}
            //   onChange={handleChangeForCallStatus}
          />
        </Grid>
        <Grid item xs={3}>
          <AutocompleteInput
            name={"desc"}
            title={"نام سرویس"}
            multiple
            // inputValue={filterInputs.desc || []}
            data={[]}
            //   onChange={handleChangeForCallStatus}
          />
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        sdds
      </Grid>
    </Grid>
  );
};
