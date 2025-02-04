import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import AdminPanelTable from "../Table/Table";
import { servicesList } from "../../actions/CallsReports";
import {useEffect} from "react";

export const ServiceComponent = () => {
  const dispatch = useDispatch();
  const {entities } = useSelector(
    (state) => state.servicesListSlice
  );

  useEffect(() => {
      if(!entities.length){
          dispatch(servicesList({})).then(() => {});
      }
  }, []);

  const handleChange = (page, rowsPerPage) => {
    dispatch(
      servicesList({
        params: { page: page - 1, size: rowsPerPage },
      })
    );
  };

  return (
    <>
      <AdminPanelTable
        columns={columns}
        entities={entities}
        totalElements={entities?.totalElements}
        handleChange={(page, rowsPerPage) => handleChange(page, rowsPerPage)}
        disablePagination
      />
    </>
  );
};
