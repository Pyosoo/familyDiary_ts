import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import moment from "moment";

export default function MainCalander() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                showDaysOutsideCurrentMonth
                fixedWeekNumber={6}
                onChange={(value, selectionState) => {
                    console.log(value);
                    console.log(selectionState);
                    console.log(
                        moment(selectionState).utc(true).format("YYYY.MM.DD"),
                    );
                }}
            />
        </LocalizationProvider>
    );
}
