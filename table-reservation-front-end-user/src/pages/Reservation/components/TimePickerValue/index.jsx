import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerValue({ label, value, onChange, minutesStep, minTime, maxTime }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                sx={{ width: '100%' }}
                disablePast
                closeOnSelect
                ampm={false}
                minutesStep={minutesStep}
                minTime={minTime}
                maxTime={maxTime}
                label={label}
                value={value}
                onChange={onChange}
            />
        </LocalizationProvider>
    );
}
