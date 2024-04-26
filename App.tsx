import {
  CalendarActiveDateRange,
  CalendarOnDayPress,
  fromDateId,
  toDateId,
} from "@marceloterreiro/flash-calendar";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MCalendar } from "./Calendar";

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  const handleDayPress = useCallback<CalendarOnDayPress>((dateId) => {
    setCurrentCalendarMonth(fromDateId(dateId));
    setSelectedDate(fromDateId(dateId));
  }, []);

  const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(() => {
    if (!selectedDate) {
      return [];
    }
    return [
      {
        startId: toDateId(selectedDate),
        endId: toDateId(selectedDate),
      },
    ];
  }, [selectedDate]);

  const handlePreviousMonth = useCallback(() => {
    const newDate = dayjs(currentCalendarMonth).subtract(1, "month").toDate();

    setCurrentCalendarMonth(newDate);
  }, [currentCalendarMonth]);

  const handleNextMonth = useCallback(() => {
    const newDate = dayjs(currentCalendarMonth).add(1, "month").toDate();

    setCurrentCalendarMonth(newDate);
  }, [currentCalendarMonth]);

  const handleMonthYearChange = useCallback(
    (month: number, year: number) => {
      let newDate = dayjs(currentCalendarMonth)
        .set("month", month)
        .set("year", year)
        .toDate();
      setCurrentCalendarMonth(newDate);
    },
    [currentCalendarMonth]
  );

  return (
    <View style={styles.container}>
      <MCalendar
        calendarActiveDateRanges={calendarActiveDateRanges}
        calendarMonthId={toDateId(currentCalendarMonth)}
        currentCalendarMonth={currentCalendarMonth}
        onCalendarDayPress={handleDayPress}
        onNextMonthPress={handleNextMonth}
        onMonthYearChange={handleMonthYearChange}
        onPreviousMonthPress={handlePreviousMonth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
    paddingHorizontal: 20,
  },
});
